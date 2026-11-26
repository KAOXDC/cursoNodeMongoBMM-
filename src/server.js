// src/server.js
const env = require("./config/env");
const mongoose = require("mongoose");
const app = require("./app");
const conectarDB = require("./config/db");
const registrarProceso = require("./process-handlers");
const logger = require("./utils/logger");

const iniciar = async () => {
  await conectarDB();

  const servidor = app.listen(env.PORT, () => {
    logger.info(`Servidor escuchando en http://localhost:${env.PORT}`, { entorno: env.NODE_ENV });
  });

  // Al apagar: dejar de recibir peticiones, terminar las que están en curso y cerrar MongoDB
  registrarProceso(
    () =>
      new Promise((resolver, rechazar) => {
        servidor.close(async (error) => {
          if (error) return rechazar(error);
          await mongoose.connection.close();
          resolver();
        });
      })
  );
};

iniciar();
