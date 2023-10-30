"use client";

import { Link21 } from "iconsax-react";
import Link from "next/link";
import React from "react";
import { monserrat } from "~/lib/data/font";
import { cn } from "~/lib/utils";

interface LogoProps {
  className?: string;
  path?: string;
  target?: React.HTMLAttributeAnchorTarget | undefined;
}

export default function Logo({ className, path, target }: LogoProps) {
  return (
    <Link
      href={path ?? "/"}
      className={cn(
        "flex items-center gap-2 font-medium tracking-tighter text-neutral-800",
        className,
        monserrat.className,
      )}
      target={target}
    >
      {/* <div className=" relative aspect-square h-8 overflow-hidden rounded-full bg-gradient-to-r from-violet-700 to-pink-500">
        <div className=" absolute left-3 top-1 aspect-square h-10 rounded-full border-[1.5px] border-white"></div>
        <div className=" absolute bottom-1 left-3 aspect-square h-10 rounded-full border-[1.5px] border-white"></div>
      </div> */}
      <div className=" flex aspect-square h-8 items-center justify-center rounded-full bg-neutral-800">
        <Link21 className=" rotate-90 text-white" />
      </div>
      Catalink
    </Link>
  );
}
