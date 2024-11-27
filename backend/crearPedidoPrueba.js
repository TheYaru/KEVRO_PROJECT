// cargar las dependencias
const mongoose = require("mongoose");
const Pedido = require("./models/Pedido"); // Asegúrate de que sea la ruta correcta hacia tu modelo de Pedido
const dotenv = require("dotenv");

dotenv.config(); // Carga las variables del archivo .env

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1); // Salir si no se puede conectar
  });

// Crear un documento de prueba
const nuevoPedido = new Pedido({
  nombre: "Prueba Usuario",
  direccion: "Calle de Prueba 123",
  metodo_pago: "Tarjeta de crédito",
  email: "prueba@correo.com",
});

// Guardar en la base de datos
nuevoPedido
  .save()
  .then(() => {
    console.log("Pedido de prueba guardado correctamente.");
    mongoose.connection.close(); // Cierra la conexión después de guardar
  })
  .catch((err) => {
    console.error("Error al guardar el pedido de prueba:", err);
    mongoose.connection.close(); // Cierra la conexión aunque haya un error
  });
