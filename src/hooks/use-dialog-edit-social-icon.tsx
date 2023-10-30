import { create } from "zustand";
import type { SocialIcon } from "~/server/db/schema";

interface DialogEditSocialIconStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  socialIcon: SocialIcon;
  setSocialIcon: (icon: SocialIcon) => void;
}

const useDialogEditSocialIcon = create<DialogEditSocialIconStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  socialIcon: {} as SocialIcon,
  setSocialIcon: (icon) => set({ socialIcon: icon }),
}));

export default useDialogEditSocialIcon;
