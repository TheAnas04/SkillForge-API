import express from "express";
import { createSkill } from "./skill.controller.js";
import validate from "../../middleware/validate.js";
import { createSkillSchema } from "./skill.schema.js";

const router = express.Router();

router.post("/add",
  validate({ body: createSkillSchema }),
  createSkill,
);

export default router;