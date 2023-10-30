import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { links, sites } from "~/server/db/schema";
import { siteParams, siteSchema } from "../schemas/site";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const siteRouter = createTRPCRouter({
  updateSite: protectedProcedure
    .input(siteSchema)
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .insert(sites)
        .values({
          id: createId(),
          userId: ctx.session.user.id,
          bio: input.bio,
          profileTitle: input.profileTitle,
          profileImage: input.profileImage,
          metaDescription: input.metaDescription,
          metaTitle: input.metaTitle,
        })
        .onConflictDoUpdate({
          target: sites.userId,
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

  getSiteByUsername: publicProcedure
    .input(siteParams)
    .query(async ({ input, ctx }) => {
      const site = await ctx.db.query.sites.findFirst({
        where: eq(sites.userId, input.userId ?? ""),
      });

      return site;
    }),

  updateViewCount: publicProcedure
    .input(siteParams)
    .query(async ({ input, ctx }) => {
      const site = await ctx.db.query.sites.findFirst({
        where: eq(sites.userId, input.userId ?? ""),
      });

      const res = await ctx.db
        .insert(sites)
        .values({
          viewCount: 1,
          userId: input.userId ?? "",
          id: createId(),
        })
        .onConflictDoUpdate({
          target: sites.userId,
          set: {
            viewCount: (site?.viewCount ?? 0) + 1,
          },
          where: eq(sites.userId, input.userId ?? ""),
        });

      return res;
    }),

  getAnalytics: protectedProcedure.query(async ({ ctx }) => {
    const site = await ctx.db.query.sites.findFirst({
      where: eq(sites.userId, ctx.session.user.id),
    });

    const linksData = await ctx.db.query.links.findMany({
      where: eq(links.userId, ctx.session.user.id),
    });

    let click = 0;

    linksData.map((link) => (click += link.clickCount ?? 0));

    const views = site?.viewCount ?? 0;
    const ctr = click / views ? (click / views) * 100 : 0;

    return {
      views,
      click,
      ctr,
    };
  }),
});
