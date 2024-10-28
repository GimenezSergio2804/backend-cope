import { DataTypes } from "sequelize";
import db from "../config/db.js";

const ONU = db.define("onu", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gpon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("activa", "con fallas", "dañada"),
    allowNull: false,
  },
  descripcion_estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default ONU;