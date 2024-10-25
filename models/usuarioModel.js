import { DataTypes } from "sequelize"; // utilizamos sequalize
import sequelize from "../config/db.js";
import db from "../config/db.js";

// defino mi modelo de usuario con sequalize
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    // timestamps:false,  // si quiero desactivar el crear y modificar fecha de creacion
  }
);

// funcion para encontrar el usuario a traves del mail
User.findByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user; // devuelve el usuario encontrado o null si no lo encuentra
  } catch (err) {
    throw err; // Lanza el error para manejarlo donde se llame
  }
};

// Funcion para crear un nuevo usuario
User.createUser = async (userData) => {
  try {
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    return newUser; // Devuelve el usuario creado
  } catch (err) {
    throw err; // Lanza el error para manejarlo donde se llame
  }
};

export default User;
