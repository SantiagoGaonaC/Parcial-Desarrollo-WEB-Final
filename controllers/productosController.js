global.carrito = require("./carritoController");

const fs = require("fs");
const json_data = fs.readFileSync("JSON/data.json", "utf-8");
const data = JSON.parse(json_data);

module.exports.mostrar = (req, res) => {
  //total del carrito = variable total
  var total = carrito.reduce(function (_this, val) {
    return _this + val.precio;
  }, 0);

  res.render("index.ejs", {
    data,
    carrito,
    total
  });
  //res.status(200).json(data);
};

module.exports.borrar = (req, res) => {
  const id = req.params.id;
  carrito = carrito.filter(producto => producto.id != id); //todos los datos serán agregados excepto el que cumple
  res.redirect("/");
  //res.send(200, data);
};