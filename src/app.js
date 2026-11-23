// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./middlewares/logger");
const restaurantesRoutes = require("./routes/restaurantes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/error");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(logger);
app.use(express.json({ limit: "10kb" }));

app.get("/api/salud", (req, res) => {
  res.status(200).json({ estado: "ok" });
});

app.use("/api/restaurantes", restaurantesRoutes);

// Siempre al final y en este orden: primero el 404, después el manejador de errores
app.use(notFound);
app.use(errorHandler);

module.exports = app;
