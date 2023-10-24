import { themes } from "~/server/db/schema";
import { themeSchema } from "../schemas/theme";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

export const themeRouter = createTRPCRouter({
  updateTheme: protectedProcedure
    .input(themeSchema)
    .mutation(async ({ input, ctx }) => {
      const res = ctx.db
        .insert(themes)
        .values({
          id: createId(),
          userId: ctx.session.user.id,
          backgroundImage: input.backgroundImage,
          backgroundType: input.backgroundType,
          backgroundPrimary: input.backgroundPrimary,
          backgroundSecondary: input.backgroundSecondary,
          buttonType: input.buttonType,
          buttonColor: input.buttonColor,
          buttonFontColor: input.buttonFontColor,
          themeType: input.themeType,
          fontColor: input.fontColor,
          fontFamily: input.fontFamily,
          hideLogo: input.hideLogo,
          shadowColor: input.shadowColor,
          socialIconPosition: input.socialIconPosition,
        })
        .onConflictDoUpdate({
          target: themes.userId,
          set: {
            backgroundImage: input.backgroundImage,
            backgroundType: input.backgroundType,
            backgroundPrimary: input.backgroundPrimary,
            backgroundSecondary: input.backgroundSecondary,
            buttonType: input.buttonType,
            buttonColor: input.buttonColor,
            buttonFontColor: input.buttonFontColor,
            themeType: input.themeType,
            fontColor: input.fontColor,
            fontFamily: input.fontFamily,
            hideLogo: input.hideLogo,
            shadowColor: input.shadowColor,
            socialIconPosition: input.socialIconPosition,
          },
          where: eq(themes.userId, ctx.session.user.id),
        });

      return res;
    }),

  getTheme: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.themes.findFirst({
      where: eq(themes.userId, ctx.session?.user.id ?? ""),
    });

    return res;
  }),
});
