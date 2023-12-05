"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { LuX } from "react-icons/lu";
import { SiX, SiYoutube } from "react-icons/si";
import { ArrowRight2 } from "iconsax-react";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import usePreviewLoading from "~/hooks/use-preview-loading";
import HeaderIcon from "../icon/header-icon";
import { isValidUrl } from "~/lib/utils";

interface CardAddLinkProps {
  hotReload: () => void;
}

export default function CardAddLink({ hotReload }: CardAddLinkProps) {
  const [displayCard, setDisplayCard] = useState<boolean>(false);
  const [url, setUrl] = useState("");

  const { toast } = useToast();
  const previewLoading = usePreviewLoading();

  const addLinkMutation = api.link.addLink.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: () => {
      // refetch();
      hotReload();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.data?.code,
        description: error.message,
      });
    },
    onSettled: () => {
      previewLoading.setIsLoading(false);
      toggleDisplayCard();
      setUrl("");
    },
  });

  const toggleDisplayCard = () => {
    setDisplayCard(!displayCard);
  };

  const handleAddButtonLink = () => {
    addLinkMutation.mutate({ label: "Title", type: "button", url: url });
  };

  const handleAddHeader = () => {
    addLinkMutation.mutate({
      label: "Title",
      type: "header",
      extra: JSON.stringify({ text_align: "LEFT" }),
    });
  };

  const handleAddYoutube = () => {
    addLinkMutation.mutate({ label: "YouTube", type: "youtube", url: "" });
  };

  const handleAddX = () => {
    addLinkMutation.mutate({ label: "X", type: "x", url: "" });
  };

  const handleAddTextLink = () => {
    addLinkMutation.mutate({ label: "Title", type: "text", url: "" });
  };

  const handleAddDivider = () => {
    addLinkMutation.mutate({
      type: "divider",
      extra: JSON.stringify({ divider_type: "SOLID" }),
    });
  };

  return (
    <>
      {displayCard ? (
        <div className=" relative w-full overflow-hidden rounded-3xl bg-white">
          <button
            onClick={toggleDisplayCard}
            className=" absolute right-2 top-2 rounded-full p-2.5 hover:bg-neutral-100"
          >
            <LuX size={20} />
          </button>
          <div className=" border-b p-6 pt-10">
            <h1 className=" text-xl font-semibold text-neutral-800">
              Enter URL
            </h1>
            <div className="mt-4 flex gap-4">
              <div className=" relative w-full">
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className=" peer h-12 w-full rounded-lg bg-neutral-100 p-2 pl-4 pt-5 hover:ring-2 hover:ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <label
                  htmlFor="url"
                  className=" pointer-events-none absolute left-4 top-[13px] origin-[0] transform truncate text-sm text-neutral-500 duration-150 peer-focus:-translate-y-2.5 peer-focus:scale-75"
                >
                  URL
                </label>
              </div>

              <Button
                className=" h-12 rounded-full px-8"
                onClick={handleAddButtonLink}
                disabled={!isValidUrl(url)}
              >
                ADD
              </Button>
            </div>
          </div>

          <div className=" p-6">
            <p className=" text-sm font-semibold text-neutral-500">
              Inspired by your interests
            </p>

            <div className="mt-4 overflow-x-scroll [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className=" flex gap-4">
                <button
                  className=" flex cursor-pointer flex-col items-center gap-y-2"
                  onClick={handleAddHeader}
                >
                  <div className=" flex h-[88px] w-[88px] items-center justify-center rounded-[24px] bg-neutral-100">
                    <HeaderIcon />
                  </div>
                  <p className=" text-xs font-medium text-neutral-800">
                    Header
                  </p>
                </button>
                <button
                  onClick={handleAddYoutube}
                  className=" flex flex-col items-center gap-y-2"
                >
                  <div className=" flex h-[88px] w-[88px] items-center justify-center rounded-[24px] bg-neutral-100">
                    <div className=" flex h-10  w-10 items-center justify-center rounded-lg border bg-white">
                      <SiYoutube className=" fill-red-500" size={24} />
                    </div>
                  </div>
                  <p className=" text-xs font-medium text-neutral-800">
                    YouTube
                  </p>
                </button>
                <button
                  onClick={handleAddX}
                  className=" flex flex-col items-center gap-y-2"
                >
                  <div className=" flex h-[88px] w-[88px] items-center justify-center rounded-[24px] bg-neutral-100">
                    <div className=" flex h-10  w-10 items-center justify-center rounded-lg bg-black">
                      <SiX className=" fill-white" size={20} />
                    </div>
                  </div>
                  <p className=" text-xs font-medium text-neutral-800">X</p>
                </button>
                <button
                  onClick={handleAddTextLink}
                  className=" flex flex-col items-center gap-y-2"
                >
                  <div className=" flex h-[88px] w-[88px] items-center justify-center rounded-[24px] bg-neutral-100">
                    <div className=" flex h-10  w-10 items-center justify-center rounded-lg border bg-white">
                      <p className=" text-xs underline">abc</p>
                    </div>
                  </div>
                  <p className=" text-xs font-medium text-neutral-800">
                    Text Link
                  </p>
                </button>

                <button
                  onClick={handleAddDivider}
                  className=" flex flex-col items-center gap-y-2"
                >
                  <div className=" flex h-[88px] w-[88px] items-center justify-center rounded-[24px] bg-neutral-100">
                    <div className=" flex h-10  w-10 items-center justify-center rounded-lg border bg-white">
                      <p className=" w-5 border-b-[1px] border-black"></p>
                    </div>
                  </div>
                  <p className=" text-xs font-medium text-neutral-800">
                    Divider
                  </p>
                </button>
              </div>
            </div>

            <div className=" mt-4">
              <button className=" flex h-12 items-center gap-1 rounded-full px-4 text-sm font-semibold text-violet-700 hover:bg-neutral-100">
                View all
                <ArrowRight2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          className=" h-12 w-full rounded-full"
          onClick={toggleDisplayCard}
        >
          Add Link
        </Button>
      )}
    </>
  );
}
