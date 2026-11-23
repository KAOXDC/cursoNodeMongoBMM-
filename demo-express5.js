// demo-express5.js: Express 5 captura los errores de funciones async
const express = require("express");
const app = express();

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get("/sync-falla", (req, res) => {
  throw new Error("Falla síncrona");
});

app.get("/async-falla", async (req, res) => {
  await esperar(50);
  throw new Error("Falla asíncrona");
});

// Middleware de errores: cuatro parámetros y al final
app.use((err, req, res, next) => {
  res.status(500).json({ mensaje: err.message });
});

app.listen(3402, () => console.log("Demo en http://localhost:3402"));
