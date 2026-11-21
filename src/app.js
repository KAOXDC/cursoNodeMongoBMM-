const express = require("express");
const restaurantesRoutes = require("./routes/restaurantes");

const app = express();

app.use(express.json());

app.get("/api/salud", (req, res) => {
  res.status(200).json({ estado: "ok" });
});

app.use("/api/restaurantes", restaurantesRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

module.exports = app;