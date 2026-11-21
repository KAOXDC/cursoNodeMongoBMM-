// src/controllers/restaurantes.controller.js
const mongoose = require("mongoose");
const Restaurante = require("../models/restaurantes");

// Lista blanca: solo estos campos se aceptan desde el body
const CAMPOS_EDITABLES = ["nombre", "ciudad", "categorias", "calificacion", "abierto"];

const seleccionarCampos = (body = {}) =>
  Object.fromEntries(
    Object.entries(body).filter(([clave]) => CAMPOS_EDITABLES.includes(clave))
  );

const idValido = (id) => mongoose.isValidObjectId(id);

const manejarError = (error, res) => {
  if (error.name === "ValidationError") {
    const errores = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ mensaje: "Datos inválidos", errores });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ mensaje: "Algún valor enviado tiene un tipo inválido" });
  }

  console.error(error);
  res.status(500).json({ mensaje: "Error interno del servidor" });
};

// Localhost:3500/api/restaurantes?ciudad=cali
const obtenerTodos = async (req, res) => {
  try {
    const { ciudad } = req.query;
    const filtro = ciudad ? { ciudad } : {};
    const restaurantes = await Restaurante.find(filtro).collation({ locale: "es", strength: 2 });
    res.status(200).json(restaurantes);
  } catch (error) {
    manejarError(error, res);
  }
};

// // Localhost:3500/api/restaurantes/
// const obtenerTodos = async (req, res) => {
//   try {
//     const restaurantes = await Restaurante.find(filtro).collation({ locale: "es", strength: 2 });
//     res.status(200).json(restaurantes);
//   } catch (error) {
//     manejarError(error, res);
//   }
// };

const obtenerPorId = async (req, res) => {
  const { id } = req.params;

  if (!idValido(id)) {
    return res.status(400).json({ mensaje: "El id no es válido" });
  }

  try {
    const restaurante = await Restaurante.findById(id);

    if (!restaurante) {
      return res.status(404).json({ mensaje: "Restaurante no encontrado" });
    }

    res.status(200).json(restaurante);
  } catch (error) {
    manejarError(error, res);
  }
};

// Crear un restaurante 
const crear = async (req, res) => {
  try {
    const nuevo = await Restaurante.create(seleccionarCampos(req.body)); // db.restaurante.insertOne({})
    res.status(201).json(nuevo);
  } catch (error) {
    manejarError(error, res);
  }
};

const reemplazar = async (req, res) => {
  const { id } = req.params;

  if (!idValido(id)) {
    return res.status(400).json({ mensaje: "El id no es válido" });
  }

  try {
    const restaurante = await Restaurante.findById(id);

    if (!restaurante) {
      return res.status(404).json({ mensaje: "Restaurante no encontrado" });
    }

    const { nombre, ciudad, categorias = [], calificacion = 0, abierto = true } = req.body ?? {};
    restaurante.set({ nombre, ciudad, categorias, calificacion, abierto });
    await restaurante.save();

    // no crea un registro nuevo  con la misma instacia del restaurante con el mismo ID
    // guardar el cambio del objeto en la BD ---> Documento

    res.status(200).json(restaurante);
  } catch (error) {
    manejarError(error, res);
  }
};

const actualizar = async (req, res) => {
  const { id } = req.params;
  const cambios = seleccionarCampos(req.body);

  if (!idValido(id)) {
    return res.status(400).json({ mensaje: "El id no es válido" });
  }

  if (Object.keys(cambios).length === 0) {
    return res.status(400).json({ mensaje: "Envía al menos un campo para actualizar" });
  }

  try {
    const actualizado = await Restaurante.findByIdAndUpdate(id, cambios, {
      returnDocument: "after",
      runValidators: true
    });

    if (!actualizado) {
      return res.status(404).json({ mensaje: "Restaurante no encontrado" });
    }

    res.status(200).json(actualizado);
  } catch (error) {
    manejarError(error, res);
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;

  if (!idValido(id)) {
    return res.status(400).json({ mensaje: "El id no es válido" });
  }

  try {
    const eliminado = await Restaurante.findByIdAndDelete(id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: "Restaurante no encontrado" });
    }

    res.status(200).json({ mensaje: "Restaurante eliminado" });
  } catch (error) {
    manejarError(error, res);
  }
};

module.exports = { obtenerTodos, obtenerPorId, crear, reemplazar, actualizar, eliminar };
