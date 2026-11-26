// src/utils/logger.js
// Registro de errores: una línea JSON por evento, en consola y en logs/app.log
const fs = require("fs");
const path = require("path");

const carpeta = path.join(__dirname, "..", "..", "logs");
fs.mkdirSync(carpeta, { recursive: true });
const archivo = path.join(carpeta, "app.log");

const escribir = (nivel, mensaje, extra = {}) => {
  const linea = JSON.stringify({ fecha: new Date().toISOString(), nivel, mensaje, ...extra });
  (nivel === "error" ? console.error : console.log)(linea);
  fs.appendFileSync(archivo, linea + "\n");
};

// Convierte cualquier cosa que se haya lanzado (Error, texto, objeto) en datos para el log
const detalle = (valor) =>
  valor instanceof Error
    ? { nombre: valor.name, mensajeError: valor.message, stack: valor.stack }
    : { valor: String(valor) };

module.exports = {
  info: (mensaje, extra) => escribir("info", mensaje, extra),
  error: (mensaje, extra) => escribir("error", mensaje, extra),
  detalle
};
