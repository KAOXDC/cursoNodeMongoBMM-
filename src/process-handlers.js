// src/process-handlers.js
// Red de seguridad a nivel de proceso: errores que nadie atrapó y señales de apagado.
const logger = require("./utils/logger");

const registrar = (cerrarRecursos) => {
  let apagando = false;

  const apagar = async (motivo, codigo) => {
    if (apagando) return;
    apagando = true;
    logger.info(`Apagando el servidor (${motivo})`);

    // Si el cierre se cuelga, forzamos la salida a los 10 segundos
    const limite = setTimeout(() => {
      logger.error("Cierre forzado: se agotó el tiempo de espera");
      process.exit(1);
    }, 10000);
    limite.unref();

    try {
      await cerrarRecursos();
      logger.info("Recursos cerrados correctamente");
    } catch (error) {
      logger.error("Error al cerrar los recursos", logger.detalle(error));
    }
    process.exit(codigo);
  };

  // Una promesa rechazada que nadie atrapó
  process.on("unhandledRejection", (razon) => {
    logger.error("unhandledRejection", logger.detalle(razon));
    apagar("unhandledRejection", 1);
  });

  // Una excepción que nadie atrapó: el proceso ya está en estado dudoso, se registra y se sale
  process.on("uncaughtException", (error) => {
    logger.error("uncaughtException", logger.detalle(error));
    apagar("uncaughtException", 1);
  });

  // Apagado ordenado: Ctrl+C (SIGINT) o la orden de la plataforma (SIGTERM)
  process.on("SIGINT", () => apagar("SIGINT", 0));
  process.on("SIGTERM", () => apagar("SIGTERM", 0));
};

module.exports = registrar;
