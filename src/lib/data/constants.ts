import {
  Blend2,
  BrushBig,
  Chart,
  ChartSquare,
  Link,
  Link21,
  Setting,
  Setting2,
} from "iconsax-react";
import {
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLink,
  HiOutlinePuzzle,
} from "react-icons/hi";

export const TABS = [
  {
    label: "Profile",
    value: "profile",
  },
  {
    label: "Themes & Backgrounds",
    value: "themes",
  },
  {
    label: "Icons & Buttons",
    value: "buttons",
  },
  {
    label: "Fonts",
    value: "fonts",
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
    icon: ChartSquare,
  },

  {
    label: "Settings",
    href: "/admin/settings",
    icon: Setting2,
  },
];
