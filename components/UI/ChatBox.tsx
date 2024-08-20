"use client";
import { ChatIF, ChatRoomIF } from "@/interface";
import { useAppStore } from "@/store";
import { gql, useSuspenseQuery } from "@apollo/client";
import { Session } from "next-auth";
import React, { useEffect, useRef } from "react";

type Data = {
  chats: ChatIF[];
};

interface Props {
  currentChatRoomID: string | null;
  session: Session | null;
}

export default function ChatBox({ currentChatRoomID, session }: Props) {
  //   const { currentChatRoomID } = useAppStore();
  const { data, error, subscribeToMore } = useSuspenseQuery<Data>(GetChats, {
    variables: { filter: { chatRoomID: currentChatRoomID }, limit: 100 },
  });

  useEffect(() => {
    subscribeToMore({
      document: GetChatSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        const newChat = subscriptionData.data;
        // const chats = Object.assign({}, prev, { ...newChat });
        console.log(newChat);
        return prev;
      },
    });
  }, [subscribeToMore]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-grow flex-col w-full h-full justify-end space-y-4 p-5">
      {data.chats.map((m, i) => (
        <div
          key={i}
          className={`bg-orange-200 dark:bg-orange-700 max-w-[600px] w-fit p-4 rounded-xl  shadow-md ${
            session?.user._id === m.sentByUser._id
              ? "ml-auto bg-orange-200 dark:bg-orange-700"
              : "mr-auto bg-blue-200 dark:bg-blue-700"
          }`}
        >
          <div>{m.message}</div>
        </div>
      ))}
    </div>
  );
}

const GetChats = gql`
  query Chats($filter: ChatFilter, $limit: Int) {
    chats(filter: $filter, limit: $limit) {
      _id
      message
      sentByUser {
        _id
      }
      createdAt
    }
  }
`;

const GetChatSubscription = gql`
  subscription Subscription {
    addNewChat {
      _id
      message
      sentByUser {
        _id
      }
      createdAt
    }
  }
`;
