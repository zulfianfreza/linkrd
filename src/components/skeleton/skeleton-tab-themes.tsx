"use client";

import TabWrapper from "../tab/tab-wrapper";
import { Skeleton } from "../ui/skeleton";

const SkeletonTabThemes = () => {
  return (
    <TabWrapper title="Themes">
      <div className=" mt-2 rounded-[24px] bg-white p-6">
        <div className="grid grid-cols-3 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton className=" aspect-[10/16] w-full rounded-lg" />
              <Skeleton className=" h-6 w-16" />
            </div>
          ))}
        </div>
      </div>
    </TabWrapper>
  );
};

export default SkeletonTabThemes;
