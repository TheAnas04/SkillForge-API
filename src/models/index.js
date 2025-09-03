import sequelize from "../lib/sequelize.js"
import UserModel from "../modules/users/user.model.js";

const User = UserModel(sequelize, sequelize.Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  User,
};

export default db;