"use client";

import Container from "~/components/container";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export default function AnalyticsPage() {
  const { data, isLoading } = api.site.getAnalytics.useQuery();
  return (
    <Container>
      {isLoading ? (
        <div className=" w-full rounded-3xl bg-white p-6 py-10">
          <div className="flex justify-center">
            <Skeleton className=" h-6 w-40" />
          </div>
          <div className=" mt-4 flex justify-between">
            <div className="flex flex-1 flex-col items-center gap-2">
              <Skeleton className=" h-4 w-16" />
              <Skeleton className=" h-6 w-10" />
            </div>
            <div className="flex flex-1 flex-col items-center gap-2">
              <Skeleton className=" h-4 w-16" />
              <Skeleton className=" h-6 w-10" />
            </div>
            <div className="flex flex-1 flex-col items-center gap-2">
              <Skeleton className=" h-4 w-16" />
              <Skeleton className=" h-6 w-10" />
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full rounded-[24px] bg-white p-6 py-10">
          <div className=" text-center">
            <h1 className=" text-lg font-medium">
              Lifetime Analytics <br />
            </h1>
          </div>
          <div className=" mt-4 flex justify-between">
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="flex items-center gap-x-1">
                <div className=" h-2 w-2 rounded-full bg-green-500"></div>
                <p className=" text-xs">Views:</p>
              </div>
              <h1 className=" text-lg">{data?.views}</h1>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="flex items-center gap-x-1">
                <div className=" h-2 w-2 rounded-full bg-violet-500"></div>
                <p className=" text-xs">Click:</p>
              </div>
              <h1 className=" text-lg">{data?.click}</h1>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="flex items-center gap-x-1">
                <div className=" h-2 w-2 rounded-full bg-sky-500"></div>
                <p className=" text-xs">CTR:</p>
              </div>
              <h1 className=" text-lg">{data?.ctr.toFixed(2)}%</h1>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
