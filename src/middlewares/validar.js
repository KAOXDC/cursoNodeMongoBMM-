// src/middlewares/validar.middleware.js
const AppError = require("../utils/AppError");

// Fábrica de middlewares: valida req[origen] ("body", "params" o "query") con un esquema de Zod
const validar = (origen, schema) => (req, res, next) => {
  const resultado = schema.safeParse(req[origen] ?? {});

  if (!resultado.success) {
    const errores = resultado.error.issues.map((problema) => ({
      campo: problema.path.join(".") || origen,
      mensaje: problema.message
    }));

    // Ya no respondemos aquí: el middleware global de errores da la respuesta
    return next(new AppError("Datos inválidos", 400, errores));
  }

  req.validado = { ...req.validado, [origen]: resultado.data };
  next();
};

module.exports = validar;
