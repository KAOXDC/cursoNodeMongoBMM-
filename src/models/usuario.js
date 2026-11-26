// src/models/usuario.model.js
const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: [true, "El nombre es obligatorio"], trim: true },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true
    },
    // Aquí se guarda el HASH, nunca la contraseña. select:false: no sale en las consultas.
    passwordHash: { type: String, required: true, select: false },
    // El rol lo asigna el servidor; el cliente no puede enviarlo (lo usaremos en la sesión 15)
    rol: { type: String, enum: ["usuario", "admin"], default: "usuario" }
  },
  { timestamps: true }
);

// Por si algún día se devuelve el documento completo: el hash nunca sale en el JSON
usuarioSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
