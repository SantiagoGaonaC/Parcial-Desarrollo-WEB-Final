const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productosController");

//ruta obtener productos
//router.get("/api", productoController.mostrar);
// router.get("/api", (req, res) => {
//   res.render("index.ejs", {
//     data
//   });
  
// });

router.get("/api", productosController.mostrar)

module.exports = router;
