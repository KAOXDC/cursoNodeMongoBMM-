// src/config/db.js
const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

const conectarDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    logger.info("Conectado a MongoDB");
  } catch (error) {
    logger.error("No se pudo conectar con MongoDB", { mensajeError: error.message });
    process.exit(1);
  }
};

module.exports = conectarDB;
