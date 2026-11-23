// demo-async-mal.js: SIN await, el try/catch no atrapa el error
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const buscarRestaurante = async (id) => {
  await esperar(100);
  if (id !== 1) throw new Error("Restaurante no encontrado");
  return { id, nombre: "Verde Vivo" };
};

try {
  buscarRestaurante(2); // falta await
  console.log("try terminó sin error");
} catch (error) {
  console.log("Nunca se imprime:", error.message);
}
