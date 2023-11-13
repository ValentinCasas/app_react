import { Sequelize } from "sequelize";

const connectionBD = new Sequelize(
  "aprendiendo_vue_dev",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default connectionBD;
