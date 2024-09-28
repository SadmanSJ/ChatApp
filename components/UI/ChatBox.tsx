"use client";
import { ChatIF, ChatRoomIF, UserIF } from "@/interface";
import { useAppStore } from "@/store";
import { gql, useSuspenseQuery } from "@apollo/client";
import { Session } from "next-auth";
import React, { useEffect, useRef } from "react";
import { tv } from "tailwind-variants";

type Data = {
  // chatRoom: ChatRoomIF;
  chats: ChatIF[];
};

interface Props {
  selectedUser?: UserIF | null;
  currentChatRoom: ChatRoomIF;
  session: Session | null;
}

export default function ChatBox({
  currentChatRoom,
  selectedUser,
  session,
}: Props) {
  //   const { currentChatRoomID } = useAppStore();
  const { data, error, subscribeToMore } = useSuspenseQuery<Data>(GetChats, {
    variables: { filter: { chatRoomID: currentChatRoom._id }, limit: 100 },
  });

  // const { data, error, subscribeToMore } = useSuspenseQuery<Data>(GetChatRoom, {
  //   variables: {
  //     filter: {
  //       _id: currentChatRoom?._id,
  //     },
  //   },
  // });

  useEffect(() => {
    subscribeToMore<{ addNewChat: ChatIF }>({
      document: GetChatSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        const { addNewChat } = subscriptionData.data;
        // const chats = Object.assign({}, prev, { ...newChat });
        console.log("subs", addNewChat);
        console.log("prev", prev.chats);

        const data = Object.assign({}, prev, {
          chats: [...prev.chats, addNewChat],
        });
        // if(prev.chats.find(f=>f.))
        // let chats = [...prev.chats, addNewChat];
        console.log(data);
        return data;
      },
    });
  }, [subscribeToMore]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data.chats) {
    return <div>You have no chat</div>;
  }

  const chatBoxColor = tv({
    slots: {
      container:
        "flex flex-grow flex-col w-full h-full justify-end space-y-4 p-5",
      thread: "bg-neutral-700 max-w-[600px] w-fit p-4 rounded-xl  shadow-md",
    },
    variants: {
      own: {
        true: { thread: "bg-indigo-600 ml-auto" },
      },
    },
  });

  return (
    <div
      // className="flex flex-grow flex-col w-full h-full justify-end space-y-4 p-5"
      className={chatBoxColor().container()}
    >
      {data.chats.map((m, i) => (
        <div
          key={i}
          className={chatBoxColor().thread({
            own: session?.user.id === m.sentByUser._id ? true : false,
          })}
        >
          <div>{m.message.text}</div>
        </div>
      ))}
    </div>
  );
}

const GetChatRoom = gql`
  query ChatRoom($filter: ChatRoomFilter) {
    chatRoom(filter: $filter) {
      _id
      chats {
        sentByUser {
          _id
          name
        }
        message {
          text
          attachment
        }
        isUnsent
        createdAt
        _id
      }
      participants {
        _id
      }
      title
    }
  }
`;

const GetChats = gql`
  query Chats($filter: ChatFilter, $limit: Int) {
    chats(filter: $filter, limit: $limit) {
      _id
      message {
        text
        attachment
      }
      sentByUser {
        _id
        name
      }
      createdAt
    }
  }
`;

const GetChatSubscription = gql`
  subscription AddNewChat {
    addNewChat {
      _id
      message {
        text
        attachment
      }
      sentByUser {
        _id
        name
      }
      createdAt
    }
  }
`;
