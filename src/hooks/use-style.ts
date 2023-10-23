import type { IExtraDivider, IExtraTextAlign } from "~/types/link";

export const dividerStyle = (extra: IExtraDivider) => {
  let style = {
    borderStyle: "solid",
  } as React.CSSProperties;

  if (extra.divider_type == "DASHED") {
    style = {
      ...style,
      borderStyle: "dashed",
    };
  } else if (extra.divider_type == "DOTTED") {
    style = {
      ...style,
      borderStyle: "dotted",
    };
  } else if (extra.divider_type == "BLANK") {
    style = {
      ...style,
      borderStyle: "none",
    };
  }

  return style;
};

export const headerTextAlign = (extra: IExtraTextAlign) => {
  const textAlign = extra.text_align;

  return textAlign == "RIGHT"
    ? "text-right"
    : textAlign == "CENTER"
    ? "text-center"
    : "text-left";
};
