// src/routes/restaurantes.js
const { Router } = require("express");
const controlador = require("../controllers/restaurantes");

const router = Router();
// http://localhost:4000/api/restaurantes
// https://www.mipagina.com/api/restaurantes/2
router.get("/", controlador.obtenerTodos);
router.get("/:id", controlador.obtenerPorId);
router.post("/", controlador.crear);
router.put("/:id", controlador.reemplazar);
router.patch("/:id", controlador.actualizar);
router.delete("/:id", controlador.eliminar);

module.exports = router;