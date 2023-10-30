import {
  BrushBig,
  Chart,
  Chart1,
  ChartSquare,
  Link,
  Setting2,
} from "iconsax-react";

export const TABS = [
  {
    label: "Profile",
    value: "profile",
  },
  {
    label: "Themes",
    value: "themes",
  },
  {
    label: "Custom Theme",
    value: "custom",
  },
];

export type TABS_TYPE = "PROFILE" | "THEMES" | "CUSTOM";
export interface ITabs {
  label: string;
  value: TABS_TYPE;
}

export const TABS_LIST: ITabs[] = [
  {
    label: "Profile",
    value: "PROFILE",
  },
  {
    label: "Themes",
    value: "THEMES",
  },
  {
    label: "Custom Theme",
    value: "CUSTOM",
  },
];

export const MENU = [
  {
    label: "Links",
    href: "/admin",
    icon: Link,
  },
  {
    label: "Appearance",
    href: "/admin/appearance",
    icon: BrushBig,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: Chart1,
  },

  {
    label: "Settings",
    href: "/admin/settings",
    icon: Setting2,
  },
];
