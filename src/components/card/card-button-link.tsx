"use client";

import axios from "axios";
import {
  ArrowLeft,
  ArrowRight2,
  EmojiHappy,
  Gallery,
  Mouse,
  Trash,
} from "iconsax-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { LuX } from "react-icons/lu";
import GrabIcon from "~/components/icon/grab-icon";
import { Switch } from "~/components/ui/switch";
import { env } from "~/env.mjs";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { useToast } from "~/hooks/use-toast";
import { deleteImageCloudinary } from "~/lib/cloudinary";
import { SOCIAL_ICON_LIST } from "~/lib/data/social-icon";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { IButtonLink, IExtraThumbnail } from "~/types/link";
import type { ICloudinaryResponse } from "~/types/shared";
import Icon from "../icon";
import Loading from "../loading";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";

interface CardButtonLinkProps {
  link: IButtonLink;
  hotReload: () => void;
}

type COLLAPSE_TYPE = "DELETE" | "THUMBNAIL";
type DIALOG_ADD_THUMBNAIL_TYPE = "ADD" | "ICON";

export default function CardButtonLink({
  link,
  hotReload,
}: CardButtonLinkProps) {
  const [liveEditUrl, setLiveEditUrl] = useState(false);
  const [liveEditTitle, setLiveEditTitle] = useState(false);
  const [label, setLabel] = useState(link.label ?? "");
  const [url, setUrl] = useState(link.url ?? "");
  const [active, setActive] = useState(link.active ?? false);
  const [extra, setExtra] = useState<IExtraThumbnail>(
    link.extra
      ? (JSON.parse(link.extra) as IExtraThumbnail)
      : {
          iconId: link.extra ? link.extra.iconId : 0,
          thumbnailType: link.extra ? link.extra.thumbnailType : "ICON",
          imageUrl: link.extra ? link.extra.imageUrl : "",
        },
  );

  const [showCollapse, setShowCollapse] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<COLLAPSE_TYPE | null>(null);
  const [dialogAddThumbnail, setDialogAddThumbnail] = useState(false);
  const [stepDialog, setStepDialog] =
    useState<DIALOG_ADD_THUMBNAIL_TYPE>("ADD");

  const [searchIcon, setSearchIcon] = useState("");
  const [listIcon, setListIcon] = useState(SOCIAL_ICON_LIST);
  const [isLoading, setIsLoading] = useState(false);

  listIcon.sort((a, b) => {
    const fa = a.label.toLowerCase();
    const fb = b.label.toLowerCase();

    if (fa < fb) return -1;
    if (fa > fb) return 1;

    return 0;
  });

  const handleSearchIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text != "") {
      let results = [...SOCIAL_ICON_LIST];
      results = results.filter((icon) => {
        return icon.label.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      });
      setListIcon(results);
    } else {
      setListIcon(SOCIAL_ICON_LIST);
    }

    setSearchIcon(e.target.value);
  };

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

  const handleUpdateLink = ({
    active,
    extra,
  }: {
    active?: boolean;
    extra?: string;
  }) => {
    updateLinkMutation.mutate({
      linkId: link.id,
      label,
      url,
      active,
      extra,
    });
  };

  const handleUpdateActive = () => {
    setActive(!active);
    handleUpdateLink({ active: !active });
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
    handleUpdateLink({});
  };

  const onBlurUrl = () => {
    toggleLiveEditUrl();
    if (url == link.url) return;
    handleUpdateLink({});
  };

  const toggleDialogAddThumbnail = () => {
    setDialogAddThumbnail(!dialogAddThumbnail);
    setStepDialog("ADD");
  };

  const handleUpdateIcon = (iconId: number) => {
    const data = {
      thumbnailType: "ICON",
      iconId,
    } as IExtraThumbnail;
    const extraData = JSON.stringify(data);
    setExtra(data);
    handleUpdateLink({ extra: extraData });
    toggleDialogAddThumbnail();
  };

  const socialIcon = SOCIAL_ICON_LIST.find((icon) => icon.id == extra?.iconId)
    ?.icon;

  const handleDeleteThumbnail = () => {
    handleUpdateLink({ extra: "" });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;
    if (e.target.files?.[0]) {
      if (e.target.files[0].size > 2e6) {
        toast({
          title: "Please upload a file smaller than 2 MB",
          variant: "destructive",
        });
        return false;
      }
      file = e.target.files[0];
    }

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    try {
      previewLoading.setIsLoading(true);
      setIsLoading(true);
      toggleDialogAddThumbnail();
      if (extra.imageUrl !== "") {
        await deleteImageCloudinary(extra.imageUrl ?? "");
      }

      const { data } = await axios.post<ICloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      const jsonData = {
        thumbnailType: "IMAGE",
        imageUrl: data.secure_url,
      } as IExtraThumbnail;
      const extraData = JSON.stringify(jsonData);
      setExtra(jsonData);
      handleUpdateLink({ extra: extraData });
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      previewLoading.setIsLoading(false);
      setIsLoading(false);
    }
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
                          "max-w-full cursor-text overflow-hidden text-ellipsis whitespace-nowrap text-sm text-neutral-600",
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
              <p className=" mr-4 text-sm text-neutral-500">Button</p>
              <button
                className={cn(
                  " rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100",
                  {
                    "bg-violet-700 text-white hover:bg-violet-700 hover:text-white":
                      collapse == "THUMBNAIL",
                  },
                )}
                onClick={() => handleCollapse("THUMBNAIL")}
              >
                <Gallery size={20} />
              </button>
              <button className=" flex gap-x-1 rounded-lg p-1.5 text-sm text-neutral-500 hover:bg-neutral-100">
                <Mouse className=" text-neutral-500" size={20} />
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
        className={cn(
          " h-0 w-full  transition-all duration-300 ease-in",
          {
            " h-[150px] ": showCollapse,
          },
          {
            "h-[170px]":
              showCollapse &&
              collapse == "THUMBNAIL" &&
              link.extra != null &&
              link.extra != "",
          },
        )}
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
                onClick={() => handleCollapse("DELETE")}
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
            <div className=" relative flex w-full items-center justify-center bg-neutral-200 py-1.5">
              <button
                onClick={() => handleCollapse("THUMBNAIL")}
                className=" absolute right-2"
              >
                <LuX />
              </button>
              <p className=" text-sm font-semibold text-neutral-800">
                Add Thumbnail
              </p>
            </div>
            {link.extra ? (
              <>
                <div className="flex items-start gap-4 px-4 pt-4">
                  {extra.thumbnailType == "ICON" ? (
                    <Icon
                      icon={socialIcon ?? SOCIAL_ICON_LIST[0]!.icon}
                      size={80}
                    />
                  ) : (
                    <div className=" relative aspect-square w-20 overflow-hidden rounded-lg">
                      <Image
                        src={extra.imageUrl ?? ""}
                        fill
                        alt=""
                        className=" object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-2">
                    <Button
                      className=" h-12 w-full gap-1 rounded-full"
                      onClick={toggleDialogAddThumbnail}
                    >
                      {isLoading ? (
                        <>
                          <Loading className=" w-4" />
                          <p>Uploading</p>
                        </>
                      ) : (
                        <p>Change</p>
                      )}
                    </Button>
                    <Button
                      onClick={handleDeleteThumbnail}
                      className=" h-12 w-full rounded-full"
                      variant="outline"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className=" my-4 mb-0 text-center">
                  <p className=" text-sm text-neutral-800">
                    Add a Thumbnail or Icon to this link?
                  </p>
                </div>
                <div className="flex w-full gap-4 p-4">
                  <Button
                    className=" w-full rounded-full"
                    size="lg"
                    onClick={toggleDialogAddThumbnail}
                  >
                    Set Thumbnail
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Dialog open={dialogAddThumbnail} onOpenChange={toggleDialogAddThumbnail}>
        <DialogContent className=" w-full max-w-xl border-none bg-transparent p-5 shadow-none">
          <div className="w-full gap-0 rounded-3xl border bg-white p-0 pb-6 shadow-lg">
            {stepDialog == "ADD" ? (
              <>
                <div className="relative flex items-center justify-between p-4 pb-4">
                  <div className=" w-9"></div>
                  <h1 className=" font-semibold text-neutral-800">
                    Add Thumbnail
                  </h1>
                  <button
                    className=" rounded-lg p-2 hover:bg-neutral-100"
                    onClick={toggleDialogAddThumbnail}
                  >
                    <LuX size={20} />
                  </button>
                </div>

                <div className=" px-6">
                  <div className="">
                    <input
                      type="file"
                      name=""
                      id=""
                      className="hidden"
                      ref={inputRef}
                      onChange={handleUploadImage}
                      accept="image/png, image/jpg, image/jpeg"
                    />
                    <button
                      className="flex w-full items-center justify-between rounded-xl p-4 hover:bg-neutral-100"
                      onClick={handleClick}
                    >
                      <div className="flex items-center gap-4">
                        <div className=" flex aspect-square w-12 items-center justify-center rounded-xl bg-violet-200">
                          <EmojiHappy
                            variant="Bulk"
                            size={36}
                            className=" text-violet-700"
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <h1 className=" font-medium text-neutral-800">
                            Upload your own thumbnail
                          </h1>
                          <p className=" text-sm text-neutral-500">
                            Upload from your computer
                          </p>
                        </div>
                      </div>

                      <ArrowRight2 size={20} />
                    </button>
                  </div>

                  <button
                    className="flex w-full items-center justify-between rounded-xl p-4 hover:bg-neutral-100"
                    onClick={() => setStepDialog("ICON")}
                  >
                    <div className="flex items-center gap-4">
                      <div className=" relative flex aspect-square w-12 overflow-hidden rounded-xl bg-neutral-100 p-1">
                        <Image
                          src="/images/select-modal--icons.webp"
                          fill
                          alt="selectmodal"
                          className=" object-cover "
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <h1 className=" font-medium text-neutral-800">
                          Choose from Simple Icons
                        </h1>
                      </div>
                    </div>

                    <ArrowRight2 size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex items-center justify-between p-4 pb-4">
                  <button
                    className=" rounded-lg p-2 hover:bg-neutral-100"
                    onClick={() => {
                      setStepDialog("ADD");
                    }}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h1 className=" font-semibold text-neutral-800">
                    Add Thumbnail Icon
                  </h1>
                  <button className=" rounded-lg p-2 hover:bg-neutral-100">
                    <LuX size={20} />
                  </button>
                </div>

                <div className=" bg-white px-6 py-2 pb-6">
                  <Input
                    label="Search icon"
                    value={searchIcon}
                    onChange={handleSearchIcon}
                  />
                </div>

                <div className=" max-h-[320px] min-h-[320px] overflow-y-auto px-6">
                  <div className=" grid grid-cols-5 gap-2">
                    {listIcon.map((icon, index) => (
                      <button
                        onClick={() => {
                          handleUpdateIcon(icon.id);
                        }}
                        key={index}
                        className=" flex aspect-square w-full items-center justify-center rounded-lg border hover:border-black"
                      >
                        <Icon
                          icon={icon.icon}
                          size={24}
                          className=" text-gray-800"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
