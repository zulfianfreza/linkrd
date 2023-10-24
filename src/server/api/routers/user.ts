import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";
import { siteParams } from "../schemas/site";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.email, ctx.session.user.email ?? ""),
    });

    return user;
  }),

  getUserByUsername: publicProcedure
    .input(siteParams)
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.username, input.username ?? ""),
      });

      return user;
    }),
});
