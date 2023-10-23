"use client";

import Link from "next/link";
import React from "react";
import { cn } from "~/lib/utils";

interface LogoProps {
  className?: string;
  path?: string;
}

export default function Logo({ className, path }: LogoProps) {
  return (
    <Link href="/" className={cn("text-neutral-800")}>
      Catalink
    </Link>
  );
}
