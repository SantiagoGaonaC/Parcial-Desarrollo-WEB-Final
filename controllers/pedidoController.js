const fs = require("fs");
const json_data = fs.readFileSync("JSON/data.json", "utf-8");
const data = JSON.parse(json_data);
const db = require("../data/db");
global.carrito = require("./carritoController");

module.exports.registrarPedido = (req, res) => {
  let comprador = req.usuarios;

  let total = carrito.reduce(function (_this, val) {
    return _this + val.precio;
  }, 0);

  let productosTotal = " ";

  for (i in carrito) {
    let current = carrito[i].id;
    if (current != undefined) {
      productosTotal += current + " ";
    }
  }

  db.all(
    "INSERT INTO pedidos(comprador, products, subtotal, total) VALUES(?, ?, ?, ?)",
    [comprador.id, productosTotal, total, total],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    }
  );
};
