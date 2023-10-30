"use client";

import TabWrapper from "../tab/tab-wrapper";
import { Skeleton } from "../ui/skeleton";

const SkeletonTabFonts = () => {
  return (
    <TabWrapper title="Buttons">
      <div className=" mt-2 rounded-[24px] bg-white p-6">
        <div className="">
          <Skeleton className=" h-6 w-24" />
          <Skeleton className=" mt-2 h-12" />
        </div>
        <div className=" mt-8">
          <Skeleton className=" h-6 w-24" />
          <Skeleton className=" mt-2 h-12 w-64" />
        </div>
      </div>
    </TabWrapper>
  );
};

export default SkeletonTabFonts;
