import { z } from "zod";

export const siteSchema = z.object({
  profileTitle: z.string().optional(),
  bio: z.string().optional(),
  profileImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const siteParams = z.object({
  username: z.string().optional(),
  userId: z.string().optional(),
});
