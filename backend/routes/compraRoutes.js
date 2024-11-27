const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const fs = require("fs");
const Pedido = require("../models/Pedido");
const dotenv = require("dotenv")
dotenv.config()
// Ruta para manejar la compra
router.post("/", async (req, res) => {
  const { nombre, direccion, metodo_pago, email } = req.body;

  

  // Verificar si alguno de los campos está vacío
  if (!nombre || !direccion || !metodo_pago || !email) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    // Si los campos son correctos, se guarda el pedido en la base de datos
    const nuevoPedido = new Pedido({ nombre, direccion, metodo_pago, email });
    const savePurchase = await nuevoPedido.save();

    console.log(process.env.EMAIL);
    

    // Generación del PDF y envío del correo
    const pdfPath = `./pdfs/pedido_${Date.now()}.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(18).text("Resumen de la compra", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Nombre: ${nombre}`);
    doc.text(`Dirección: ${direccion}`);
    doc.text(`Método de pago: ${metodo_pago}`);
    doc.text(`Fecha: ${new Date().toLocaleString()}`);
    doc.end();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Confirmación de compra - DAMN",
      text: "Gracias por tu compra. Adjuntamos el resumen de tu pedido.",
      attachments: [{ filename: "resumen_compra.pdf", path: pdfPath }],
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
        return res.status(500).json({ message: "Error al enviar el correo." });
      }
    });

    if(savePurchase){
      return res.status(200).json({
        status: "success",
        message: "compra hecha"
      })
    }
    
  } catch (error) {
    console.error("Error en la ruta /comprar:", error);
    res.status(500).json({ message: "Error en el servidor. Intente nuevamente más tarde." });
  }
});

module.exports = router;
