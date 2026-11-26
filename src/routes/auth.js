// src/routes/auth.routes.js
const { Router } = require("express");
const controlador = require("../controllers/auth");
const validar = require("../middlewares/validar");
const { registroSchema, loginSchema } = require("../schemas/usuario");

const router = Router();

router.post("/registro", validar("body", registroSchema), controlador.registrar);
router.post("/login", validar("body", loginSchema), controlador.login);

module.exports = router;
