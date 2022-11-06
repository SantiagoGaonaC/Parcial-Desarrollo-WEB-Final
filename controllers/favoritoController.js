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
    "SELECT favoritos FROM usuarios WHERE favoritos = ? and id = ?",
    [idProducto, comprador.id],
    (error, results) => {
      if (error) {
        console.log("Error en BD favoritos: " + error);
        res.redirect("/");
      } else if (results[0] == undefined) {
        console.log("No existe favorito");
        //ENTONCES CREAR EL FAV INSERTAR

        res.redirect("/");
      } else {
        console.log("Existe favorito");
        //ENTONCES BORRAR EL FAV
        
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

  /*
  IF (existe el id del producto ya para el usuario X?) => no hacer nada (BORRAR??)
  ELSE (
    INSERTAR EN DB 
  FAV CORRESPONDIENTE AL USUARIO X
  ) 
  */
  res.redirect("/");
};