"use client";

import TabWrapper from "../tab/tab-wrapper";
import { Skeleton } from "../ui/skeleton";

const SkeletonTabButtons = () => {
  return (
    <TabWrapper title="Buttons">
      <div className=" mt-2 overflow-hidden rounded-[24px] bg-white p-6 shadow-sm">
        {[1, 1, 1, 1].map((_, index) => (
          <div className=" mt-8 first:mt-0" key={index}>
            <Skeleton className=" h-6 w-48" />
            <div className="mt-2 grid grid-cols-3 gap-8">
              <Skeleton className=" h-10" />
              <Skeleton className=" h-10" />
              <Skeleton className=" h-10" />
            </div>
          </div>
        ))}

        <div className=" mt-8">
          <Skeleton className=" h-6 w-24" />
          <Skeleton className=" mt-2 h-12 w-64" />
        </div>
      </div>
    </TabWrapper>
  );
};

export default SkeletonTabButtons;
