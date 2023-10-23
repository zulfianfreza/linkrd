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

export type ButtonType = keyof typeof BUTTON_TYPE;
