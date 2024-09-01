"use client";
import React, { Fragment } from "react";

import { gql, useLazyQuery, useSuspenseQuery } from "@apollo/client";

import { Session } from "next-auth";

import AddContactButton from "../Buttons/AddContactButton";
import ListCard from "./ListCard";
import { UserIF } from "@/interface";
import { useAppStore } from "@/store";
import Navbar from "./Navbar";

interface Props {
  session: Session;
  className?: string;
}

type Data = {
  users: UserIF[];
};

function SidebarUserSearchView({ session, className }: Props) {
  const { setUserSearchOpen, isShowUserSearchOpen, setCurrentChatRoom } =
    useAppStore();

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

    setUserSearchOpen(false);
  };

  return (
    <div
      className={`sidebarContainerView ${
        isShowUserSearchOpen ? "w-full md:w-100" : "w-0 overflow-hidden"
      }`}
    >
      <Navbar isSidebarNav isSidebarUserSearch />
      <div className="sidebarListView">
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
