import { Theme } from "~/server/db/schema";
import { BUTTON_TYPE, THEME_TYPE } from "~/types/theme";

export const getButtonStyle = (theme: Theme) => {
  const buttonType = theme.buttonType ?? BUTTON_TYPE.OUTLINEROUNDED;
  const shadowColor = theme?.shadowColor ?? "#000000";
  const buttonColor = theme.buttonColor ?? "#000000";
  const buttonFontColor = theme.buttonFontColor ?? "#000";
  const themeType = (theme?.themeType ?? THEME_TYPE.CUSTOM) as THEME_TYPE;

  let buttonStyle = {
    backgroundColor: theme?.buttonColor ?? "#ffffff",
    color: theme?.buttonFontColor ?? "#000000",
    boxShadow: "",
    border: "",
    borderRadius: "0px",
  } as React.CSSProperties;

  if (themeType == THEME_TYPE.CUSTOM) {
    switch (buttonType) {
      case BUTTON_TYPE.FILLROUNDED:
        buttonStyle.borderRadius = "12px";
        break;
      case BUTTON_TYPE.FILLCIRCULAR:
        buttonStyle.borderRadius = "999px";
        break;
      case BUTTON_TYPE.OUTLINE:
        buttonStyle.backgroundColor = "transparent";
        buttonStyle.border = `1.5px solid ${buttonColor}`;
        buttonStyle.color = `${buttonFontColor}`;
        break;
      case BUTTON_TYPE.OUTLINEROUNDED:
        buttonStyle.backgroundColor = "transparent";
        buttonStyle.color = `${buttonFontColor}`;
        buttonStyle.border = `1.5px solid ${buttonColor}`;
        buttonStyle.borderRadius = "12px";
        break;
      case BUTTON_TYPE.OUTLINECIRCULAR:
        buttonStyle.backgroundColor = "transparent";
        buttonStyle.color = `${buttonFontColor}`;
        buttonStyle.border = `1.5px solid ${buttonColor}`;
        buttonStyle.borderRadius = "9999px";
        break;
      case BUTTON_TYPE.SOFTSHADOW:
        buttonStyle.boxShadow = "0px 10px 15px -3px rgba(0, 0, 0, 0.3)";
        break;
      case BUTTON_TYPE.SOFTSHADOWROUNDED:
        buttonStyle.boxShadow = "0px 10px 15px -3px rgba(0, 0, 0, 0.3)";
        buttonStyle.borderRadius = "12px";
        break;
      case BUTTON_TYPE.SOFTSHADOWCIRCULAR:
        buttonStyle.boxShadow = "0px 10px 15px -3px rgba(0, 0, 0, 0.3)";
        buttonStyle.borderRadius = "9999px";
        break;
      case BUTTON_TYPE.HARDSHADOW:
        buttonStyle.boxShadow = `6px 6px 0 0 ${shadowColor}`;
        buttonStyle.border = `1.5px solid ${shadowColor}`;
        buttonStyle.borderRadius = "0";
        break;
      case BUTTON_TYPE.HARDSHADOWROUNDED:
        buttonStyle.boxShadow = `6px 6px 0 0 ${shadowColor}`;
        buttonStyle.border = `1.5px solid ${shadowColor}`;
        buttonStyle.borderRadius = "12px";

        break;
      case BUTTON_TYPE.HARDSHADOWCIRCULAR:
        buttonStyle.boxShadow = `6px 6px 0 0 ${shadowColor}`;
        buttonStyle.border = `1.5px solid ${shadowColor}`;
        buttonStyle.borderRadius = "9999px";
        break;
    }
  } else {
    buttonStyle = {
      ...buttonStyle,
      borderRadius: "12px",
      color: "#fff",
      backgroundColor: "#000",
    };

    if (themeType == THEME_TYPE.BALSAMIQ) {
      buttonStyle = {
        ...buttonStyle,
        borderRadius: "0px",
        color: "#000",
        backgroundColor: "#fff",
        border: "1.5px solid #000",
        boxShadow: "6px 6px 0 0 #000",
      };
    } else if (themeType == THEME_TYPE.AIR_WHITE) {
      buttonStyle = {
        ...buttonStyle,
        color: "rgba(0,0,0,.6)",
        backgroundColor: "#eceef1",
      };
    } else if (themeType == THEME_TYPE.AIR_LEAF) {
      buttonStyle = {
        ...buttonStyle,
        color: "rgba(0,0,0,.8)",
        backgroundColor: "#44e660",
      };
    } else if (themeType == THEME_TYPE.AIR_MOON) {
      buttonStyle = {
        ...buttonStyle,
        color: "white",
        backgroundColor: "#2665d6",
      };
    } else if (themeType == THEME_TYPE.AIR_SNOW) {
      buttonStyle = {
        ...buttonStyle,
        color: "white",
        backgroundColor: "#2b3235",
      };
    } else if (themeType == THEME_TYPE.AIR_GREY) {
      buttonStyle = {
        ...buttonStyle,
        color: "#000",
        backgroundColor: "#fff",
      };
    } else if (themeType == THEME_TYPE.AIR_SMOKE) {
      buttonStyle = {
        ...buttonStyle,
        color: "rgba(0,0,0,0.6)",
        backgroundColor: "#fff",
      };
    } else if (themeType == THEME_TYPE.AIR_BLACK) {
      buttonStyle = {
        ...buttonStyle,
        color: "#fff",
        backgroundColor: "#222",
      };
    }
  }

  return buttonStyle;
};
