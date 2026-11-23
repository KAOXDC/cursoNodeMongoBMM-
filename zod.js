const { z } = require("zod");

const esquema = z.object({ 
            nombre: z.string().min(2), 
            calificacion: z.number().min(0).max(5) }
        );

const ok = esquema.safeParse({ nombre: "Verde Vivo", calificacion: 4.8 });
console.log(ok.success, ok.data);

const mal = esquema.safeParse({ nombre: 123, calificacion: "4.8" });
console.log(mal.success);
console.log(mal.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));

try { esquema.parse({ nombre: 123 }); } catch (e) { console.log("parse lanza:", e.name); }