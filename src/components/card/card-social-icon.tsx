"use client";

import { useState } from "react";
import useDialogAddSocialIcon from "~/hooks/use-dialog-add-social-icon";
import usePreviewLoading from "~/hooks/use-preview-loading";
import { useToast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import type { UpdateSocialIconSchema } from "~/server/api/schemas/social-icon";
import type { SocialIcon, Theme } from "~/server/db/schema";
import { api } from "~/trpc/react";
import type { SOCIAL_ICON_POSITION_TYPE } from "~/types/theme";
import DialogAddSocialIcon from "../dialog/dialog-add-social-icon";
import SocialIconItem from "../social-icon-item";
import DialogEditSocialIcon from "../dialog/dialog-edit-social-icon";

interface CardSocialIconProps {
  socialIcons: SocialIcon[] | undefined;
  theme: Theme | undefined;
  hotReloadTheme: () => void;
  hotReloadSocialIcons: () => void;
}

export default function CardSocialIcon({
  socialIcons,
  theme,
  hotReloadSocialIcons,
  hotReloadTheme,
}: CardSocialIconProps) {
  const [socialIconPosition, setSocialIconPosition] =
    useState<SOCIAL_ICON_POSITION_TYPE>(
      (theme?.socialIconPosition as SOCIAL_ICON_POSITION_TYPE) ?? "top",
    );

  const { toast } = useToast();
  const previewLoading = usePreviewLoading();

  const updateSocialIconMutation = api.socialIcon.updateSocialIcon.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: () => {
      hotReloadSocialIcons();
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
    },
  });

  const handleUpdateSocialIcon = (payload: UpdateSocialIconSchema) => {
    updateSocialIconMutation.mutate(payload);
  };

  const updateSocialIconPositionMutation = api.theme.updateTheme.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: () => {
      hotReloadTheme();
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
    },
  });

  const handleUpdateSocialIconPosition = (
    position: SOCIAL_ICON_POSITION_TYPE,
  ) => {
    updateSocialIconPositionMutation.mutate({ socialIconPosition: position });
    setSocialIconPosition(position);
  };

  const { onOpen } = useDialogAddSocialIcon();

  return (
    <>
      <div className=" mt-2 rounded-[24px] bg-white p-6">
        <div className=" flex items-center justify-between gap-x-8">
          <div className=" flex flex-1 flex-col">
            <h2 className=" font-medium text-gray-900">Be Iconic</h2>
            <p className=" text-sm text-gray-500">
              Add icons linking to your social profiles, github and more.
            </p>
          </div>
          <button
            className=" flex h-12 items-center justify-center rounded-full bg-violet-700 px-4 text-sm font-medium text-white"
            onClick={onOpen}
          >
            Add Icon
          </button>
        </div>
        <div className=" mt-4 flex justify-end"></div>
        <div className=" mt-4">
          {socialIcons?.map((socialIcon) => (
            <SocialIconItem
              socialIcon={socialIcon}
              key={socialIcon.id}
              handleUpdate={handleUpdateSocialIcon}
            />
          ))}
        </div>
        <div className=" mt-4">
          <div className="">
            <h2 className=" font-medium text-gray-900">Position</h2>
            <p className=" text-sm text-gray-500">Display social icon at:</p>
          </div>
          <div className="mt-4 flex flex-col items-start gap-4">
            <button
              className="flex items-center gap-2"
              onClick={() => handleUpdateSocialIconPosition("top")}
            >
              <div
                className={cn(" aspect-square h-5 rounded-full border", {
                  "border-[6px] border-violet-700": socialIconPosition == "top",
                })}
              />
              <span className=" text-sm text-neutral-800">Top</span>
            </button>
            <button
              className="flex items-center gap-2"
              onClick={() => handleUpdateSocialIconPosition("bottom")}
            >
              <div
                className={cn(" aspect-square h-5 rounded-full border", {
                  "border-[6px] border-violet-700":
                    socialIconPosition == "bottom",
                })}
              />
              <span className=" text-sm text-neutral-800">Bottom</span>
            </button>
          </div>
        </div>
      </div>

      <DialogAddSocialIcon
        hotReload={hotReloadSocialIcons}
        socialIcons={socialIcons}
      />
      <DialogEditSocialIcon
        handleUpdate={handleUpdateSocialIcon}
        hotReload={hotReloadSocialIcons}
      />
    </>
  );
}
