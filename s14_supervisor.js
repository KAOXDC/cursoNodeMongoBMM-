// supervisor.js
// Mini-supervisor para la clase: arranca el servidor y lo reinicia si se cae.
// En producción se usa PM2, systemd o el "restart: always" de Docker; la idea es la misma.
const { spawn } = require("child_process");

const MAX_REINICIOS = 5; // más de 5 caídas en la ventana: algo grave pasa, no insistir
const VENTANA_MS = 30000;
const ESPERA_MS = 1000;
let caidas = [];

const arrancar = () => {
  console.log("[supervisor] Arrancando el servidor...");
  const hijo = spawn(process.execPath, ["src/server.js"], { stdio: "inherit" });

  hijo.on("exit", (codigo, senal) => {
    // Salida limpia (Ctrl+C o apagado ordenado): no reiniciar
    if (codigo === 0 || senal) {
      console.log("[supervisor] El servidor terminó de forma ordenada. Fin.");
      process.exit(0);
    }

    const ahora = Date.now();
    caidas = caidas.filter((t) => ahora - t < VENTANA_MS).concat(ahora);
    if (caidas.length > MAX_REINICIOS) {
      console.error("[supervisor] Demasiadas caídas seguidas. Me detengo; revisa logs/app.log");
      process.exit(1);
    }

    console.log(`[supervisor] El servidor cayó (código ${codigo}). Reinicio en ${ESPERA_MS} ms...`);
    setTimeout(arrancar, ESPERA_MS);
  });

};

// Ctrl+C: la terminal se lo envía también al servidor, que cierra ordenadamente.
// El supervisor solo espera a que el servidor termine (su "exit" decide qué hacer).
process.on("SIGINT", () => {});

arrancar();
