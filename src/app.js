const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./middlewares/logger");
const restaurantesRoutes = require("./routes/restaurantes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(logger); // antes de las rutas
// app.use(express.json());
app.use(express.json({ limit : "10kb" }));

app.get("/api/salud", (req, res) => {
  res.status(200).json({ estado: "ok" });
});

app.use("/api/restaurantes", restaurantesRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

module.exports = app;