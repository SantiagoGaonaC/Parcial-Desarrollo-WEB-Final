const express = require("express");
const app = express();
const path = require("path");

//requerir la conexión SQLITE3
const db = require("./data/db.js");

//setear plantillas folder views
app.set("views", path.join(__dirname, "views"));
//setear motor de plantillas
app.set("view engine", "ejs");

//formato JSON para creación y edición
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "JSON")));

//CSS static
app.use(express.static(__dirname + '/public/css'));
app.use('/public/css', express.static(__dirname + '/public/css'));


//routes
app.use(require("./routers/productos"));
//404 handler
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

app.listen(3000, () => {
  console.log("¡Server ON! en http://localhost:3000");
});
