// src/middlewares/notFound.middleware.js
const AppError = require("../utils/AppError");

// Se registra después de todas las rutas: si la petición llega aquí, ninguna ruta la atendió
const notFound = (req, res, next) => {
  next(new AppError("Ruta no encontrada", 404));
};

module.exports = notFound;
