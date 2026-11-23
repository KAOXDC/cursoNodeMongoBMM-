// demo-sync.js: errores síncronos y try/catch
const texto = '{"nombre":'; // JSON incompleto

try {
  const dato = JSON.parse(texto);
  console.log("Dato:", dato);
} catch (error) {
  console.log("Atrapado:", error.name);
  console.log("Mensaje:", error.message);
} finally {
  console.log("finally siempre se ejecuta");
}

console.log("El programa sigue vivo");
