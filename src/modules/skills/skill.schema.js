import z from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(3, "skill name is required"),
  description: z.string().min(15).optional(),
});