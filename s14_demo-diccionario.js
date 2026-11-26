// demo-diccionario.js  ·  node demo-diccionario.js
// Ataque de diccionario: probar contraseñas comunes contra un hash robado.
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const diccionario = [
  "123456", "password", "qwerty", "abc123", "111111", "iloveyou", "admin", "welcome",
  "colombia", "popayan", "futbol", "123456789", "contraseña", "letmein", "monkey",
  "dragon", "master", "sunshine", "princess", "football"
];

const victima = "futbol"; // contraseña débil de un usuario

(async () => {
  // Base de datos robada 1: guardaron SHA-256
  const hashSha = crypto.createHash("sha256").update(victima).digest("hex");
  let inicio = process.hrtime.bigint();
  const hallada1 = diccionario.find((p) => crypto.createHash("sha256").update(p).digest("hex") === hashSha);
  const ms1 = Number(process.hrtime.bigint() - inicio) / 1e6;
  console.log(`SHA-256 → contraseña: "${hallada1}" en ${ms1.toFixed(2)} ms`);

  // Base de datos robada 2: guardaron bcrypt (costo 10)
  const hashBcrypt = await bcrypt.hash(victima, 10);
  inicio = process.hrtime.bigint();
  let intentos = 0;
  let hallada2 = null;
  for (const palabra of diccionario) {
    intentos++;
    if (await bcrypt.compare(palabra, hashBcrypt)) {
      hallada2 = palabra;
      break;
    }
  }
  const ms2 = Number(process.hrtime.bigint() - inicio) / 1e6;
  console.log(`bcrypt  → contraseña: "${hallada2}" en ${ms2.toFixed(0)} ms (${intentos} intentos)`);
  console.log(`≈ ${(ms2 / intentos).toFixed(0)} ms por intento: probar 1 millón de palabras tomaría horas.`);
  console.log("Moraleja: bcrypt no hace imposible adivinar, lo hace carísimo. Y una clave débil sigue siendo débil.");
})();
