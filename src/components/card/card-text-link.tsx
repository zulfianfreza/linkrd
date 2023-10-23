"use client";

import { Gallery, MouseSquare, Trash } from "iconsax-react";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import GrabIcon from "~/components/icon/grab-icon";
import { Switch } from "~/components/ui/switch";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { useToast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { LuX } from "react-icons/lu";
import { ILink } from "~/types/link";

interface CardTextLinkProps {
  link: ILink;
  refetch: () => void;
  hotReload: () => void;
}

type COLLAPSE_TYPE = "DELETE" | "THUMBNAIL";

export default function CardTextLink({
  link,
  refetch,
  hotReload,
}: CardTextLinkProps) {
  const [liveEditUrl, setLiveEditUrl] = useState(false);
  const [liveEditTitle, setLiveEditTitle] = useState(false);
  const [label, setLabel] = useState(link.label ?? "");
  const [url, setUrl] = useState(link.url ?? "");
  const [active, setActive] = useState(link.active ?? false);
  const [showCollapse, setShowCollapse] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<COLLAPSE_TYPE | null>(null);

  const previewLoading = usePreviewLoading();
  const { toast } = useToast();

  const toggleLiveEditTitle = () => {
    setLiveEditTitle(!liveEditTitle);
  };
  const toggleLiveEditUrl = () => {
    setLiveEditUrl(!liveEditUrl);
  };

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
      // refetch();
      hotReload();
    },
  });

  const handleUpdateLink = (active?: boolean) => {
    updateLinkMutation.mutate({
      linkId: Number(link.id),
      label,
      url,
      active,
    });
  };

  const handleUpdateActive = () => {
    setActive(!active);
    handleUpdateLink(!active);
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

  const onBlurTitle = () => {
    toggleLiveEditTitle();
    if (label == link.label) return;
    handleUpdateLink();
  };

  const onBlurUrl = () => {
    toggleLiveEditUrl();
    if (url == link.url) return;
    handleUpdateLink();
  };

  return (
    <div className=" w-full overflow-hidden rounded-[24px] bg-white shadow-sm">
      <div className="flex">
        {/* LEFT */}
        <div className="flex cursor-grab items-center p-4">
          <GrabIcon />
        </div>

        {/* RIGHT */}
        <div className="flex-1 py-6 pl-6">
          <div className=" flex items-center">
            <div className=" flex flex-1 flex-col gap-1 overflow-hidden pr-10">
              <div className=" flex items-center gap-x-2">
                {!liveEditTitle ? (
                  <>
                    <p
                      className={cn("  font-medium text-neutral-800", {
                        "text-neutral-500": label == "",
                      })}
                      onClick={toggleLiveEditTitle}
                    >
                      {label != "" ? label : "Title"}
                    </p>
                    <HiOutlinePencil
                      className=" cursor-pointer text-neutral-500 hover:text-neutral-800"
                      onClick={toggleLiveEditTitle}
                    />
                  </>
                ) : (
                  <input
                    type="text"
                    autoFocus
                    onBlur={onBlurTitle}
                    defaultValue={label}
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className=" w-full font-medium focus:outline-none"
                  />
                )}
              </div>

              <div className=" flex w-full items-center gap-x-2">
                {!liveEditUrl ? (
                  <>
                    <div className=" flex w-full items-center gap-x-2">
                      <p
                        className={cn(
                          "max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-neutral-600",
                          { "text-neutral-500": url == "" },
                        )}
                        onClick={toggleLiveEditUrl}
                      >
                        {url != "" ? url : "URL"}
                      </p>
                      <button
                        onClick={toggleLiveEditUrl}
                        className=" flex cursor-pointer text-neutral-500 hover:text-neutral-800"
                      >
                        <HiOutlinePencil size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <input
                    type="text"
                    autoFocus
                    onBlur={onBlurUrl}
                    defaultValue={url}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className=" w-full  text-sm focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* SWITCH */}
            <div className=" pr-5">
              <Switch
                disabled={link.label == "" || link.url == ""}
                className=" data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-neutral-200"
                checked={active}
                onCheckedChange={handleUpdateActive}
              />
            </div>
          </div>

          {/* BOTTOM */}
          <div className=" mt-2 flex w-full items-center  ">
            <div className=" flex flex-1 items-center gap-x-1">
              <p className=" mr-4 text-sm text-neutral-500">Text</p>
              <button className=" flex gap-x-1 rounded-lg p-1.5 text-sm text-neutral-500 hover:bg-neutral-100">
                <MouseSquare className=" text-neutral-500" size={20} />
                {link.clickCount} clicks
              </button>
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
        ) : null}
      </div>
    </div>
  );
}
