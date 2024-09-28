"use client";
import React, { Suspense } from "react";
import { gql, useSuspenseQuery } from "@apollo/client";
import { Session } from "next-auth";
import { ChatRoomIF } from "@/interface";
import { useAppStore } from "@/store";
import SidebarChatListView from "./SidebarChatListView";
import SidebarUserSearchView from "./SidebarUserSearchView";
import Navbar from "./Navbar";
import SidebarPlaceholder from "../Placeholders/SidebarPlaceholder";

interface Props {
  session: Session;
}

type Data = {
  chatRooms: ChatRoomIF[];
};

function Sidebar({ session }: Props) {
  const { isSidebarOpen, isShowUserSearchOpen } = useAppStore();

  // const { data, error } = useSuspenseQuery<Data>(GetChatRooms, {
  //   variables: { filter: { createdByID: session.user.id } },
  // });

  // if (error) {
  //   return <div>{error.message}</div>;
  // }
  return (
    <aside
      className={`sidebar ${
        isSidebarOpen ? "w-full md:w-100" : "w-0 xl:w-100"
      }`}
    >
      <Suspense fallback={<SidebarPlaceholder />}>
        <SidebarChatListView
          session={session}
          className={!isShowUserSearchOpen ? "opacity-100" : "opacity-0"}
        />
      </Suspense>
      <Suspense fallback={<SidebarPlaceholder />}>
        <SidebarUserSearchView
          session={session}
          className={isShowUserSearchOpen ? "opacity-100" : "opacity-0"}
        />
      </Suspense>
    </aside>
  );
}

export default Sidebar;

const GetChatRooms = gql`
  query ChatRooms($filter: ChatRoomFilter) {
    chatRooms(filter: $filter) {
      _id
      title
      createdAt
    }
  }
`;
