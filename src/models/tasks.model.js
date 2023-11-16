import { DataTypes } from "sequelize";
import connectionBD from "../db.js";


const Task = connectionBD.define(
    "Task",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "Task",
        timestamps: false,
    }
);

export default Task;