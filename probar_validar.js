const validar = require("./src/middlewares/validar");
const { crearRestauranteSchema } = require("./src/schemas/restaurantes");

const middleware = validar("body", crearRestauranteSchema);

// Caso 1: datos válidos
const req1 = { body: { nombre: "  Verde Vivo ", ciudad: "Cali", hack: "x" } };
middleware(req1, {}, () => console.log("next() llamado. req.validado =", req1.validado));

// Caso 2: datos inválidos
const req2 = { body: { nombre: 123 } };
const res2 = {
  status(codigo) { console.log("status:", codigo); return this; },
  json(cuerpo) { console.log("json:", JSON.stringify(cuerpo, null, 2)); }
};
middleware(req2, res2, () => console.log("NO debería llamarse"));
// node probar_validar.js