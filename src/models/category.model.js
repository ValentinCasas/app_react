import { DataTypes } from "sequelize";
import connectionBD from "../db.js";


const Category = connectionBD.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        colour: {
            type: DataTypes.STRING,
        },

    },
    {
        tableName: "Category",
        timestamps: false,
    }
);

export default Category;