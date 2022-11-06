const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const db = require("../data/db");
const { promisify } = require("util");

//REGISTER
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

//LOGIN
module.exports.mostrarLogin = (req, res) => {
  res.render("login.ejs");
  //res.status(200).json(carrito);
};

module.exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    if (!email || !password) {
      res.redirect("/");
    } else {
      db.all(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
        async (error, results) => {
          //usamos bcrypt de nuevo
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(password, results[0].contraseña))
          ) {
            //si no coincide la pass
            res.redirect("/", console.log("No pass..."));
          } else {
            //inicio de sesion OK
            //JWT Json web token

            db.all(
              "SELECT id FROM usuarios WHERE email = ?",
              [email],
              function (error, results, fields) {
                if (error) {
                  console.log("Error 1: " + error);
                  return;
                }
                const rows = JSON.parse(JSON.stringify(results[0]));
                const id = rows[Object.keys(rows)];

                // here you can access rows
                console.log("ID:", id);
                //conexion.query('UPDATE sesiones SET fecha_sesion=NOW() WHERE usuarios_idusuario = ?', [id]);
                // const id = results[0].id
                const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                  expiresIn: process.env.JWT_TIEMPO_EXPIRA
                });

                //config de cookies
                const opcionesCookies = {
                  expires: new Date(
                    Date.now() +
                      process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
                };
                res.cookie("jwt", token, opcionesCookies); //nombre de la cookie
                res.redirect("/");
              }
            );
          }
        }
      );
    }
  } catch (error) {
    console.log("Error 2" + error);
  }
};

exports.Authenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      db.all(
        "SELECT * FROM usuarios WHERE id = ?",
        [decodificada.id],
        (error, results) => {
          if (!results) {
            return next();
          }
          req.usuarios = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("jwtAdmin");
  return res.redirect("/");
};
