// src/server.js
const app = require("./app");
const conectarDB = require("./config/db") // cargar modulo de conexion a la base de datos

const PORT = process.env.PORT || 3500;

const iniciar = async () => {
  await conectarDB();  
  
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
};

iniciar();


