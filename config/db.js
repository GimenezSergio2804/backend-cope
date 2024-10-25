import mysql from "mysql2"; // modulo q conecta a mysql y nos da cierta ayuda
import Sequelize from "sequelize"; // orm para base de datos. me permite trabajar como objetos la consulta
import dotenv from "dotenv"; // variables de entorno
// carga variables de entorno
dotenv.config();

// configuracion de conexion a la base de datos
const db = new Sequelize(
  process.env.DB_NAME, // nombre de la base de datos
  process.env.DB_USER, // usuario
  process.env.DB_PASSWORD, // contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.PORT_DB,
    dialect: "mysql",
    define: {
      timestamps: true, // crea una columna de creacion y modificacion de usuario
    },
    pool: {
      max: 12, // maximo de conexion
      min: 0, // min de conexiones
      acquire: 30000, // tiempo antes de marcar error
      idle: 10000, // si ve q no hay visitas ns da 10 segundos para que la conexion finalice
    },
    operatorAliases: false, // obsoleto, por si acaso lo anulo
  }
);

export default db;
