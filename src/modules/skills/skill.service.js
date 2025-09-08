import { Op } from "sequelize";
import { AppError, NotFoundError } from "../../lib/appError.js";
import db from "../../models/index.js";
import { logger } from "../../lib/logger.js";

export const createSkill = async ({ name, description = null, userId, requestId }) => {
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

  logger.info("Skill created successfully", {
    requestId,
    context: "Skill-Service",
    data: {
      userId,
      name
    },
  });

  return skill;
};

export const getSkills = async ({ userId, requestId }) => {
  const skills = await db.Skill.findAll({ where: { user_id: userId, is_deleted: false } });
  if (!skills.length) {
    new AppError({
      status: 400,
      code: "NO_SKILL_ADDED",
      message: "Add skills firsts"
    });
  }

  logger.info("Skills fetched successfully", {
    requestId,
    context: "Skill-Service",
    data: {
      userId,
      skills,
    }
  });
  return skills;
};

export const updateSkill = async ({ userId, skillId, data, requestId }) => {
  const [rowsChanged, updatedSkill] = await db.Skill.update(
    data,
    {
      where: {
        user_id: userId,
        id: skillId,
        is_deleted: false
      },
      returning: true
    }
  );

  if (!rowsChanged) {
    NotFoundError("Skill");
  }

  logger.info("Skill updated successfully", {
    requestId,
    context: "Skill-Service",
    data: {
      userId,
      skillId,
      updatedSkill,
    }
  });

  return updatedSkill[0];
};

export const deleteSkill = async ({ userId, skillId, requestId }) => {
  const [isDeleted] = await db.Skill.update(
    { is_deleted: true },
    {
      where: {
        user_id: userId,
        id: skillId,
        is_deleted: false
      }
    }
  );

  if (!isDeleted) {
    NotFoundError("Skill");
  }

  logger.info("Skill deleted successfully", {
    requestId,
    context: "Skill-Service",
    data: {
      userId,
      skillId,
    }
  });

  return "Skill deleted successfully";
};
