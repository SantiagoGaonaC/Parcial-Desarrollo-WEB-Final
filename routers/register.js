const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

//register
router.get("/crear-cuenta", authController.mostrar);
router.post("/register", authController.register);


//login
router.get("/entrar", authController.mostrarLogin);
router.post('/login', authController.login)

//logout
router.get('/logout', authController.logout)
module.exports = router;
