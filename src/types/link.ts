import type { Link } from "~/server/db/schema";

export type DIVIDER_TYPE = "SOLID" | "DASHED" | "DOTTED" | "BLANK";
export type TEXT_ALIGN_TYPE = "LEFT" | "CENTER" | "RIGHT";
export interface IExtraDivider {
  divider_type?: DIVIDER_TYPE;
}
export interface IExtraTextAlign {
  text_align?: TEXT_ALIGN_TYPE;
}

export type ILink = Link;
export type ILinkDivider = ILink & {
  extra: IExtraDivider;
};
export type ILinkTextAlign = ILink & {
  extra: IExtraTextAlign;
};
