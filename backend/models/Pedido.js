const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  metodo_pago: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Pedido", PedidoSchema);
