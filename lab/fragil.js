// lab/fragil.js: API FRÁGIL, solo para el laboratorio. Nunca la publiques en internet.
const express = require("express");
const mongoose = require("mongoose");
const Restaurante = require("../src/models/restaurante.model");

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/curso_lab";

const app = express();

app.use(express.json({ limit: "50mb" })); // límite exagerado a propósito

app.get("/restaurantes", async (req, res) => {
  res.json(await Restaurante.find());
});

app.get("/restaurantes/:id", async (req, res) => {
  res.json(await Restaurante.findById(req.params.id));
});

app.post("/restaurantes", async (req, res) => {
  res.status(201).json(await Restaurante.create(req.body)); // sin validar
});

app.patch("/restaurantes/:id", async (req, res) => {
  res.json(await Restaurante.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" }));
});

app.post("/buscar", async (req, res) => {
  res.json(await Restaurante.find(req.body)); // el cliente decide el filtro completo
});

mongoose.connect(URI).then(() => {
  // 0.0.0.0 permite que los compañeros se conecten desde otros equipos de la red
  app.listen(PORT, "0.0.0.0", () => console.log(`API frágil en http://0.0.0.0:${PORT}`));
});
