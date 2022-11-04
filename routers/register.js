const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/crear-cuenta", authController.mostrar);
router.post("/register", authController.register);

module.exports = router;