// usamos ecma en vez de common JS, para anularlo cambiarlo en el type de packajson
import express from "express"; // framework para creacion de proyectos (minimalista)
import dotenv from "dotenv"; // variables de entorno
import db from "./config/db.js"; // importacion de la base de datos
import usuariosRoutes from "./routes/usuariosRoutes.js"; // rutas para usuarios

// Cargar variables de entorno
dotenv.config();

// conexion a la base de datos
try {
  await db.authenticate();
  console.log("Conexion correcta a la Base de datos");
  // Sincroniza todos los modelos con la base de datos
  await db.sync();
} catch (err) {
  console.error("Error al conectar o sincronizar con la base de datos:", err);
}

// Crear la App
const app = express();

// Middleware para leer JSON en las solicitudes
app.use(express.json());

// Routing
// Prueba
app.get("/test", (req, res) => {
  res.send("Estas dentro del sistema");
});
// usuarios
app.use("/api/usuarios", usuariosRoutes);

// Iniciar el servidor | para este se necesitan dos cosas importantes, definir puerto y arrancar la app

// defino puerto, lo va a buscar a traves de las variables de entorno. sino lo encuentra usa el 3000
const PORT = process.env.PORT || 3000;
// arrancar la app
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
