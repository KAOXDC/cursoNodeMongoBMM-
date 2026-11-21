// src/models/restaurante.model.js
const mongoose = require("mongoose");

const restauranteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"]
    },
    ciudad: {
      type: String,
      required: [true, "La ciudad es obligatoria"],
      trim: true
    },
    categorias: {
      type: [String],
      default: []
    },
    calificacion: {
      type: Number,
      min: [0, "La calificación mínima es 0"],
      max: [5, "La calificación máxima es 5"],
      default: 0
    },
    abierto: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// En las respuestas JSON: mostrar "id" en lugar de "_id" y ocultar "__v"
restauranteSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Restaurante", restauranteSchema);
