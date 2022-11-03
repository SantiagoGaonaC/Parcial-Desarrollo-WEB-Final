const express = require("express");
const router = express.Router();

const carritoController = require("../controllers/carritoController");

router.get("/carrito", carritoController.mostrar);
router.get("/carrito/:id", carritoController.añadirCarrito);
router.get("/carrito/:id", carritoController.borrar);
router.get("/carrito/:id", carritoController.actualizar);
module.exports = router;
