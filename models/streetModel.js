import { DataTypes } from "sequelize"; // utilizamos sequalize
import db from "../config/db.js";

const Street = db.define("Street", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Street;
