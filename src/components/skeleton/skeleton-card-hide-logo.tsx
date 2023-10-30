"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonCardHideLogo() {
  return (
    <div className=" mt-8 w-full rounded-3xl bg-white p-6">
      <div className=" flex items-center justify-between">
        <Skeleton className=" h-6 w-32" />
        <Skeleton className=" h-5 w-10 rounded-full" />
      </div>
      <Skeleton className=" mt-4 h-8 w-36" />
    </div>
  );
}
