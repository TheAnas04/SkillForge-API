import sequelize from "../lib/sequelize.js";
import UserModel from "../modules/users/user.model.js";
import SkillModel from "../modules/skills/skill.model.js";

const User = UserModel(sequelize, sequelize.Sequelize.DataTypes);
const Skill = SkillModel(sequelize, sequelize.Sequelize.DataTypes);

// Associations
User.hasMany(Skill, {
  foreignKey: "user_id",
  as: "skills",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Skill.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  User,
  Skill,
};

export default db;