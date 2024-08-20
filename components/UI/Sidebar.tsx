"use client";
import React from "react";
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

interface Props {
  session: Session;
}

type Data = {
  chatRooms: ChatRoomIF[];
};

function Sidebar({ session }: Props) {
  console.log("Sidebar");
  const {
    currentChatRoomID,
    setCurrentChatRoomID,
    showSidebar,
    setShowSidebar,
  } = useAppStore();

  const { data, error } = useSuspenseQuery<Data>(GetChatRooms, {
    variables: { filter: { createdByID: session.user._id } },
  });

  if (error) {
    return <div>{error.message}</div>;
  }
  console.log(currentChatRoomID);

  return (
    <div
      className={`fixed inset-y-0 w-full sm:w-[420px] border-r border-neutral-900 h-full bg-neutral-800 transition-all duration-300 ${
        showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="h-16 w-full p-2 flex items-center space-x-4 bg-neutral-800">
        <div className="h-full flex items-center pl-4 ">
          <GiHamburgerMenu className="icon" size={20} />
        </div>
        <SearchBar />
      </div>
      <div className="h-full py-2 flex flex-col shrink-0 space-y-4 px-2 pb-16 overflow-auto overscroll-contain">
        <div className="bg-pink-900 py-20">ppp</div>
        <div className="bg-pink-900 py-20">ppp</div>
        <div className="bg-pink-900 py-20">ppp</div>
        <div className="bg-pink-900 py-20">ppp</div>
        <div className="bg-pink-900 py-20">ppwww</div>

        {/* {data.chatRooms.map((m, i) => (
          <div
            className="cursor-pointer"
            key={i}
            onClick={() => setCurrentChatRoomID(m._id)}
          >
            <div>{`${m.title} #${i + 1}`}</div>
            <div className="text-xs text-slate-500">{timeAgo(m.createdAt)}</div>
          </div>
        ))} */}
      </div>
      <NewChatButton />
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
