"use client";

import React from "react";
import { BUTTON_TYPE, ButtonType } from "~/types/theme";
import { cn } from "~/lib/utils";

interface ButtonThemeProps {
  active?: boolean;
  onClick?: () => void;
  type: ButtonType;
}

export default function ButtonTheme({
  active = false,
  onClick,
  type,
}: ButtonThemeProps) {
  let buttonStyle;

  switch (type) {
    case "FILL":
      buttonStyle = "bg-black";
      break;
    case "FILLROUNDED":
      buttonStyle = "bg-black rounded-lg";
      break;
    case "FILLCIRCULAR":
      buttonStyle = "bg-black rounded-full";
      break;
    case "OUTLINE":
      buttonStyle = "border-[1.5px] border-black";
      break;
    case "OUTLINEROUNDED":
      buttonStyle = "border-[1.5px] border-black rounded-lg";
      break;
    case "OUTLINECIRCULAR":
      buttonStyle = "border-[1.5px] border-black rounded-full";
      break;
    case "SOFTSHADOW":
      buttonStyle = "shadow-lg";
      break;
    case "SOFTSHADOWROUNDED":
      buttonStyle = "rounded-lg shadow-lg";
      break;
    case "SOFTSHADOWCIRCULAR":
      buttonStyle = "shadow-lg rounded-full";
      break;
    case "HARDSHADOW":
      buttonStyle =
        "w-[calc(100%-4px)] h-10 border border-black shadow-[4px_4px_0_0_#000]";
      break;
    case "HARDSHADOWROUNDED":
      buttonStyle =
        "w-[calc(100%-4px)] h-10 rounded-lg border border-black shadow-[4px_4px_0_0_#000]";
      break;
    case "HARDSHADOWCIRCULAR":
      buttonStyle =
        "w-[calc(100%-4px)] h-10  rounded-full border border-black shadow-[4px_4px_0_0_#000]";
      break;
    default:
      buttonStyle = "bg-black";
      break;
  }
  return (
    <div
      className={cn(" h-10 flex-1", {
        " rounded ring-2 ring-violet-300 ring-offset-[6px]": active,
      })}
    >
      <button className={cn(" h-full w-full", buttonStyle)} onClick={onClick} />
    </div>
  );
}
