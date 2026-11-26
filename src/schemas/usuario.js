// src/schemas/usuario.schema.js
const { z } = require("zod");

// bcrypt solo usa los primeros 72 bytes de la contraseña: ponemos ese tope
const password = z
  .string({ error: "La contraseña es obligatoria" })
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(72, "La contraseña no puede superar 72 caracteres");

// strictObject: si llega un campo de más (por ejemplo "rol"), se rechaza
const registroSchema = z.strictObject({
  nombre: z.string({ error: "El nombre es obligatorio" }).trim().min(2, "El nombre es muy corto").max(60),
  email: z.email({ error: "El email no es válido" }).trim().toLowerCase(),
  password
});

const loginSchema = z.strictObject({
  email: z.email({ error: "El email no es válido" }).trim().toLowerCase(),
  password: z.string({ error: "La contraseña es obligatoria" }).min(1, "La contraseña es obligatoria").max(72)
});

module.exports = { registroSchema, loginSchema };
