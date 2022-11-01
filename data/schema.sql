CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    contraseña TEXT NOT NULL,
    favoritos INTEGER
);

CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comprador INTEGER REFERENCES usuarios (id),
    products TEXT NOT NULL,
    subtotal FLOAT NOT NULL,
    total FLOAT NOT NULL
);