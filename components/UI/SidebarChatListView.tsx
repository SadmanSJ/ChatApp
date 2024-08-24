"use client";
import React, { useState } from "react";
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

interface Props {
  className?: string;
  session: Session;
}

type Data = {
  chatRooms: ChatRoomIF[];
};

function SidebarChatListView({ session, className }: Props) {
  const { setCurrentChatRoom } = useAppStore();

  const { data, error } = useSuspenseQuery<Data>(GetChatRooms, {
    variables: { filter: { participant: session.user._id } },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  //   const handleSetChatRoom = (chatRoom: ChatRoomIF) => {
  //     const participants = [user._id, session.user._id];

  //     setCurrentChatRoom(res.getPersonalChatRoom);
  //     });

  //     setShowUserSearchView(false);
  //   };

  //   console.log(data);

  return (
    <div className={`relative ${className}`}>
      <div className="h-16 w-full p-2 flex items-center space-x-4 bg-neutral-800">
        <div className="h-full flex items-center pl-4 ">
          <GiHamburgerMenu className="icon" size={20} />
        </div>
        <SearchBar />
      </div>
      {data.chatRooms.length > 0 ? (
        <div className="sidebarContainerView">
          {data.chatRooms.map((m, i) => (
            <ListCard
              key={i}
              type="chat"
              chatRoom={m}
              onClick={() => setCurrentChatRoom(m)}
            />
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
