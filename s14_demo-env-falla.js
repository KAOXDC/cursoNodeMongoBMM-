// demo-env-falla.js  ·  node demo-env-falla.js
// Simula una configuración mala: no hay archivo .env y el puerto es inválido.
process.env.ENV_FILE = "no-existe.env";
process.env.PORT = "abc";
delete process.env.MONGODB_URI;

require("./src/config/env"); // aquí el programa debe salir con un mensaje claro
console.log("Esto no debería imprimirse");
