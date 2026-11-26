// src/config/env.js
// Lee el archivo .env, valida cada variable y expone la configuración ya convertida.
// Si algo falta o es inválido, el servidor NO arranca (falla rápido).
const path = require("path");
require("dotenv").config({
  path: process.env.ENV_FILE || path.join(__dirname, "..", "..", ".env"),
  quiet: true
});
const { z } = require("zod");

const esquemaEnv = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  // Las variables de entorno siempre llegan como texto: coerce las convierte en número
  PORT: z.coerce.number({ error: "PORT debe ser un número" }).int().min(1).max(65535).default(3000),
  MONGODB_URI: z
    .string({ error: "MONGODB_URI es obligatoria" })
    .min(1, "MONGODB_URI no puede estar vacía"),
  BCRYPT_ROUNDS: z.coerce.number({ error: "BCRYPT_ROUNDS debe ser un número" }).int().min(4).max(15).default(10)
});

const resultado = esquemaEnv.safeParse(process.env);

if (!resultado.success) {
  console.error("Configuración inválida. Revisa tu archivo .env:");
  for (const problema of resultado.error.issues) {
    // Solo mostramos el nombre de la variable y el motivo, NUNCA su valor
    console.error(`  - ${problema.path.join(".")}: ${problema.message}`);
  }
  process.exit(1);
}

module.exports = Object.freeze(resultado.data);
