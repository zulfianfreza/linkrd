import { TRPCError } from "@trpc/server";
import { and, asc, eq } from "drizzle-orm";
import { links, type NewLink, users, type Link } from "~/server/db/schema";
import { createLinkSchema, updateLinkSchema } from "../schemas/link";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

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
    try {
      const user = ctx.session.user;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "you're not logged in",
        });
      }

      const res = ctx.db.query.links.findMany({
        where: eq(links.userId, user.id),
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
    .input(z.object({ username: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const user = await ctx.db.query.users.findFirst({
          where: eq(users.username, input.username),
        });

        const res = await ctx.db.query.links.findMany({
          where: and(
            eq(links.userId, user ? user.id : ""),
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
        linkId: z.number(),
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
});
