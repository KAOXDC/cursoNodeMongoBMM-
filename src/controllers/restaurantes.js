// src/controllers/restaurantes.js
const Restaurante = require("../models/restaurantes");

const obtenerTodos = (req, res) => {
  try {
    const { ciudad } = req.query;
    const restaurantes = Restaurante.listar(ciudad); // []  ==> todo es texto
    res.status(200).json(restaurantes); // texto  >> json
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

const obtenerPorId = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ mensaje: "El id debe ser un número" });
  }

  const restaurante = Restaurante.obtenerPorId(id);

  if (!restaurante) {
    return res.status(404).json({ mensaje: "Restaurante no encontrado" });
  }

  res.status(200).json(restaurante);
};

// {  "nombre": "Carantana", "ciudad": "Popayán" }
const crear = (req, res) => {
  const { nombre, ciudad } = req.body ?? {};

  if (!nombre || !ciudad) {
    return res.status(400).json({ mensaje: "nombre y ciudad son obligatorios" });
  }

  const nuevo = Restaurante.crear({ nombre, ciudad });
  res.status(201).json(nuevo);
};


// src/controllers/restaurantes.js (continuación)
// {  "nombre": "Carantanta", "ciudad": "Popayán" }
const reemplazar = (req, res) => {
  const id = Number(req.params.id);
  const { nombre, ciudad } = req.body ?? {};

  if (Number.isNaN(id)) {
    return res.status(400).json({ mensaje: "El id debe ser un número" });
  }

  if (!nombre || !ciudad) {
    return res.status(400).json({ mensaje: "PUT requiere nombre y ciudad" });
  }

  const actualizado = Restaurante.reemplazar(id, { nombre, ciudad });

  if (!actualizado) {
    return res.status(404).json({ mensaje: "Restaurante no encontrado" });
  }

  res.status(200).json(actualizado);
};

// {  "nombre": "Carantana Restaurante"}
const actualizar = (req, res) => {
  const id = Number(req.params.id);
  const { nombre, ciudad } = req.body ?? {};

  if (Number.isNaN(id)) {
    return res.status(400).json({ mensaje: "El id debe ser un número" });
  }

  if (nombre === undefined && ciudad === undefined) {
    return res.status(400).json({ mensaje: "Envía al menos un campo para actualizar" });
  }

  const actualizado = Restaurante.actualizar(id, { nombre, ciudad });

  if (!actualizado) {
    return res.status(404).json({ mensaje: "Restaurante no encontrado" });
  }

  res.status(200).json(actualizado);
};

const eliminar = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ mensaje: "El id debe ser un número" });
  }

  const eliminado = Restaurante.eliminar(id);

  if (!eliminado) {
    return res.status(404).json({ mensaje: "Restaurante no encontrado" });
  }

  res.status(200).json({ mensaje: "Restaurante eliminado" });
};

module.exports = { obtenerTodos, obtenerPorId, crear, reemplazar, actualizar, eliminar };