import { ChatRoomIF, UserIF } from "@/interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  showSidebar: boolean;
  showUserSearchView: boolean;
  selectedUser: UserIF | null;
  currentChatRoom: ChatRoomIF | null;
};

type Action = {
  setShowSidebar: (value: State["showSidebar"]) => void;
  setShowUserSearchView: (value: State["showUserSearchView"]) => void;
  setSelectedUser: (value: State["selectedUser"]) => void;
  setCurrentChatRoom: (value: State["currentChatRoom"]) => void;
};

const initialState: any = {
  showSidebar: true,
  showUserSearchView: false,
  selectedUser: null,
  currentChatRoom: null,
};

const useAppStore = create(
  persist<State & Action>(
    (set, get) => ({
      ...initialState,
      setShowSidebar: (value) => set((state) => ({ showSidebar: value })),
      setShowUserSearchView: (value) =>
        set(() => ({ showUserSearchView: value })),
      setSelectedUser: (value) => set(() => ({ selectedUser: value })),
      setCurrentChatRoom: (value) =>
        set((state) => ({ currentChatRoom: value })),
    }),
    { name: "appStore", storage: createJSONStorage(() => sessionStorage) }
  )
);

export { useAppStore };
