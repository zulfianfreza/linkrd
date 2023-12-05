"use client";

import { Nunito } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { monserrat } from "~/lib/data/font";
import { cn } from "~/lib/utils";

interface LogoProps {
  className?: string;
  path?: string;
  target?: React.HTMLAttributeAnchorTarget | undefined;
}

const font = Nunito({ subsets: ["latin"] });

export default function Logo({ className, path, target }: LogoProps) {
  return (
    <Link
      href={path ?? "/"}
      className={cn(
        "flex items-center gap-1 font-medium tracking-tighter text-neutral-800",
        className,
        font.className,
      )}
      target={target}
    >
      {/* <div className=" flex">
        <div className=" h-6 w-3 rounded-bl-full rounded-tr-full border-2 border-violet-700"></div>
        <div className=" -ml-[2px] mt-[22px] h-2 w-4 rounded-bl-full rounded-tr-full border-2 border-violet-700"></div>
      </div> */}
      <div className=" relative aspect-square w-6">
        <Image
          src="/images/logo-linkstation.png"
          fill
          alt="logo"
          className=" object-contain"
        />
      </div>
      <span className=" text-lg font-medium text-neutral-800">
        Linkrd<span className=" font-medium text-neutral-800"></span>
      </span>

      {/* <div className="grid w-6 grid-cols-3">
        <div className="" />
        <div className=" aspect-square w-full rounded-tr-full bg-blue-600" />
        <div className="" />
        <div className="" />
        <div className=" aspect-square w-full  bg-indigo-600" />
        <div className="" />
        <div className="" />
        <div className=" aspect-square w-full rounded-bl-full bg-violet-600" />
        <div className=" aspect-square w-full rounded-tr-full bg-purple-600" />
      </div> */}
    </Link>
  );
}
