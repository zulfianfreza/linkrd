import { eq } from "drizzle-orm";
import { sites } from "~/server/db/schema";
import { siteParams, siteSchema } from "../schemas/site";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const siteRouter = createTRPCRouter({
  updateSite: protectedProcedure
    .input(siteSchema)
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .insert(sites)
        .values({
          userId: ctx.session.user.id,
          bio: input.bio,
          profileTitle: input.profileTitle,
          profileImage: input.profileImage,
          metaDescription: input.metaDescription,
          metaTitle: input.metaTitle,
        })
        .onConflictDoUpdate({
          target: sites.id,
          set: {
            bio: input.bio,
            profileTitle: input.profileTitle,
            profileImage: input.profileImage,
            metaDescription: input.metaDescription,
            metaTitle: input.metaTitle,
          },
          where: eq(sites.userId, ctx.session.user.id),
        });

      return res;
    }),

  getSite: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.sites.findFirst({
      where: eq(sites.userId, ctx.session.user.id),
    });

    return res;
  }),
});
