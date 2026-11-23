// src/controllers/restaurantes.controller.js
const Restaurante = require("../models/restaurantes");
const AppError = require("../utils/AppError");

// Express 5 envía al middleware de errores cualquier excepción o rechazo de
// una función async: ya no hace falta try/catch en cada controlador.

const obtenerTodos = async (req, res) => {
  const { ciudad } = req.validado.query;
  const filtro = ciudad ? { ciudad } : {};
  const restaurantes = await Restaurante.find(filtro).collation({ locale: "es", strength: 2 });
  res.status(200).json(restaurantes);
};

const obtenerPorId = async (req, res) => {
  const restaurante = await Restaurante.findById(req.validado.params.id);
  if (!restaurante) throw new AppError("Restaurante no encontrado", 404);
  res.status(200).json(restaurante);
};

const crear = async (req, res) => {
  const nuevo = await Restaurante.create(req.validado.body);
  res.status(201).json(nuevo);
};

const reemplazar = async (req, res) => {
  const restaurante = await Restaurante.findById(req.validado.params.id);
  if (!restaurante) throw new AppError("Restaurante no encontrado", 404);

  restaurante.set(req.validado.body);
  await restaurante.save();

  res.status(200).json(restaurante);
};

const actualizar = async (req, res) => {
  const actualizado = await Restaurante.findByIdAndUpdate(
    req.validado.params.id,
    req.validado.body,
    { returnDocument: "after", runValidators: true }
  );
  if (!actualizado) throw new AppError("Restaurante no encontrado", 404);
  res.status(200).json(actualizado);
};

const eliminar = async (req, res) => {
  const eliminado = await Restaurante.findByIdAndDelete(req.validado.params.id);
  if (!eliminado) throw new AppError("Restaurante no encontrado", 404);
  res.status(200).json({ mensaje: "Restaurante eliminado" });
};

module.exports = { obtenerTodos, obtenerPorId, crear, reemplazar, actualizar, eliminar };
