import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user.router";
import { linkRouter } from "./routers/link.router";
import { siteRouter } from "./routers/site.router";
import { themeRouter } from "./routers/theme.router";
import { socialIconRouter } from "./routers/social-icon.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  link: linkRouter,
  site: siteRouter,
  theme: themeRouter,
  socialIcon: socialIconRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
