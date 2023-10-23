"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import Image from "next/image";

interface TabProfileProps {
  isLoading?: boolean;
}

export default function TabProfile({ isLoading }: TabProfileProps) {
  const session = useSession();
  return (
    <div className=" mt-4">
      <h1 className=" text-lg font-semibold text-neutral-800">Profile</h1>
      {!isLoading ? (
        <div className=" mt-2 overflow-hidden rounded-[24px] bg-white p-6 shadow-sm">
          <div className="flex gap-4">
            <div className=" relative aspect-square h-24 overflow-hidden rounded-full bg-neutral-100">
              <Image
                src={session.data?.user.image ?? ""}
                fill
                alt="profile"
                className=" object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Button className=" h-12 w-full rounded-full">
                Choose an Image
              </Button>
              <Button className=" h-12 w-full rounded-full" variant="outline">
                Remove
              </Button>
            </div>
          </div>

          <div className=" mt-4 flex flex-col gap-2">
            <div className=" relative w-full">
              <Input
                label="Profile Title"
                value={session.data?.user.name ?? ""}
              />
            </div>
            <div className=" relative w-full">
              <textarea
                id="url"
                // value={url}
                rows={4}
                // onChange={(e) => setUrl(e.target.value)}
                className=" peer w-full rounded-lg bg-neutral-100 p-2 pl-4 pt-5 hover:ring-2 hover:ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <label
                htmlFor="url"
                className=" pointer-events-none absolute left-4 top-[13px] origin-[0] transform truncate text-sm text-neutral-500 duration-150 peer-focus:-translate-y-2.5 peer-focus:scale-75"
              >
                Bio
              </label>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
