import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";
import { siteParams } from "../schemas/site";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

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

  checkUsernameIsAvailable: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const check = await ctx.db.query.users.findFirst({
        where: eq(users.username, input.username),
      });

      if (check) {
        return false;
      }

      return true;
    }),

  changeUsername: protectedProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db
        .update(users)
        .set({
          username: input.username,
        })
        .where(eq(users.id, ctx.session.user.id));

      return user;
    }),
});
