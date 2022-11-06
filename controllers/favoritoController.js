const fs = require("fs");
const json_data = fs.readFileSync("JSON/data.json", "utf-8");
const data = JSON.parse(json_data);
const db = require("../data/db");
global.carrito = require("./carritoController");
global.favoritos = [];

module.exports.registrarPedido = (req, res) => {
  const id = req.params.id;
  let comprador = req.usuarios;
  console.log(id, comprador.id);
  res.redirect("/");
};
