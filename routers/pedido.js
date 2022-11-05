const express = require("express");
const router = express.Router();

const pedidoController = require("../controllers/pedidoController");
const authController = require("../controllers/authController");

router.get(
  "/register-pedido",
  authController.Authenticated,
  pedidoController.registrarPedido
);

module.exports = router;
