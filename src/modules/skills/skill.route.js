import express from "express";
import { createSkill, deleteSkill, getMySkills, updateSkill } from "./skill.controller.js";
import validate from "../../middleware/validate.js";
import { createSkillSchema, idSchema, updateSkillSchema } from "./skill.schema.js";

const router = express.Router();

router.post("/add",
  validate({ body: createSkillSchema }),
  createSkill,
);

router.get("/getAll", getMySkills);

router.patch("/:skillId",
  validate({ params: idSchema, body: updateSkillSchema }),
  updateSkill,
);

router.delete("/:skillId",
  validate({ params: idSchema }),
  deleteSkill
);

export default router;