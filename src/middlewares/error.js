// src/middlewares/error.middleware.js
const AppError = require("../utils/AppError");
const logger = require("../utils/logger");

// Convierte los errores conocidos (de Express, Mongoose o nuestros) en un AppError.
// Devuelve null si el error no se reconoce: es un fallo inesperado.
const traducirError = (err) => {
  if (err instanceof AppError) return err;

  // express.json(): JSON mal formado
  if (err.type === "entity.parse.failed") {
    return new AppError("El cuerpo de la petición no es un JSON válido", 400);
  }

  // express.json(): cuerpo más grande que el límite
  if (err.type === "entity.too.large") {
    return new AppError("El cuerpo de la petición es demasiado grande", 413);
  }

  // Mongoose: no pasó las reglas del esquema
  if (err.name === "ValidationError" && err.errors) {
    const errores = Object.values(err.errors).map((e) => ({ campo: e.path, mensaje: e.message }));
    return new AppError("Datos inválidos", 400, errores);
  }

  // Mongoose: un valor no se pudo convertir (por ejemplo, un id mal formado)
  if (err.name === "CastError") {
    return new AppError(`El valor enviado para "${err.path}" no es válido`, 400);
  }

  // MongoDB: índice único violado
  if (err.code === 11000) {
    return new AppError("Ya existe un registro con esos datos", 409);
  }

  return null;
};

// Middleware de errores: se reconoce por sus CUATRO parámetros
const errorHandler = (err, req, res, next) => {
  // Si la respuesta ya empezó a enviarse, Express debe cerrar la conexión
  if (res.headersSent) return next(err);

  const conocido = traducirError(err);

  if (!conocido) {
    // Fallo inesperado: el detalle va al log del servidor, nunca al cliente
    logger.error("Error inesperado", { ruta: `${req.method} ${req.originalUrl}`, ...logger.detalle(err) });
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }

  const cuerpo = { mensaje: conocido.message };
  if (conocido.errores) cuerpo.errores = conocido.errores;

  res.status(conocido.statusCode).json(cuerpo);
};

module.exports = errorHandler;
