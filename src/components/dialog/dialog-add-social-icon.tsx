"use client";

import { ArrowLeft } from "iconsax-react";
import React, { useState } from "react";
import type { IconType } from "react-icons";
import { LuX } from "react-icons/lu";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { useToast } from "~/hooks/use-toast";
import { SOCIAL_ICON_LIST } from "~/lib/data/social-icon";
import { cn } from "~/lib/utils";
import type { SocialIcon } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import useDialogAddSocialIcon from "~/hooks/use-dialog-add-social-icon";

type STEP_DIALOG = "LIST" | "ADD";

interface DialogAddSocialIconProps {
  hotReload: () => void;
  socialIcons: SocialIcon[] | undefined;
}

export default function DialogAddSocialIcon({
  hotReload,
  socialIcons,
}: DialogAddSocialIconProps) {
  const [searchIcon, setSearchIcon] = useState<string>();
  const [step, setStep] = useState<STEP_DIALOG>("LIST");
  const [listIcon, setListIcon] = useState(SOCIAL_ICON_LIST);
  const [selectedSocialIcon, setSelectedSocialIcon] = useState(0);
  const [url, setUrl] = useState("");

  listIcon.sort((a, b) => {
    const fa = a.label.toLowerCase();
    const fb = b.label.toLowerCase();

    if (fa < fb) return -1;
    if (fa > fb) return 1;

    return 0;
  });

  const dialogAddSocialIcon = useDialogAddSocialIcon();

  const toggleDialogSocialIcon = () => {
    if (dialogAddSocialIcon.isOpen) {
      dialogAddSocialIcon.onClose();
    }
    dialogAddSocialIcon.onOpen;
    setSearchIcon("");
    setTimeout(() => {
      setStep("LIST");
    }, 300);
    setSelectedSocialIcon(0);
    setUrl("");
  };

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

  const handleSelectedSocialIcon = (iconId: number) => {
    setSelectedSocialIcon(iconId);
    setStep("ADD");
  };

  const socialIcon = SOCIAL_ICON_LIST.find(
    (icon) => icon.id == selectedSocialIcon,
  );

  const { toast } = useToast();
  const previewLoading = usePreviewLoading();

  const addSocialIconMutation = api.socialIcon.addSocialIcon.useMutation({
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
      toggleDialogSocialIcon();
    },
  });

  const handleAddSocialIcon = () => {
    addSocialIconMutation.mutate({ iconId: selectedSocialIcon, url });
  };
  return (
    <Dialog
      open={dialogAddSocialIcon.isOpen}
      onOpenChange={toggleDialogSocialIcon}
    >
      <DialogContent className=" h-fit w-full gap-0 rounded-3xl  p-0 pb-6 sm:rounded-3xl md:max-w-lg">
        {step == "LIST" ? (
          <>
            <div className="relative flex items-center justify-between p-4 pb-4">
              <div className=" w-9"></div>
              <h1 className=" font-semibold text-neutral-800">Add Icon</h1>
              <button
                className=" rounded-lg p-2 hover:bg-neutral-100"
                onClick={toggleDialogSocialIcon}
              >
                <LuX size={20} />
              </button>
            </div>
            <div className=" sticky top-0 bg-white px-6 py-2">
              <Input
                label="Search icon"
                value={searchIcon}
                onChange={handleSearchIcon}
              />
            </div>
            <div className=" relative h-[400px] w-full overflow-y-scroll">
              <div className=" px-6">
                {listIcon.map((icon, index) => (
                  <IconItem
                    icon={icon}
                    key={index}
                    disabled={socialIcons?.some(
                      (socialIcon) => socialIcon.iconId == icon.id,
                    )}
                    onClick={() => handleSelectedSocialIcon(icon.id)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : step == "ADD" ? (
          <>
            <div className="relative flex items-center justify-between p-4 pb-4">
              <button
                className=" rounded-lg p-2 hover:bg-neutral-100"
                onClick={() => {
                  setStep("LIST");
                }}
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className=" font-semibold text-neutral-800">
                Add {socialIcon?.label} Icon
              </h1>
              <button className=" rounded-lg p-2 hover:bg-neutral-100">
                <LuX size={20} />
              </button>
            </div>
            <div className=" relative w-full overflow-y-scroll">
              <div className="space-y-4 bg-white px-6 pt-2">
                <Input
                  label={`Enter ${socialIcon?.label} URL`}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button
                  className=" h-12 w-full rounded-full"
                  onClick={handleAddSocialIcon}
                >
                  ADD
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

interface IconItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: {
    label: string;
    icon: IconType;
  };
  disabled?: boolean;
}

function IconItem({
  icon: { label, icon: Icon },
  disabled,
  ...props
}: IconItemProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        " flex h-[60px] w-full cursor-pointer items-center justify-between rounded-full px-6 font-medium hover:bg-neutral-100",
      )}
      {...props}
    >
      <div className="flex items-center gap-x-4">
        <Icon size={20} />
        {label}
      </div>
      {disabled && <p className=" text-sm text-green-700"> already added</p>}
    </button>
  );
}
