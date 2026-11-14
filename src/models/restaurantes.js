// src/models/restaurante.js
// Datos en memoria. En la sesión 11 se reemplaza por Mongoose y MongoDB.
const restaurantes = [
  { id: 1, nombre: "La Esquina del Ajiaco", ciudad: "Bogotá" }, // i = 0
  { id: 2, nombre: "Pizza Nonna", ciudad: "Medellín" }, // i = 1
  { id: 3, nombre: "Verde Vivo", ciudad: "Cali" } // i = 2
];

let siguienteId = 4;

const listar = (ciudad) => {
  if (!ciudad) return restaurantes;
  return restaurantes.filter(
    (r) => r.ciudad.toLowerCase() === ciudad.toLowerCase()
  );
};

const obtenerPorId = (id) => restaurantes.find((r) => r.id === id);

const crear = ({ nombre, ciudad }) => {
  const nuevo = { id: siguienteId++, nombre, ciudad };
  restaurantes.push(nuevo);
  return nuevo;
};

const reemplazar = (id, { nombre, ciudad }) => {
  const indice = restaurantes.findIndex((r) => r.id === id);
  if (indice === -1) return undefined;
  restaurantes[indice] = { id, nombre, ciudad };
  return restaurantes[indice];
};

const actualizar = (id, { nombre, ciudad }) => {
  const restaurante = obtenerPorId(id);
  if (!restaurante) return undefined;
  if (nombre !== undefined) restaurante.nombre = nombre;
  if (ciudad !== undefined) restaurante.ciudad = ciudad;
  return restaurante;
};

const eliminar = (id) => {
  const indice = restaurantes.findIndex((r) => r.id === id);
  if (indice === -1) return false;
  restaurantes.splice(indice, 1);
  return true;
};

module.exports = { listar, obtenerPorId, crear, reemplazar, actualizar, eliminar };