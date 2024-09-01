import { ChatRoomIF, UserIF } from "@/interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  isSidebarOpen: boolean;
  isShowUserSearchOpen: boolean;
  selectedUser: UserIF | null;
  currentChatRoom: ChatRoomIF | null;
};

type Action = {
  setSidebarOpen: (value: State["isSidebarOpen"]) => void;
  setUserSearchOpen: (value: State["isShowUserSearchOpen"]) => void;
  setSelectedUser: (value: State["selectedUser"]) => void;
  setCurrentChatRoom: (value: State["currentChatRoom"]) => void;
};

const initialState: any = {
  isSidebarOpen: true,
  showUserSearchView: false,
  selectedUser: null,
  currentChatRoom: null,
};

const useAppStore = create(
  persist<State & Action>(
    (set, get) => ({
      ...initialState,
      setSidebarOpen: (value) => set(() => ({ isSidebarOpen: value })),
      setUserSearchOpen: (value) =>
        set(() => ({ isShowUserSearchOpen: value })),
      setSelectedUser: (value) => set(() => ({ selectedUser: value })),
      setCurrentChatRoom: (value) =>
        set((state) => ({ currentChatRoom: value })),
    }),
    { name: "appStore", storage: createJSONStorage(() => sessionStorage) }
  )
);

export { useAppStore };
