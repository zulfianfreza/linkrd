"use client";

import { cn } from "~/lib/utils";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string | null | undefined;
  className?: string;
}

export default function Avatar({ src, className }: AvatarProps) {
  return src ? (
    <div
      className={cn(
        " relative h-10 w-10 overflow-hidden rounded-full",
        className,
      )}
    >
      <Image
        src={src ?? ""}
        alt="Avatar"
        fill={true}
        className=" object-cover object-center"
      />
    </div>
  ) : (
    <div
      className={cn(
        " flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
        className,
      )}
    >
      <p>@</p>
    </div>
  );
}
