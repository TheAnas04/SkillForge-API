import z from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(3, "skill name is required"),
  description: z.string().min(15).optional(),
});

export const idSchema = z.object({
  skillId: z.uuidv4()
});

export const updateSkillSchema = createSkillSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
  });