// src/controllers/auth.controller.js
const bcrypt = require("bcrypt");
const env = require("../config/env");
const Usuario = require("../models/usuario");
const AppError = require("../utils/AppError");

// Hash de mentira para comparar cuando el email no existe: así tardamos lo mismo
// y no revelamos si un correo está registrado
const HASH_FALSO = bcrypt.hashSync("contraseña-que-nadie-usa", env.BCRYPT_ROUNDS);

const registrar = async (req, res) => {
  const { nombre, email, password } = req.validado.body;

  // 1) Hash: la contraseña nunca se guarda tal cual
  const passwordHash = await bcrypt.hash(password, env.BCRYPT_ROUNDS);

  // 2) Guardar solo el hash. Si el email ya existe, Mongo lanza el error 11000 (409)
  const usuario = await Usuario.create({ nombre, email, passwordHash });

  res.status(201).json({ mensaje: "Usuario creado", usuario });
};

const login = async (req, res) => {
  const { email, password } = req.validado.body;

  // +passwordHash: pedimos explícitamente el campo que normalmente está oculto
  const usuario = await Usuario.findOne({ email }).select("+passwordHash");

  // 3) Comparar: bcrypt lee la sal del propio hash y repite el cálculo
  const coincide = await bcrypt.compare(password, usuario ? usuario.passwordHash : HASH_FALSO);

  // Mismo mensaje y mismo código para "email no existe" y "contraseña incorrecta"
  if (!usuario || !coincide) throw new AppError("Credenciales inválidas", 401);

  res.status(200).json({ mensaje: "Inicio de sesión correcto", usuario });
};

module.exports = { registrar, login };
