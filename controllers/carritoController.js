const fs = require("fs");
const json_data = fs.readFileSync("JSON/data.json", "utf-8");
const data = JSON.parse(json_data);
let carrito = [];

module.exports = carrito;

module.exports.añadirCarrito = (req, res) => {
  const id = req.params.id;
  data.forEach((producto) => {
    if (producto.id == id) {
      carrito.push(producto);
      res.redirect("/");
    }
  });
  //res.send(200, data);
};

module.exports.mostrar = (req, res) => {
  /*   res.render("index.ejs", {
    carrito
  }); */
  res.status(200).json(carrito);
};

module.exports.borrar = (req, res) => {
  const id = req.params.id;
  carrito = carrito.filter(producto => producto.id != id); //todos los datos serán agregados excepto el que cumple
  res.redirect("/");
  //res.send(200, data);
};

module.exports.actualizar = (req, res) => {
  const id = req.params.id;
  res.render("index.ejs", {
    carrito
  });
  //res.send(200, data);
};