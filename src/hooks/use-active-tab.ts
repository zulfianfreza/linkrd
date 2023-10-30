import { create } from "zustand";
import type { TABS_TYPE } from "~/lib/data/constants";

interface ActiveTabStore {
  activeTab: TABS_TYPE;
  setActiveTab: (tab: TABS_TYPE) => void;
}

const useActiveTab = create<ActiveTabStore>((set) => ({
  activeTab: "CUSTOM",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useActiveTab;
