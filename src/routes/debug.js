// src/routes/debug.routes.js
// SOLO PARA LA CLASE: rutas que tumban el servidor a propósito.
// app.js las monta únicamente cuando NODE_ENV no es "production".
const { Router } = require("express");

const router = Router();

// Excepción lanzada FUERA del ciclo de la petición: Express no puede atraparla
router.get("/excepcion", (req, res) => {
  res.json({ mensaje: "Programada una excepción para dentro de 100 ms" });
  setTimeout(() => {
    throw new Error("Excepción lanzada dentro de un setTimeout");
  }, 100);
});

// Promesa rechazada que nadie espera ni atrapa
router.get("/rechazo", (req, res) => {
  res.json({ mensaje: "Lanzada una promesa rechazada sin catch" });
  Promise.reject(new Error("Promesa rechazada sin catch"));
});

module.exports = router;
