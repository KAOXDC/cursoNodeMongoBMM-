// lab/seed.js: deja la base del laboratorio con 3 restaurantes
const mongoose = require("mongoose");
const Restaurante = require("../src/models/restaurante.model");

const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/curso_lab";

const datos = [
  { nombre: "Verde Vivo", ciudad: "Cali", categorias: ["vegano"], calificacion: 4.8 },
  { nombre: "La Esquina del Ajiaco", ciudad: "Bogotá", categorias: ["colombiana"], calificacion: 4.7 },
  { nombre: "Mar y Fuego", ciudad: "Cartagena", categorias: ["mariscos"], calificacion: 4.2 }
];

const sembrar = async () => {
  await mongoose.connect(URI);
  await Restaurante.deleteMany({});
  await Restaurante.insertMany(datos);
  console.log("Base del laboratorio restablecida con", datos.length, "restaurantes");
  await mongoose.disconnect();
};

sembrar();
