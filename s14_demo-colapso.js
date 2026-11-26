// demo-colapso.js  ·  node demo-colapso.js            (sin protección: el proceso muere)
//                     node demo-colapso.js --proteger (registra el error y sale con orden)
const express = require("express");
const app = express();

if (process.argv.includes("--proteger")) {
  process.on("uncaughtException", (error) => {
    console.error("[uncaughtException] registrado:", error.message);
    console.error("Salgo con código 1 para que un supervisor me reinicie.");
    process.exit(1);
  });
}

app.get("/ok", (req, res) => res.json({ estado: "vivo" }));

app.get("/colapsar", (req, res) => {
  res.json({ mensaje: "Respondí bien... pero dejé una bomba programada" });
  // Este error ocurre FUERA de la petición: Express no puede atraparlo
  setTimeout(() => {
    throw new Error("Boom dentro de un setTimeout");
  }, 100);
});

app.listen(3501, () => {
  console.log("http://localhost:3501/ok  ·  http://localhost:3501/colapsar");
});
