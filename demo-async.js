// demo-async.js: errores asíncronos con async/await y try/catch
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const buscarRestaurante = async (id) => {
  await esperar(100); // simula la consulta a MongoDB
  if (id !== 1) throw new Error("Restaurante no encontrado");
  return { id, nombre: "Verde Vivo" };
};

const main = async () => {
  try {
    const r = await buscarRestaurante(1);
    console.log("Encontrado:", r.nombre);

    await buscarRestaurante(2); // lanza el error
    console.log("Esta línea no se ejecuta");
  } catch (error) {
    console.log("Atrapado:", error.message);
  } finally {
    console.log("Fin de main");
  }
};

main();
