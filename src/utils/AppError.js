// src/utils/AppError.js
// Error "esperado" de la aplicación: lleva el código HTTP que debe responder la API
class AppError extends Error {
  constructor(mensaje, statusCode = 500, errores) {
    super(mensaje);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errores = errores; // detalle opcional, por ejemplo la lista de campos inválidos
  }
}

module.exports = AppError;
