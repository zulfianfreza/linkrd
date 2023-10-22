import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { links } from "~/server/db/schema";

export const linkRouter = createTRPCRouter({
  addLink: protectedProcedure
    .input(
      z.object({
        label: z.string(),
        url: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "you're not logged in",
        });
      }

      const linksData = await ctx.db.query.links.findMany();

      const newLink = ctx.db.insert(links).values({
        userId: user.id,
        label: input.label,
        url: input.url,
        index: linksData.length,
        type: input.type,
      });

      return newLink;
    }),
});
