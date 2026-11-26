// demo-rechazo.js  ·  node demo-rechazo.js            (sin protección: Node termina con código 1)
//                     node demo-rechazo.js --proteger (registra la razón y sale con orden)
if (process.argv.includes("--proteger")) {
  process.on("unhandledRejection", (razon) => {
    console.error("[unhandledRejection] registrado:", razon.message);
    process.exit(1);
  });
}

const buscarRestaurante = async () => {
  throw new Error("Restaurante no encontrado");
};

console.log("1. Llamo a la función async SIN await y SIN catch");
buscarRestaurante(); // promesa rechazada que nadie atrapa

setTimeout(() => console.log("2. Esto solo se imprime si el proceso sigue vivo"), 500);
