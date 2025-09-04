import * as SkillService from "./skill.service.js";
export const createSkill = async (req, res, next) => {
  try {
    const skill = await SkillService.createSkill({
      name: req.body.name,
      description: req.body.description,
      userId: "c2f0362c-6135-4c5d-9c6c-3b1c83872013",
    });

    res
      .status(201)
      .json({
        success: true,
        data: skill,
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
