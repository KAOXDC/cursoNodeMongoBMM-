// src/config/db.js
const mongoose = require("mongoose");

const conectarDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/curso_express";

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;