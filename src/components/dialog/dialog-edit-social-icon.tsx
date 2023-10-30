"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { LuX } from "react-icons/lu";
import useDialogEditSocialIcon from "~/hooks/use-dialog-edit-social-icon";
import { SOCIAL_ICON_LIST } from "~/lib/data/social-icon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { UpdateSocialIconSchema } from "~/server/api/schemas/social-icon";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/use-toast";
import usePreviewLoading from "~/hooks/use-preview-loading";

type DIALOG_STEP = "EDIT" | "DELETE";

interface DialogEditSocialIconProps {
  handleUpdate: (payload: UpdateSocialIconSchema) => void;
  hotReload: () => void;
}

export default function DialogEditSocialIcon({
  handleUpdate,
  hotReload,
}: DialogEditSocialIconProps) {
  const [url, setUrl] = useState<string>("");
  const [step, setStep] = useState<DIALOG_STEP>("EDIT");

  const { isOpen, onClose, socialIcon } = useDialogEditSocialIcon();

  useEffect(() => {
    setUrl(socialIcon.url ?? "");
  }, [socialIcon]);

  const selectedSocialIcon = SOCIAL_ICON_LIST.find(
    (icon) => icon.id == socialIcon.iconId,
  );

  const handleUpdateSocialIcon = () => {
    handleUpdate({ socialIconId: socialIcon.id, url });
    handleClose();
  };

  const handleClose = () => {
    setStep("EDIT");
    onClose();
  };

  const { toast } = useToast();
  const previewLoading = usePreviewLoading();

  const deleteSocialIconMutation = api.socialIcon.deleteSocialIcon.useMutation({
    onMutate: () => {
      previewLoading.setIsLoading(true);
    },
    onSuccess: () => {
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
      handleClose();
    },
  });

  const handleDeleteSocialIcon = () => {
    deleteSocialIconMutation.mutate({ socialIconId: socialIcon.id });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-lg gap-0 p-0 pb-6 sm:rounded-3xl">
        {step == "EDIT" ? (
          <>
            <div className="relative flex items-center justify-between p-4 pb-4">
              <div className=" w-9"></div>
              <h1 className=" font-semibold text-neutral-800">
                Edit {selectedSocialIcon?.label}
              </h1>
              <button
                className=" rounded-lg p-2 hover:bg-neutral-100"
                onClick={handleClose}
              >
                <LuX size={20} />
              </button>
            </div>

            <div className=" px-6">
              <Input
                label="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <div className=" mt-6 space-y-2">
                <Button
                  className=" h-12 w-full rounded-full"
                  onClick={handleUpdateSocialIcon}
                >
                  Update
                </Button>
                <Button
                  className=" h-12 w-full rounded-full"
                  variant="outline"
                  onClick={() => setStep("DELETE")}
                >
                  Remove Icon
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-between p-4 pb-4">
              <div className=" w-9"></div>
              <h1 className=" font-semibold text-neutral-800">
                Remove Icon {selectedSocialIcon?.label}
              </h1>
              <button
                className=" rounded-lg p-2 hover:bg-neutral-100"
                onClick={handleClose}
              >
                <LuX size={20} />
              </button>
            </div>

            <div className=" px-6">
              <div className="space-y-2">
                <Button
                  className=" h-12 w-full rounded-full"
                  onClick={handleDeleteSocialIcon}
                >
                  Yes, remove
                </Button>
                <Button
                  className=" h-12 w-full rounded-full"
                  variant="outline"
                  onClick={() => setStep("EDIT")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
