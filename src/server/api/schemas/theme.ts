import { z } from "zod";

export const themeSchema = z.object({
  buttonType: z.string().optional(),
  buttonColor: z.string().optional(),
  buttonFontColor: z.string().optional(),
  shadowColor: z.string().optional(),
  themeType: z.string().optional(),
  backgroundPrimary: z.string().optional(),
  backgroundImage: z.string().optional(),
  backgroundSecondary: z.string().optional(),
  backgroundType: z.string().optional(),
  fontColor: z.string().optional(),
  fontFamily: z.string().optional(),
  socialIconPosition: z.string().optional(),
  hideLogo: z.boolean().optional(),
});
