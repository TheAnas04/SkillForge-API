import { Op } from "sequelize";
import { AppError } from "../../lib/appError.js";
import db from "../../models/index.js";

export const createSkill = async ({ name, description = null, userId }) => {
  const isExist = await db.Skill.findOne({
    where: {
      user_id: userId,
      name: { [Op.iLike]: name }
    }
  });

  if (isExist) {
    throw new AppError({
      status: 409,
      code: "SKILL_EXISTS",
      message: `Skill ${name} already exist`,
    });
  }

  const skill = await db.Skill.create({
    name,
    description,
    user_id: userId,
  });

  return skill;
};