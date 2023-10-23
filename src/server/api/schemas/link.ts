import { z } from "zod";

export const createLinkSchema = z.object({
  label: z.string().optional(),
  url: z.string().optional(),
  type: z.string(),
  extra: z.string().optional(),
});

export const updateLinkSchema = z.object({
  linkId: z.string(),
  label: z.string().optional(),
  url: z.string().optional(),
  active: z.boolean().optional(),
  extra: z.string().optional(),
});
