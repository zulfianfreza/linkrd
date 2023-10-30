import { createId } from "@paralleldrive/cuid2";
import { TRPCError } from "@trpc/server";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";
import { links, type Link } from "~/server/db/schema";
import {
  createLinkSchema,
  linkParams,
  updateLinkSchema,
} from "../schemas/link";
import { siteParams } from "../schemas/site";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const linkRouter = createTRPCRouter({
  addLink: protectedProcedure
    .input(createLinkSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const user = ctx.session.user;
        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "you're not logged in",
          });
        }

        const linksData = await ctx.db.query.links.findMany();

        const res = ctx.db
          .insert(links)
          .values({
            id: createId(),
            userId: user.id,
            label: input.label,
            url: input.url,
            index: linksData.length,
            type: input.type,
            extra: input.extra,
            active: true,
          })
          .returning();

        return res;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    }),

  getLinks: protectedProcedure.query(async ({ ctx }) => {
    const res = ctx.db.query.links.findMany({
      where: eq(links.userId, ctx.session.user.id),
      orderBy: asc(links.index),
    });

    return res;
  }),

  updateLink: protectedProcedure
    .input(updateLinkSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const user = ctx.session.user;
        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "you're not logged in",
          });
        }

        await ctx.db
          .update(links)
          .set({
            label: input.label,
            url: input.url,
            active: input.active,
            extra: input.extra,
          })
          .where(eq(links.id, input.linkId));
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    }),

  getLinksByUsername: publicProcedure
    .input(siteParams)
    .query(async ({ input, ctx }) => {
      try {
        const res = await ctx.db.query.links.findMany({
          where: and(
            eq(links.userId, input.userId ?? ""),
            eq(links.active, true),
          ),
          orderBy: asc(links.index),
        });

        return res;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    }),

  deleteLink: protectedProcedure
    .input(z.object({ linkId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.delete(links).where(eq(links.id, input.linkId));
    }),

  reorderLinkPosition: protectedProcedure
    .input(
      z.object({
        newIndex: z.number(),
        oldIndex: z.number(),
        linkId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { oldIndex, newIndex } = input;
      const linksData = await ctx.db.query.links.findMany({
        where: eq(links.userId, ctx.session.user.id),
      });

      let link: Link | undefined;
      if (
        oldIndex >= 0 &&
        oldIndex < linksData.length &&
        newIndex >= 0 &&
        newIndex < linksData.length
      ) {
        link = linksData.splice(oldIndex, 1)[0];

        linksData.splice(newIndex, 0, link!);

        for (let i = 0; i < linksData.length; i++) {
          console.log(linksData[i]);
          linksData[i]!.index = i;
          await ctx.db
            .update(links)
            .set({
              index: i,
            })
            .where(eq(links.id, linksData[i]?.id ?? ""));
        }
      }

      return linksData;
    }),

  incrementClickCount: publicProcedure
    .input(linkParams)
    .mutation(async ({ input, ctx }) => {
      const link = await ctx.db.query.links.findFirst({
        where: eq(links.id, input.linkId),
      });

      const res = await ctx.db
        .update(links)
        .set({
          clickCount: (link?.clickCount ?? 0) + 1,
        })
        .where(eq(links.id, link?.id ?? ""));

      return res;
    }),
});
