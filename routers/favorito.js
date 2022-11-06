const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const favoritoController = require("../controllers/favoritoController");

router.get(
  "/favorito/:id",
  authController.Authenticated,
  favoritoController.registrarPedido
);

router.get(
  "/favoritos",
  authController.Authenticated,
  favoritoController.mostrarFavoritos
);

module.exports = router;
