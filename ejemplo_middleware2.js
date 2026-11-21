const express = require("express");
const app = express();

// Caso 1: no llama a next() ni responde → se cuelga
app.get("/colgado", (req, res, next) => {
  console.log("Middleware que no llama a next()");
});

// Caso 2: corta la cadena respondiendo antes de la ruta

const requiereClave = (req, res, next) => {
    if (req.get("x-api-key") !== "curso123") {
        return res.status(401).json({ mensaje: "Clave de API inválida" });
    }
    next();
};
app.get("/privado", requiereClave, (req, res) => res.json({ mensaje: "Contenido privado" }));

// Caso 3: pasa un error a Express
app.get("/falla", (req, res, next) => next(new Error("Falla simulada")));

app.listen(3600, () => console.log("Servidor en http://localhost:3600"))