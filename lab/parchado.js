// lab/parchado.js: la misma API del laboratorio, con los parches aplicados
const express = require("express");
const mongoose = require("mongoose");
const { z } = require("zod");
const Restaurante = require("../src/models/restaurante");
const validar = require("../src/middlewares/validar");
const notFound = require("../src/middlewares/notFound");
const errorHandler = require("../src/middlewares/error");
const AppError = require("../src/utils/AppError");
const {
  crearRestauranteSchema,
  actualizarRestauranteSchema,
  idParamSchema
} = require("../src/schemas/restaurante.schema");

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/curso_lab";

// Parche 5: la búsqueda solo acepta filtros conocidos; cualquier otra cosa se rechaza
const buscarSchema = z.strictObject({
  ciudad: z.string().trim().min(1).max(60).optional(),
  calificacionMin: z.number().min(0).max(5).optional()
});

const app = express();

app.use(express.json({ limit: "10kb" })); // Parche 1: límite razonable

app.get("/restaurantes", async (req, res) => {
  res.json(await Restaurante.find());
});

app.get("/restaurantes/:id", validar("params", idParamSchema), async (req, res) => {
  const restaurante = await Restaurante.findById(req.validado.params.id);
  if (!restaurante) throw new AppError("Restaurante no encontrado", 404);
  res.json(restaurante);
});

app.post("/restaurantes", validar("body", crearRestauranteSchema), async (req, res) => {
  res.status(201).json(await Restaurante.create(req.validado.body)); // Parche 2: datos validados
});

app.patch(
  "/restaurantes/:id",
  validar("params", idParamSchema),
  validar("body", actualizarRestauranteSchema),
  async (req, res) => {
    const actualizado = await Restaurante.findByIdAndUpdate(req.validado.params.id, req.validado.body, {
      returnDocument: "after",
      runValidators: true // Parche 3: las reglas de Mongoose también en las actualizaciones
    });
    if (!actualizado) throw new AppError("Restaurante no encontrado", 404);
    res.json(actualizado);
  }
);

app.post("/buscar", validar("body", buscarSchema), async (req, res) => {
  const { ciudad, calificacionMin } = req.validado.body;
  const filtro = {};
  if (ciudad) filtro.ciudad = ciudad;
  if (calificacionMin !== undefined) filtro.calificacion = { $gte: calificacionMin };
  res.json(await Restaurante.find(filtro));
});

app.use(notFound); // Parche 4: errores siempre en JSON y sin detalles internos
app.use(errorHandler);

mongoose.connect(URI).then(() => {
  app.listen(PORT, "0.0.0.0", () => console.log(`API parchada en http://0.0.0.0:${PORT}`));
});
