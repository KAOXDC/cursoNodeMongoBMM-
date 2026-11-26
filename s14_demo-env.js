// demo-env.js  ·  node demo-env.js
// Windows PowerShell:  $env:PORT=5000; node demo-env.js
// Linux/Mac:           PORT=5000 node demo-env.js
require("dotenv").config({ quiet: true });

console.log("PORT crudo:", process.env.PORT, "→ tipo:", typeof process.env.PORT);
console.log("PORT + 1 sin convertir:", process.env.PORT + 1, "(se concatena como texto)");
console.log("PORT convertido con Number():", Number(process.env.PORT) + 1);
console.log("Variable que no existe:", process.env.NO_EXISTE);
console.log("Hay clave secreta cargada:", Boolean(process.env.MONGODB_URI));
// Regla: las variables de entorno siempre son texto. Hay que convertirlas y validarlas.
