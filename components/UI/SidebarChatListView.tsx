"use client";
import React, { Fragment, useState } from "react";
import NewConversationButton from "../Buttons/NewConversationButton";
import { gql, useSuspenseQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { ChatRoomIF } from "@/interface";
import { useAppStore } from "@/store";
import timeAgo from "@/functions";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "./SearchBar";
import NewChatButton from "../Buttons/NewChatButton";
import ListCard from "./ListCard";
import Link from "next/link";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Props {
  className?: string;
  session: Session;
}

type Data = {
  chatRooms: ChatRoomIF[];
};

function SidebarChatListView({ session, className }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  console.log(isMobile);
  const { setCurrentChatRoom, isShowUserSearchOpen, setSidebarOpen } =
    useAppStore();
  const pathname = usePathname();

  const { data, error } = useSuspenseQuery<Data>(GetChatRooms, {
    variables: { filter: { participant: session.user._id } },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div
      className={`sidebarContainerView ${
        isShowUserSearchOpen ? "w-0 overflow-hidden" : "w-full md:w-100"
      }`}
    >
      <Navbar isSidebarNav />
      {data.chatRooms.length > 0 ? (
        <div className="sidebarListView">
          {data.chatRooms.map((m, i) => (
            <Link
              key={i}
              href={`/chat/${m._id}`}
              replace={pathname !== "/chat" ? true : false}
              onClick={() => (isMobile ? setSidebarOpen(false) : null)}
            >
              <ListCard
                type="chat"
                chatRoom={m}
                onClick={() => setCurrentChatRoom(m)}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="sidebarContainerView">
          <div className="w-full h-full flex items-center justify-center text-neutral-500">
            Empty List
          </div>
        </div>
      )}
      <NewChatButton />
    </div>
  );
}

export default SidebarChatListView;

const GetChatRooms = gql`
  query ChatRooms($filter: ChatRoomFilter) {
    chatRooms(filter: $filter) {
      _id
      title
      type
      participants {
        _id
        name
      }
      createdAt
    }
  }
`;
