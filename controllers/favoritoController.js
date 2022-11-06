const fs = require("fs");
const json_data = fs.readFileSync("JSON/data.json", "utf-8");
const data = JSON.parse(json_data);
const db = require("../data/db");
global.carrito = require("./carritoController");
global.favoritos = [];

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
        res.redirect("/");
      } else {
        db.all("DELETE FROM favoritos WHERE favorito = ? and usuario = ?", [
          idProducto,
          comprador.id
        ]);
        res.redirect("/");
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
