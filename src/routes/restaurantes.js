// src/routes/restaurantes.routes.js
const { Router } = require("express");
const controlador = require("../controllers/restaurantes");

const router = Router();

router.get("/", controlador.obtenerTodos);
router.get("/:id", controlador.obtenerPorId);
router.post("/", controlador.crear);
router.put("/:id", controlador.reemplazar);
router.patch("/:id", controlador.actualizar);
router.delete("/:id", controlador.eliminar);

module.exports = router;