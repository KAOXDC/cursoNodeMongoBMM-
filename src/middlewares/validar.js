const validar = (origen, schema) => (req, res, next) => {
  const resultado = schema.safeParse(req[origen] ?? {});

  if (!resultado.success) {
    const errores = resultado.error.issues.map((problema) => ({
      campo: problema.path.join(".") || origen,
      mensaje: problema.message
    }));

    return res.status(400).json({ mensaje: "Datos inválidos", errores });
  }

  // Guardamos los datos ya validados y limpios
  req.validado = { ...req.validado, [origen]: resultado.data };
  next();
};

module.exports = validar;