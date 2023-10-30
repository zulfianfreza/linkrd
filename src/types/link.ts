import type { Link } from "~/server/db/schema";

export type DIVIDER_TYPE = "SOLID" | "DASHED" | "DOTTED" | "BLANK";
export type TEXT_ALIGN_TYPE = "LEFT" | "CENTER" | "RIGHT";
export type THUMBNAIL_TYPE = "IMAGE" | "ICON";
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

export interface IExtraThumbnail {
  thumbnailType?: THUMBNAIL_TYPE;
  iconId?: number;
  imageUrl?: string;
}

export type IButtonLink = ILink & {
  extra: IExtraThumbnail;
};
