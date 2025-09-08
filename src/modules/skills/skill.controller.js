import * as SkillService from "./skill.service.js";
export const createSkill = async (req, res, next) => {
  try {
    const skill = await SkillService.createSkill({
      name: req.body.name,
      description: req.body.description,
      userId: "c2f0362c-6135-4c5d-9c6c-3b1c83872013",
      requestId: req.requestId,
    });

    res
      .status(201)
      .json({
        success: true,
        data: skill,
      });
  } catch (err) {
    next(err);
  }
};

export const getMySkills = async (req, res, next) => {
  try {
    const skills = await SkillService.getSkills({
      userId: "c2f0362c-6135-4c5d-9c6c-3b1c83872013",
      requestId: req.requestId,
    });
    res
      .status(200)
      .json(skills);
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const updatedSkill = await SkillService.updateSkill({
      userId: "c2f0362c-6135-4c5d-9c6c-3b1c83872013",
      skillId: req.params.skillId,
      data: req.body,
    });
    res
      .status(200)
      .json(updatedSkill);
  } catch (err) {
    next(err);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const isDeleted = await SkillService.deleteSkill({
      userId: "c2f0362c-6135-4c5d-9c6c-3b1c83872013",
      skillId: req.params.skillId,
      requestId: req.requestId,
    });

    res
      .status(200)
      .json(isDeleted);
  } catch (err) {
    next(err);
  }
};
