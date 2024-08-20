import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStoreIF {
  showSidebar: boolean;
  currentChatRoomID: string | null;
  setShowSidebar: (value: boolean) => void;
  setCurrentChatRoomID: (value: string | null) => void;
}

const initialState: any = {
  showSidebar: true,
  currentChatRoomID: null,
};

const useAppStore = create(
  persist<AppStoreIF>(
    (set, get) => ({
      ...initialState,
      setShowSidebar: (value) => set((state) => ({ showSidebar: value })),
      setCurrentChatRoomID: (value) =>
        set((state) => ({ currentChatRoomID: value })),
    }),
    { name: "appStore", storage: createJSONStorage(() => sessionStorage) }
  )
);

export { useAppStore };
