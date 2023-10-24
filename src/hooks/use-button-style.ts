import { Theme } from "~/server/db/schema";
import { BUTTON_TYPE } from "~/types/theme";

export const getButtonStyle = (theme: Theme) => {
  const buttonType = theme.buttonType ?? BUTTON_TYPE.OUTLINEROUNDED;
  const shadowColor = theme?.shadowColor ?? "#000000";
  const buttonColor = theme.buttonColor ?? "#000000";
  const buttonFontColor = theme.buttonColor ?? "#000000";

  const buttonStyle = {
    backgroundColor: theme?.buttonColor ?? "#ffffff",
    color: theme?.buttonFontColor ?? "#000000",
    boxShadow: "",
    border: "",
    borderRadius: "0px",
  } as React.CSSProperties;

  switch (buttonType) {
    case BUTTON_TYPE.FILLROUNDED:
      buttonStyle.borderRadius = "8px";
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
      buttonStyle.borderRadius = "8px";
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
      buttonStyle.borderRadius = "8px";
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
      buttonStyle.borderRadius = "8px";

      break;
    case BUTTON_TYPE.HARDSHADOWCIRCULAR:
      buttonStyle.boxShadow = `6px 6px 0 0 ${shadowColor}`;
      buttonStyle.border = `1.5px solid ${shadowColor}`;
      buttonStyle.borderRadius = "9999px";
      break;
  }

  return buttonStyle;
};
