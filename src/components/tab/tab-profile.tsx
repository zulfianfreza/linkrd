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

interface TabProfileProps {
  site: Site | undefined;
  refetch: () => void;
}

export default function TabProfile({ site, refetch }: TabProfileProps) {
  const [profileTitle, setProfileTitle] = useState(site?.profileTitle ?? "");

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
    updateSiteMutation.mutate({ profileTitle: profileTitle });
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
