"use client";

import { useState } from "react";
import { HiAtSymbol, HiPencil } from "react-icons/hi";
import { SOCIAL_ICON_LIST } from "~/lib/data/social-icon";
import type { UpdateSocialIconSchema } from "~/server/api/schemas/social-icon";
import type { SocialIcon } from "~/server/db/schema";
import Icon from "./icon";
import { Switch } from "./ui/switch";
import useDialogEditSocialIcon from "~/hooks/use-dialog-edit-social-icon";

interface SocialIconItemProps {
  socialIcon: SocialIcon;
  handleUpdate: (payload: UpdateSocialIconSchema) => void;
}

export default function SocialIconItem({
  socialIcon,
  handleUpdate,
}: SocialIconItemProps) {
  const [active, setActive] = useState<boolean>(socialIcon.active ?? true);

  const icon = SOCIAL_ICON_LIST.find((icon) => {
    return icon.id == socialIcon.iconId;
  });

  const handleUpdateActive = () => {
    handleUpdate({ active: !active, socialIconId: socialIcon.id });
    setActive(!active);
  };

  const { setSocialIcon, onOpen } = useDialogEditSocialIcon();

  const handleOpen = () => {
    onOpen();
    setSocialIcon(socialIcon);
  };

  return (
    <div className="flex items-center gap-x-4">
      <button
        className="group flex h-14 flex-1 items-center justify-between gap-x-4 rounded-lg px-4 hover:bg-neutral-100"
        onClick={handleOpen}
      >
        <div className="flex items-center gap-x-4">
          <Icon icon={icon?.icon ?? HiAtSymbol} size={20} />
          <p className=" font-medium">{icon?.label}</p>
        </div>
        <HiPencil size={20} className="hidden group-hover:block" />
      </button>
      <Switch
        className=" data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-neutral-200"
        checked={active}
        onCheckedChange={handleUpdateActive}
      />
    </div>
  );
}
