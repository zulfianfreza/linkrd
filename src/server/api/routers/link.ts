import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { links } from "~/server/db/schema";

const linkRouter = createTRPCRouter({
  addLink: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "you're not logged in",
        });
      }

      const newLink = ctx.db.insert(links).values({
        userId: user.id,
        label: "",
        url: "",
        index: 0,
        type: "",
      });

      return newLink;
    }),
});
