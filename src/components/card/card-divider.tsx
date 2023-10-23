"use client";

import { Trash } from "iconsax-react";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import GrabIcon from "~/components/icon/grab-icon";
import { Switch } from "~/components/ui/switch";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { useToast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { DIVIDER_TYPE, IExtraDivider, ILinkDivider } from "~/types/link";
import { Button } from "../ui/button";

interface CardDividerProps {
  link: ILinkDivider;
  refetch: () => void;
  hotReload: () => void;
}

type COLLAPSE_TYPE = "DELETE" | "THUMBNAIL";

export default function CardDivider({
  link,
  refetch,
  hotReload,
}: CardDividerProps) {
  const [active, setActive] = useState(link.active ?? true);
  const [showCollapse, setShowCollapse] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<COLLAPSE_TYPE | null>(null);
  const [extra, setExtra] = useState<IExtraDivider>({
    divider_type: link.extra?.divider_type ?? "SOLID",
  });

  const previewLoading = usePreviewLoading();
  const { toast } = useToast();

  const updateLinkMutation = api.link.updateLink.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: () => {
      previewLoading.setIsLoading(false);
      hotReload();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.data?.code,
        description: error.message,
      });
      previewLoading.setIsLoading(false);
    },
  });

  const deleteLinkMutation = api.link.deleteLink.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: () => {
      previewLoading.setIsLoading(false);
      hotReload();
    },
  });

  const handleUpdateLink = ({
    active,
    extra,
  }: {
    active?: boolean;
    extra?: string;
  }) => {
    updateLinkMutation.mutate({
      linkId: link.id,
      active,
      extra,
    });
  };

  const handleUpdateActive = () => {
    updateLinkMutation.mutate({
      linkId: link.id,
      active: !active,
    });
    setActive(!active);
  };

  const handleDeleteLink = () => {
    deleteLinkMutation.mutate({ linkId: link.id });
  };

  const handleCollapse = (collapseType: COLLAPSE_TYPE) => {
    if (collapse == collapseType) {
      setTimeout(() => {
        setCollapse(null);
      }, 300);
    }
    setCollapse(collapseType);
    setShowCollapse(collapse == collapseType ? !showCollapse : true);
  };

  const handleUpdateDividerType = (type: DIVIDER_TYPE) => {
    setExtra({ ...extra, divider_type: type });
    const extraData = JSON.stringify({
      divider_type: type,
    });
    handleUpdateLink({ extra: extraData });
  };

  return (
    <div className=" w-full overflow-hidden rounded-[24px] bg-white shadow-sm">
      <div className="flex">
        {/* LEFT */}
        <div className="flex cursor-grab items-center p-4">
          <GrabIcon />
        </div>

        {/* RIGHT */}
        <div className="flex-1 pl-6">
          <div className=" flex items-center">
            <div className=" flex flex-1 flex-col gap-1 overflow-hidden pr-10 pt-6">
              <div className="flex flex-wrap gap-4">
                {/* <div className=" relative"> */}
                <button
                  onClick={() => handleUpdateDividerType("SOLID")}
                  className={cn(
                    " relative flex h-8 items-center justify-center rounded-lg border px-4",
                    { "border-black": extra.divider_type == "SOLID" },
                  )}
                >
                  {/* <BiSolidBadgeCheck className=" absolute -right-2.5 -top-2.5 text-green-600" /> */}
                  <div className=" w-10 border-b border-black" />
                </button>
                {/* </div> */}
                <button
                  onClick={() => handleUpdateDividerType("DASHED")}
                  className={cn(
                    " flex h-8 items-center justify-center rounded-lg border px-4",
                    { "border-black": extra.divider_type == "DASHED" },
                  )}
                >
                  <div className=" w-10 border-b border-dashed border-black" />
                </button>
                <button
                  onClick={() => handleUpdateDividerType("DOTTED")}
                  className={cn(
                    " flex h-8 items-center justify-center rounded-lg border px-4",
                    { "border-black": extra.divider_type == "DOTTED" },
                  )}
                >
                  <div className=" w-10 border-b border-dotted border-black" />
                </button>
                <button
                  onClick={() => handleUpdateDividerType("BLANK")}
                  className={cn(
                    " flex h-8 items-center justify-center rounded-lg border px-4",
                    { "border-black": extra.divider_type == "BLANK" },
                  )}
                >
                  <p className=" text-xs">Blank</p>
                </button>
              </div>
            </div>

            {/* SWITCH */}
            <div className=" pr-5">
              <Switch
                className=" data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-neutral-200"
                checked={active}
                onCheckedChange={handleUpdateActive}
              />
            </div>
          </div>

          {/* BOTTOM */}
          <div className=" mt-2 flex w-full items-center pb-6">
            <div className=" flex flex-1 items-center gap-x-1">
              <p className=" mr-4 text-sm text-neutral-500">Divider</p>
              <button
                className={cn(
                  " rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100",
                  {
                    "bg-red-600 text-white hover:bg-red-600 hover:text-white":
                      collapse == "DELETE",
                  },
                )}
                onClick={() => handleCollapse("DELETE")}
              >
                <Trash size={20} />
              </button>
            </div>
            <div className=" pr-5"></div>
          </div>
        </div>
      </div>

      {/*  */}
      <div
        className={cn(" h-0 w-full  transition-all duration-300 ease-in", {
          " h-[150px] ": showCollapse,
        })}
      >
        {collapse == "DELETE" ? (
          <>
            <div className=" relative flex w-full items-center justify-center bg-neutral-200 py-1.5">
              <button
                onClick={() => handleCollapse("DELETE")}
                className=" absolute right-2"
              >
                <LuX />
              </button>
              <p className=" text-sm font-semibold text-neutral-800">Delete</p>
            </div>
            <div className=" my-4 mb-0 text-center">
              <p className=" text-sm text-neutral-800">Delete this forever?</p>
            </div>
            <div className="flex w-full gap-4 p-4">
              <Button
                variant="outline"
                className=" w-full rounded-full"
                size="lg"
              >
                Cancel
              </Button>
              <Button
                className=" w-full rounded-full bg-red-600 hover:bg-red-600/90"
                size="lg"
                onClick={handleDeleteLink}
              >
                Delete
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className=" flex w-full items-center justify-center bg-neutral-200 py-1.5">
              <p className=" text-sm font-semibold text-neutral-800">
                Add Thumbnail
              </p>
            </div>
            <div className=" my-4 mb-0 text-center">
              <p className=" text-sm text-neutral-800">
                Add a Thumbnail or Icon to this link?
              </p>
            </div>
            <div className="flex w-full gap-4 p-4">
              <Button
                className=" w-full rounded-full"
                size="lg"
                onClick={handleDeleteLink}
              >
                Set Thumbnail
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
