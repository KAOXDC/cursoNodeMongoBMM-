// demo-hash.js  ·  node demo-hash.js
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const password = "Clave-Secreta-123";

(async () => {
  console.log("=== 1. ENCRIPTAR (se puede revertir) ===");
  const clave = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cifrador = crypto.createCipheriv("aes-256-cbc", clave, iv);
  const cifrado = Buffer.concat([cifrador.update(password, "utf8"), cifrador.final()]);
  const descifrador = crypto.createDecipheriv("aes-256-cbc", clave, iv);
  const original = Buffer.concat([descifrador.update(cifrado), descifrador.final()]).toString();
  console.log("Cifrado :", cifrado.toString("hex"));
  console.log("Con la clave se recupera:", original);

  console.log("\n=== 2. HASH simple (SHA-256): sin sal, siempre igual ===");
  const sha = () => crypto.createHash("sha256").update(password).digest("hex");
  console.log("Hash 1:", sha());
  console.log("Hash 2:", sha());
  console.log("Misma contraseña → mismo hash: dos usuarios con la misma clave se delatan");

  console.log("\n=== 3. bcrypt: con sal, distinto cada vez ===");
  const h1 = await bcrypt.hash(password, 10);
  const h2 = await bcrypt.hash(password, 10);
  console.log("Hash 1:", h1);
  console.log("Hash 2:", h2);
  console.log("¿Son iguales?", h1 === h2);
  console.log("Anatomía:  $2b$ = versión · 10 = costo · 22 caracteres = sal · 31 = hash");
  console.log("Sal del hash 1:", h1.slice(7, 29));

  console.log("\n=== 4. Comparar ===");
  console.log("Clave correcta  contra hash 1:", await bcrypt.compare(password, h1));
  console.log("Clave correcta  contra hash 2:", await bcrypt.compare(password, h2));
  console.log("Clave incorrecta contra hash 1:", await bcrypt.compare("otra-clave", h1));

  console.log("\n=== 5. El costo (rounds) hace el cálculo más lento a propósito ===");
  for (const rounds of [8, 10, 12]) {
    const inicio = Date.now();
    await bcrypt.hash(password, rounds);
    console.log(`rounds ${rounds}: ${Date.now() - inicio} ms`);
  }
  console.log("Cada +1 de costo duplica el tiempo. Un atacante paga ese tiempo en cada intento.");
})();
