const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const mongoose = require('mongoose');
const routerUsers = require('./routes/auth.js');
const routerCompras = require('./routes/compraRoutes.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"))

mongoose.connect('mongodb://localhost:27017/KEVRO_PROJECT_DB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));


app.use("/api", routerUsers)
app.use("/api/compras", routerCompras)

app.get("/", (req,res,next)=>{
  res.sendFile(process.cwd() + "/public/views/index.html" )
})

app.get("/inicio", (req,res,next)=>{
  res.sendFile(process.cwd() + "/public/views/Kevro.html" )
})

app.get("/comprar", (req,res,next)=>{
  res.sendFile(process.cwd() + "/public/views/KevroFormulario.html" )
})

app.get("/discopagado", (req,res,next)=>{
  res.sendFile(process.cwd() + "/public/views/KevroDiscopagado.html" )
})
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
