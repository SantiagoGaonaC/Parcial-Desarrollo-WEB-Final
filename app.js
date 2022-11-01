const express = require("express");
const app = express();

//requerir la conexión SQLITE3
//const db = require("./db");

//setear motor de plantillas
app.set("view engine", "ejs");

//formato JSON para creación y edición
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.listen(3000, () => {
  console.log("¡Server ON! en http://localhost:3000");
});
