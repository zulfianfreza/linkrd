"use client";

import TabWrapper from "../tab/tab-wrapper";
import { Skeleton } from "../ui/skeleton";

const SkeletonTabProfile = () => {
  return (
    <TabWrapper title="Profile">
      <div className=" mt-2 overflow-hidden rounded-[24px] bg-white p-6 shadow-sm">
        <div className="flex gap-4">
          <Skeleton className=" aspect-square h-24 w-24 rounded-full" />

          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className=" h-12 w-full rounded-full" />
            <Skeleton className=" h-12 w-full rounded-full" />
          </div>
        </div>

        <div className=" mt-4 flex flex-col gap-2">
          <Skeleton className=" h-12 w-full rounded-lg" />
          <Skeleton className=" h-[124px] w-full rounded-lg" />
        </div>
      </div>
    </TabWrapper>
  );
};

export default SkeletonTabProfile;
