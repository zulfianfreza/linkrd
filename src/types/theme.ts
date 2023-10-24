export enum BUTTON_TYPE {
  FILL = "fill",
  FILLROUNDED = "fillrounded",
  FILLCIRCULAR = "fillcircular",
  OUTLINE = "outline",
  OUTLINEROUNDED = "outlinerounded",
  OUTLINECIRCULAR = "outlinecircular",
  SOFTSHADOW = "softshadow",
  SOFTSHADOWROUNDED = "softshadowrounded",
  SOFTSHADOWCIRCULAR = "softshadowcircular",
  HARDSHADOW = "hardshadow",
  HARDSHADOWROUNDED = "hardshadowrounded",
  HARDSHADOWCIRCULAR = "hardshadowcircular",
}

export const BUTTON_TYPE_LIST = [
  {
    type: "Fill",
    buttonList: [
      BUTTON_TYPE.FILL,
      BUTTON_TYPE.FILLROUNDED,
      BUTTON_TYPE.FILLCIRCULAR,
    ],
  },
  {
    type: "Outline",
    buttonList: [
      BUTTON_TYPE.OUTLINE,
      BUTTON_TYPE.OUTLINEROUNDED,
      BUTTON_TYPE.OUTLINECIRCULAR,
    ],
  },
  {
    type: "Soft Shadow",
    buttonList: [
      BUTTON_TYPE.SOFTSHADOW,
      BUTTON_TYPE.SOFTSHADOWROUNDED,
      BUTTON_TYPE.SOFTSHADOWCIRCULAR,
    ],
  },
  {
    type: "Hard Shadow",
    buttonList: [
      BUTTON_TYPE.HARDSHADOW,
      BUTTON_TYPE.HARDSHADOWROUNDED,
      BUTTON_TYPE.HARDSHADOWCIRCULAR,
    ],
  },
];
