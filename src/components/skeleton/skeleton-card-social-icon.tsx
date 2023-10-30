"use client";

import { Skeleton } from "../ui/skeleton";

export const SkeletonCardSocialIcon = () => {
  return (
    <div className=" mt-2 rounded-3xl bg-white p-6">
      <div className=" flex items-center justify-between">
        <div className="">
          <Skeleton className=" h-6 w-20" />
          <Skeleton className=" mt-1 h-4 w-60" />
        </div>
        <Skeleton className=" h-12 w-24 rounded-full" />
      </div>

      <div className=" mt-4 space-y-2">
        <Skeleton className=" h-12 w-full" />
        <Skeleton className=" h-12 w-full" />
      </div>

      <div className=" mt-4">
        <Skeleton className=" h-6  w-20" />
        <Skeleton className=" mt-1 h-4  w-40" />
      </div>

      <div className=" mt-4">
        <Skeleton className=" h-6 w-20" />
        <Skeleton className=" mt-2 h-6 w-20" />
      </div>
    </div>
  );
};

export default SkeletonCardSocialIcon;
