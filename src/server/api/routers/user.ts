import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { IUser } from "~/types/user";
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.email, ctx.session.user.email ?? ""),
    });

    return user;
  }),
});
