import { Sequelize } from "sequelize";
import { config } from "../config/env.js";

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    dialect: "postgres",
    dialectOptions: {},
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log("DB conneted..."))
  .catch((err) => console.error("Erorr conneting to database: ", err));

export default sequelize;