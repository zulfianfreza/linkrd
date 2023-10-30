import type { AdapterAccount } from "@auth/core/adapters";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  username: text("username"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const links = pgTable("link", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  label: text("label"),
  url: text("url"),
  active: boolean("active").default(false),
  index: integer("index"),
  clickCount: integer("click_count").default(0),
  extra: text("extra"),
});

export const sites = pgTable("site", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  profileTitle: text("profile_title"),
  bio: text("bio"),
  profileImage: text("profile_image"),
  viewCount: integer("view_count").default(0),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
});

export const themes = pgTable("theme", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  themeType: text("theme_type"),
  backgroundType: text("background_type"),
  backgroundPrimary: text("background_primary"),
  backgroundSecondary: text("background_secondary"),
  backgroundImage: text("background_image"),
  fontFamily: text("font_family"),
  fontColor: text("font_color"),
  buttonType: text("button_type"),
  buttonColor: text("button_color"),
  buttonFontColor: text("button_font_color"),
  shadowColor: text("shadow_color"),
  socialIconPosition: text("social_icon_position"),
  hideLogo: boolean("hide_logo"),
});

export const socialIcon = pgTable("social_icon", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  iconId: integer("icon_id"),
  url: text("url"),
  active: boolean("active"),
});

export type SocialIcon = InferSelectModel<typeof socialIcon>;
export type Link = InferSelectModel<typeof links>;
export type Site = InferSelectModel<typeof sites>;
export type NewLink = InferInsertModel<typeof links>;
export type User = InferSelectModel<typeof users>;
export type Theme = InferSelectModel<typeof themes>;
