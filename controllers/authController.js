const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const db = require("../data/db");

module.exports.mostrar = (req, res) => {
  res.render("registro.ejs");
  //res.status(200).json(carrito);
};

exports.register = async (req, res) => {
  email_ex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  try {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const password = req.body.password;

    if (!nombre || !apellido || !email || !password) {
      //si no ingresó nada se indica que ingrese algo
      res.redirect("/");
    } else if (
      nombre.length > 20 ||
      apellido.length > 20
      //password.length > 30
    ) {
      res.redirect("/");
    } else if (!email_ex.test(email)) {
      console.log("email no valida...");
      res.redirect("/");
    } else if (req.body.password != req.body.password2) {
      console.log("Contraseñas no iguales...");
      res.redirect("/");
    } else {
      //hash de la pass
      let passHash = await bcryptjs.hash(req.body.password, 8);
      db.run(
        "INSERT INTO usuarios(nombre, apellido, email, contraseña) VALUES(?, ?, ?, ?)",
        [nombre, apellido, email, passHash],
        (error, results) => {
          if (error) {
            if (
              error.code == "ER_DUP_ENTRY" ||
              error.errno == 1062 ||
              error.errno == 19
            ) {
              console.log("Usuario duplicado");
              res.redirect("/");
            } else {
              console.log("Otro error en la query");
              console.log(error);
              res.redirect("/");
            }
          } else {
            console.log("Usuario registrado");
            //res.redirect('/',NotifySweetAlert.RegistroExitoso())
            res.redirect("/");
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};