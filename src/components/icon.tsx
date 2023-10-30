"use client";

import React from "react";
import type { IconBaseProps, IconType } from "react-icons";

interface IconProps extends IconBaseProps {
  icon: IconType;
}

export default function Icon({ icon: Icon, ...props }: IconProps) {
  return <Icon {...props} />;
}
