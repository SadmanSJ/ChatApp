"use client";
import React, { Suspense } from "react";
import { gql, useSuspenseQuery } from "@apollo/client";
import { Session } from "next-auth";
import { ChatRoomIF } from "@/interface";
import { useAppStore } from "@/store";
import SidebarChatListView from "./SidebarChatListView";
import SidebarUserSearchView from "./SidebarUserSearchView";

interface Props {
  session: Session;
}

type Data = {
  chatRooms: ChatRoomIF[];
};

function Sidebar({ session }: Props) {
  const { showSidebar } = useAppStore();

  const { showUserSearchView } = useAppStore();

  const { data, error } = useSuspenseQuery<Data>(GetChatRooms, {
    variables: { filter: { createdByID: session.user._id } },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div
      className={`sidebar ${
        showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div
        className={`absolute inset-y-0 w-full flex transition-all duration-300 ${
          showUserSearchView ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <Suspense>
          <SidebarChatListView
            session={session}
            className={!showUserSearchView ? "opacity-100" : "opacity-0"}
          />
        </Suspense>
        <Suspense>
          <SidebarUserSearchView
            session={session}
            className={showUserSearchView ? "opacity-100" : "opacity-0"}
          />
        </Suspense>
      </div>
    </div>
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

const chatRooms = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
];
