const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database(
  "./data/database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Conectado a la base de datos. sqlite3");
  }
);

const sql_usuarios = `CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  contraseña TEXT NOT NULL,
  favoritos INTEGER
);`

const sql_pedidos = `
CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comprador INTEGER REFERENCES usuarios (id),
  products TEXT NOT NULL,
  subtotal FLOAT NOT NULL,
  total FLOAT NOT NULL
);`


db.serialize(() => {
  db.run(sql_usuarios,error=>{
    if(error){
      return console.error(error.message);
    }else{
      console.log("Tabla USUARIOS creada correctamente")
    }
  });
  db.run(sql_pedidos,error=>{
    if(error){
      return console.error(error.message);
    }else{
      console.log("Tabla PEDIDOS creada correctamente")
    }
  });
});

module.exports = db;