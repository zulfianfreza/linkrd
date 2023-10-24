import { FONT_LIST } from "~/lib/data/font";
import { Theme } from "~/server/db/schema";

export const useThemeStyle = (theme: Theme | undefined) => {
  const fontFamily = theme?.fontFamily ?? "Monserrat";
  const fontColor = theme?.fontColor ?? "#000000";

  const selectedFont = FONT_LIST.find((font) => font.label == fontFamily)?.value
    .className;

  let themeStyle = {} as React.CSSProperties;

  themeStyle = {
    ...themeStyle,
    color: fontColor,
  };
  const themeClass = `${selectedFont}`;

  return { themeClass, themeStyle };
};
