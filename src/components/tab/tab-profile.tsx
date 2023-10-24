"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { useToast } from "~/hooks/use-toast";
import { Site } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { cn } from "~/lib/utils";

interface TabProfileProps {
  site: Site | undefined;
  refetch: () => void;
}

export default function TabProfile({ site, refetch }: TabProfileProps) {
  const [profileTitle, setProfileTitle] = useState(site?.profileTitle ?? "");
  const [bio, setBio] = useState(site?.bio ?? "");

  const session = useSession();
  const previewLoading = usePreviewLoading();
  const { toast } = useToast();

  const updateSiteMutation = api.site.updateSite.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: async () => {
      // await hotReloadIframe();
    },
    onError: (error) => {
      toast({ title: JSON.stringify(error.message) });
    },
    onSettled: () => {
      previewLoading.setIsLoading(false);
    },
  });

  const handleUpdateSite = () => {
    updateSiteMutation.mutate({ profileTitle, bio });
  };

  const onBlur = () => {
    handleUpdateSite();
  };
  return (
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
          <Button className=" h-12 w-full rounded-full">Choose an Image</Button>
          <Button className=" h-12 w-full rounded-full" variant="outline">
            Remove
          </Button>
        </div>
      </div>

      <div className=" mt-4 flex flex-col gap-2">
        <div className=" relative w-full">
          <Input
            label="Profile Title"
            value={profileTitle}
            onBlur={onBlur}
            onChange={(e) => setProfileTitle(e.target.value)}
          />
        </div>
        <div className=" relative w-full">
          <textarea
            value={bio}
            onBlur={onBlur}
            onChange={(e) => setBio(e.target.value)}
            placeholder=" "
            className={cn(
              "peer h-24 w-full rounded-lg bg-gray-100 p-2 pl-4 pt-6 text-sm outline-none transition hover:ring-2 hover:ring-gray-200 focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-70",
            )}
          />
          <label
            className={cn(
              "absolute left-4 top-4 z-10 origin-[0] -translate-y-2.5 scale-[0.75] transform truncate text-sm text-gray-500 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-[0.75]",
            )}
          >
            Bio
          </label>
        </div>
      </div>
    </div>
  );
}

export const TabProfileLoading = () => {
  return (
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
  );
};
