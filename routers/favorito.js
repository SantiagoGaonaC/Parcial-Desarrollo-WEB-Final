const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const favoritoController = require("../controllers/favoritoController");

router.get(
  "/favorito/:id",
  authController.Authenticated,
  favoritoController.registrarPedido
);

module.exports = router;
