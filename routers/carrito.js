const express = require("express");
const router = express.Router();

const carritoController = require("../controllers/carritoController");
const authController = require("../controllers/authController");

router.get("/carrito", authController.Authenticated, carritoController.mostrar);
router.get("/agregar-carrito/:id", carritoController.añadirCarrito);
router.get("/borrar-carrito/:id", carritoController.borrar);
router.put("/carrito/:id", carritoController.actualizar);

module.exports = router;
