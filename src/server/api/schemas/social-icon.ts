import { z } from "zod";

export const socialIconSchema = z.object({
  iconId: z.number(),
  url: z.string(),
});

export const updateSocialIconSchema = z.object({
  active: z.boolean().optional(),
  url: z.string().optional(),
  socialIconId: z.string(),
});

export type UpdateSocialIconSchema = z.infer<typeof updateSocialIconSchema>;
