const express = require("express");

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());

const restaurantes = [
  { id: 1, nombre: "La Esquina del Ajiaco", ciudad: "Bogotá" },
  { id: 2, nombre: "Pizza Nonna", ciudad: "Medellín" },
  { id: 3, nombre: "Verde Vivo", ciudad: "Cali" }
];

app.get("/", (req, res) => {
  res.send("¡Hola desde Express!");
});

app.get("/api/salud", (req, res) => {
  res.json({ estado: "ok", hora: new Date().toISOString() });
});

app.get("/api/restaurantes", (req, res) => {
  const { ciudad } = req.query;

  if (ciudad) {
    const filtrados = restaurantes.filter(
      (r) => r.ciudad.toLowerCase() === ciudad.toLowerCase()
    );
    return res.json(filtrados);
  }

  res.json(restaurantes);
});

app.get("/api/restaurantes/:id", (req, res) => {
  const id = Number(req.params.id);
  const restaurante = restaurantes.find((r) => r.id === id);

  if (!restaurante) {
    return res.status(404).json({ mensaje: "Restaurante no encontrado" });
  }

  res.json(restaurante);
});

app.post("/api/restaurantes", (req, res) => {
  const { nombre, ciudad } = req.body;

  if (!nombre || !ciudad) {
    return res.status(400).json({ mensaje: "nombre y ciudad son obligatorios" });
  }

  const nuevo = { id: restaurantes.length + 1, nombre, ciudad };
  restaurantes.push(nuevo);
  res.status(201).json(nuevo);
});

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});