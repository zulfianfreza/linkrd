import { createId } from "@paralleldrive/cuid2";
import { asc, eq } from "drizzle-orm";
import { socialIcon } from "~/server/db/schema";
import { siteParams } from "../schemas/site";
import {
  socialIconSchema,
  updateSocialIconSchema,
} from "../schemas/social-icon";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const socialIconRouter = createTRPCRouter({
  addSocialIcon: protectedProcedure
    .input(socialIconSchema)
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.insert(socialIcon).values({
        id: createId(),
        userId: ctx.session.user.id,
        active: true,
        iconId: input.iconId,
        url: input.url,
      });

      return res;
    }),

  getSocialIcon: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.socialIcon.findMany({
      where: eq(socialIcon.userId, ctx.session.user.id),
      orderBy: asc(socialIcon.id),
    });

    return res;
  }),

  getSocialIconByUsername: publicProcedure
    .input(siteParams)
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.socialIcon.findMany({
        where: eq(socialIcon.userId, input.userId ?? ""),
      });

      return res;
    }),

  updateSocialIcon: protectedProcedure
    .input(updateSocialIconSchema)
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(socialIcon)
        .set({
          active: input.active,
          url: input.url,
        })
        .where(eq(socialIcon.id, input.socialIconId));

      return res;
    }),

  deleteSocialIcon: protectedProcedure
    .input(z.object({ socialIconId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .delete(socialIcon)
        .where(eq(socialIcon.id, input.socialIconId));

      return res;
    }),
});
