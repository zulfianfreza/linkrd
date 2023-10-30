"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonCardSeo() {
  return (
    <div className=" mt-2 w-full rounded-3xl bg-white p-6">
      <Skeleton className=" h-6 w-36" />
      <Skeleton className=" mt-1 h-5 w-4/5" />
      <div className=" mt-4 space-y-4">
        <Skeleton className=" h-12 w-full" />
        <Skeleton className=" h-12 w-full" />
      </div>
    </div>
  );
}
