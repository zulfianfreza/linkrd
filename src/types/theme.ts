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

export type SOCIAL_ICON_POSITION_TYPE = "top" | "bottom";

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

export enum THEME_TYPE {
  CUSTOM = "custom",
  BALSAMIQ = "balsamiq",
  AIR_WHITE = "air_white",
  AIR_LEAF = "air_leaf",
  AIR_SNOW = "air_snow",
  AIR_MOON = "air_moon",
  AIR_GREY = "air_grey",
  AIR_SMOKE = "air_smoke",
  AIR_BLACK = "air_black",
}

export enum BACKGROUND_TYPE {
  SOLID = "solid",
  GRADIENT = "gradient",
  CUBE = "cube",
  COLORFUL = "colorful",
  POLKA = "polka",
  HEXAGON = "hexagon",
  MOON = "moon",
  SPRINKLE = "sprinkle",
  CLOUDY = "cloudy",
  IMAGE = "image",
  COLORED_PATTERNS = "colored_patterns",
  COLORED_SHAPES = "colored_shapes",
  CONTOUR_LINE = "contour_line",
}
