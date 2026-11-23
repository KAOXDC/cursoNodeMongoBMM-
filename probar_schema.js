const { crearRestauranteSchema } = require("./src/schemas/restaurantes");

const r1 = crearRestauranteSchema.safeParse({ nombre: "  Verde Vivo ", ciudad: "Cali", hack: "x" });
console.log(r1.success, r1.data);

const r2 = crearRestauranteSchema.safeParse({ nombre: 123 });
console.log(r2.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));