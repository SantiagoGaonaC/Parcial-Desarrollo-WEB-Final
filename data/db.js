const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database(
  "./data/database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Conectado a la base de datos.");
  }
);
