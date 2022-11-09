const fs = require("fs");
const json_data = fs.readFileSync("JSON/data.json", "utf-8");
const data = JSON.parse(json_data);
const db = require("../data/db");
global.carrito = require("./carritoController");

module.exports.registrarPedido = (req, res) => {
  const idProducto = req.params.id;
  let comprador = req.usuarios;
  console.log(idProducto, comprador.id);
  db.all(
    "SELECT * FROM favoritos WHERE favorito = ? and usuario = ?",
    [idProducto, comprador.id],
    (error, results) => {
      if (error) {
        console.log("Error en BD favoritos: " + error);
        res.redirect("/");
      } else if (results[0] == undefined) {
        db.all("INSERT INTO favoritos (usuario, favorito) VALUES (?,?)", [
          comprador.id,
          idProducto
        ]);
        res.redirect("/favoritos");
      } else {
        db.all("DELETE FROM favoritos WHERE favorito = ? and usuario = ?", [
          idProducto,
          comprador.id
        ]);
        res.redirect("/favoritos");
      }
      /*
      console.log(error);
      console.log(results);
      console.log(Object.keys(results));
      console.log(results[0]);
      */
    }
  );
};

module.exports.mostrarFavoritos = (req, res) => {
  var total = carrito.reduce(function (_this, val) {
    return _this + val.precio;
  }, 0);
  let favoritos = [];
  let comprador = req.usuarios;
  db.all(
    "SELECT favorito FROM favoritos WHERE usuario = ?",
    [comprador.id],
    (error, results) => {
      if (error) {
        console.log("Error en mostrar favoritos: " + error);
        res.redirect("/");
      } else {
        Object.keys(results).forEach(function (key) {
          var row = results[key];
          data.forEach((producto) => {
            if (producto.id == row.favorito) {
              favoritos.push(producto);
              console.log(favoritos);
            }
          });
        });
        res.render("favoritos.ejs", {
          data: favoritos,
          carrito,
          total
        });
      }
    }
  );
};
