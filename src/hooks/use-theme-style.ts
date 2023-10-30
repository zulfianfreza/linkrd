import { FONT_LIST, balsamiqSans, inter } from "~/lib/data/font";
import { Theme } from "~/server/db/schema";
import { BACKGROUND_TYPE, THEME_TYPE } from "~/types/theme";

export const useThemeStyle = (theme: Theme | undefined) => {
  const fontFamily = theme?.fontFamily ?? "Monserrat";
  const fontColor = theme?.fontColor ?? "#000000";
  const themeType = (theme?.themeType ?? THEME_TYPE.CUSTOM) as THEME_TYPE;
  const backgroundType = (theme?.backgroundType ??
    BACKGROUND_TYPE.SOLID) as BACKGROUND_TYPE;
  const backgroundPrimary = theme?.backgroundPrimary ?? "#fff";
  const backgroundSecondary = theme?.backgroundSecondary ?? "#fff";
  const backgroundImage = theme?.backgroundImage ?? "";

  const selectedFont = FONT_LIST.find((font) => font.label == fontFamily)?.value
    .className;

  let themeStyle = {} as React.CSSProperties;
  let nameStyle = {} as React.CSSProperties;
  let dividerColor = {} as React.CSSProperties;

  themeStyle = {
    ...themeStyle,
    color: fontColor,
    backgroundColor: backgroundPrimary,
    borderColor: fontColor,
  };
  dividerColor = {
    ...dividerColor,
    borderColor: fontColor,
  };
  let themeClass;

  if (themeType == THEME_TYPE.CUSTOM) {
    themeClass = `${selectedFont}`;

    if (backgroundType == BACKGROUND_TYPE.CUBE) {
      themeClass = ` ${selectedFont} bg-cube`;
    } else if (backgroundType == BACKGROUND_TYPE.MOON) {
      themeClass = ` ${selectedFont} bg-moon`;
    } else if (backgroundType == BACKGROUND_TYPE.COLORED_PATTERNS) {
      themeClass = ` ${selectedFont} bg-colored-patterns`;
    } else if (backgroundType == BACKGROUND_TYPE.SPRINKLE) {
      themeClass = ` ${selectedFont} bg-sprinkle`;
    } else if (backgroundType == BACKGROUND_TYPE.COLORED_SHAPES) {
      themeClass = ` ${selectedFont} bg-colored-shapes`;
    } else if (backgroundType == BACKGROUND_TYPE.HEXAGON) {
      themeClass = ` ${selectedFont} bg-hexagon`;
    } else if (backgroundType == BACKGROUND_TYPE.CLOUDY) {
      themeClass = ` ${selectedFont} bg-cloudy`;
    } else if (backgroundType == BACKGROUND_TYPE.CONTOUR_LINE) {
      themeClass = ` ${selectedFont} bg-contour-line`;
    } else if (backgroundType == BACKGROUND_TYPE.GRADIENT) {
      themeStyle = {
        ...themeStyle,
        backgroundImage: `linear-gradient(to top right, ${backgroundPrimary}, ${backgroundSecondary})`,
      };
    } else if (backgroundType == BACKGROUND_TYPE.IMAGE) {
      themeClass = `${selectedFont}`;
      themeStyle = {
        ...themeStyle,
        backgroundImage: `url("${backgroundImage}")`,
        backgroundColor: "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
  } else {
    themeStyle = {
      ...themeStyle,
      backgroundColor: "#ffffff",
      color: "#000",
    };
    nameStyle = {
      ...nameStyle,
      color: "#000",
    };
    dividerColor = {
      ...dividerColor,
      borderColor: "black",
    };
    themeClass = `${inter.className}`;
    if (themeType == THEME_TYPE.BALSAMIQ) {
      themeStyle = {
        ...themeStyle,
        backgroundColor: "#ffffff",
      };
      themeClass = `${balsamiqSans.className}`;
    } else if (themeType == THEME_TYPE.AIR_WHITE) {
      themeStyle = {
        ...themeStyle,
        color: "rgba(0, 0, 0, .6)",
      };
      dividerColor = {
        ...dividerColor,
        borderColor: "rgba(0, 0, 0, .6)",
      };
    } else if (
      [THEME_TYPE.AIR_LEAF, THEME_TYPE.AIR_MOON, THEME_TYPE.AIR_SNOW].includes(
        themeType,
      )
    ) {
      themeStyle = {
        ...themeStyle,
        color: "rgba(0, 0, 0, .8)",
      };
      dividerColor = {
        ...dividerColor,
        borderColor: "rgba(0, 0, 0, .8)",
      };
    } else if (themeType == THEME_TYPE.AIR_GREY) {
      themeStyle = {
        ...themeStyle,
        backgroundColor: "#eceef1",
        color: "rgba(0, 0, 0, .6)",
      };
      dividerColor = {
        ...dividerColor,
        borderColor: "rgba(0, 0, 0, .6)",
      };
    } else if (themeType == THEME_TYPE.AIR_SMOKE) {
      themeStyle = {
        ...themeStyle,
        backgroundColor: "#2b3235",
        color: "white",
      };
      dividerColor = {
        ...dividerColor,
        borderColor: "white",
      };
      nameStyle = {
        ...nameStyle,
        color: "#fff",
      };
    } else if (themeType == THEME_TYPE.AIR_BLACK) {
      themeStyle = {
        ...themeStyle,
        backgroundColor: "#000",
        color: "rgba(255, 255, 255, .6)",
      };
      nameStyle = {
        ...nameStyle,
        color: "#fff",
      };
      dividerColor = {
        ...dividerColor,
        borderColor: "rgba(255, 255, 255, .6)",
      };
    }
  }

  return { themeClass, themeStyle, nameStyle, dividerColor };
};
