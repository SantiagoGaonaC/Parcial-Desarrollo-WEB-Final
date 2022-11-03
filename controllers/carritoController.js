const fs = require("fs");
const json_data = fs.readFileSync("JSON/data.json", "utf-8");
const data = JSON.parse(json_data);
const carrito = [];

module.exports.añadirCarrito = (req, res) => {
  const id = req.params.id;
  data.forEach((producto) => {
    if (producto.id == id) {
      carrito.push(producto);
      const carrito_json = JSON.stringify(carrito);
      res.status(200).json(carrito);
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
  res.render("index.ejs", {
    carrito
  });
  //res.send(200, data);
};

module.exports.actualizar = (req, res) => {
    const id = req.params.id;
  res.render("index.ejs", {
    carrito
  });
  //res.send(200, data);
};
