"use client";
import React from "react";

import { gql, useLazyQuery, useSuspenseQuery } from "@apollo/client";

import { Session } from "next-auth";

import SearchBar from "./SearchBar";

import { FaArrowLeft } from "react-icons/fa";

import AddContactButton from "../Buttons/AddContactButton";
import ListCard from "./ListCard";
import { UserIF } from "@/interface";
import { useAppStore } from "@/store";

interface Props {
  session: Session;
  className?: string;
}

type Data = {
  users: UserIF[];
};

function SidebarUserSearchView({ session, className }: Props) {
  const { setShowUserSearchView, setCurrentChatRoom } = useAppStore();

  const { data, error } = useSuspenseQuery<Data>(GetUsers);
  const [getPersonalChatRoom] = useLazyQuery(GetPersonalChatRoom);

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleSetChatRoom = (user: UserIF) => {
    const participants = [user._id, session.user._id];
    getPersonalChatRoom({
      variables: {
        filter: {
          participants: participants,
          type: "PERSONAL",
        },
      },
      onError(error) {
        console.log(error);
      },
      onCompleted(res) {
        console.log(res);
        setCurrentChatRoom(res.getPersonalChatRoom);
      },
    });

    setShowUserSearchView(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="h-16 w-full p-2 flex items-center space-x-4 bg-neutral-800">
        <div className="h-full flex items-center pl-4 cursor-pointer">
          <FaArrowLeft
            onClick={() => setShowUserSearchView(false)}
            className="icon"
            size={20}
          />
        </div>
        <SearchBar />
      </div>
      <div className="sidebarContainerView">
        {data.users
          .filter((f) => f._id !== session.user._id)
          .map((m, i) => (
            <ListCard
              key={i}
              type="user"
              user={m}
              onClick={() => handleSetChatRoom(m)}
            />
          ))}
      </div>
      <AddContactButton />
    </div>
  );
}

export default SidebarUserSearchView;

const GetUsers = gql`
  query Users {
    users {
      _id
      email
      image
      name
      mobile
    }
  }
`;

const GetPersonalChatRoom = gql`
  query GetPersonalChatRoom($filter: ChatRoomFilter) {
    getPersonalChatRoom(filter: $filter) {
      _id
      title
      type
      participants {
        _id
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
