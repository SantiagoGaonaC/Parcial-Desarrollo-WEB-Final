const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productosController");

router.get("/", productosController.mostrar);
router.get("/carrito-producto-borrar/:id", productosController.borrar);

module.exports = router;
