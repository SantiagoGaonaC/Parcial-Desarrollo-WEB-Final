const express = require("express");
const router = express.Router();

const carritoController = require("../controllers/carritoController");

router.get("/carrito", carritoController.mostrar);
router.get("/agregar-carrito/:id", carritoController.añadirCarrito);
router.delete("/carrito/:id", carritoController.borrar);
router.put("/carrito/:id", carritoController.actualizar);
module.exports = router;
