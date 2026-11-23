const actualizarRestauranteSchema = z
  .object(campos)
  .partial()
  .refine((datos) => Object.keys(datos).length > 0, "Envía al menos un campo para actualizar");

const idParamSchema = z.object({
  id: z.string({ error: "El id es obligatorio" }).regex(/^[0-9a-fA-F]{24}$/, "El id no es válido")
});

const filtroRestauranteSchema = z.object({
  ciudad: z.string({ error: "ciudad debe ser un texto" }).trim().min(1, "ciudad no puede estar vacía").optional()
});

module.exports = {
  crearRestauranteSchema,
  actualizarRestauranteSchema,
  idParamSchema,
  filtroRestauranteSchema
};