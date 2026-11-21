const express = require("express");
const app = express();

app.use((req, res, next) => { console.log("1 Middleware "); next(); });
app.use((req, res, next) => { console.log("2 Middleware "); next(); });

app.get("/demo", (req,res) => { console.log("3 Manejador de Ruta"); res.send("respuesta de /demo"); })

app.use((req, res, next) => { console.log("4 Middleware "); next(); });

app.listen(3600, () => console.log("Servidor en http://localhost:3600"))