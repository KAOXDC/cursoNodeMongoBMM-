// src/schemas/restaurante.schema.js
const { z } = require("zod");

// Campos reutilizables, sin valores por defecto
const campos = {
  nombre: z
    .string({ error: "El nombre es obligatorio y debe ser texto" })
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre puede tener máximo 80 caracteres"),
  ciudad: z
    .string({ error: "La ciudad es obligatoria y debe ser texto" })
    .trim()
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(60, "La ciudad puede tener máximo 60 caracteres"),
  categorias: z
    .array(z.string().trim().min(1, "Las categorías no pueden estar vacías"), {
      error: "Las categorías deben ser una lista de textos"
    })
    .max(10, "Se permiten máximo 10 categorías"),
  calificacion: z
    .number({ error: "La calificación debe ser un número" })
    .min(0, "La calificación mínima es 0")
    .max(5, "La calificación máxima es 5"),
  abierto: z.boolean({ error: "abierto debe ser verdadero o falso" })
};

// POST y PUT: nombre y ciudad obligatorios; el resto tiene valor por defecto
const crearRestauranteSchema = z.object({
  nombre: campos.nombre,
  ciudad: campos.ciudad,
  categorias: campos.categorias.default([]),
  calificacion: campos.calificacion.default(0),
  abierto: campos.abierto.default(true)
});

// PATCH: todos los campos son opcionales, pero debe venir al menos uno
const actualizarRestauranteSchema = z
  .object(campos)
  .partial()
  .refine((datos) => Object.keys(datos).length > 0, "Envía al menos un campo para actualizar");

// Parámetro de ruta :id
const idParamSchema = z.object({
  id: z.string({ error: "El id es obligatorio" }).regex(/^[0-9a-fA-F]{24}$/, "El id no es válido")
});

// Query de GET /api/restaurantes
const filtroRestauranteSchema = z.object({
  ciudad: z.string({ error: "ciudad debe ser un texto" }).trim().min(1, "ciudad no puede estar vacía").optional()
});

module.exports = {
  crearRestauranteSchema,
  actualizarRestauranteSchema,
  idParamSchema,
  filtroRestauranteSchema
};
