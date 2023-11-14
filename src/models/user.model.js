import { DataTypes } from "sequelize";
import connectionBD from "../db.js";


const User = connectionBD.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "User",
    timestamps: false,
  }
);


export default User;