import { create } from "zustand";

interface DialogAddSocialIconStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDialogAddSocialIcon = create<DialogAddSocialIconStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDialogAddSocialIcon;
