"use client";
import { ChatRoomIF } from "@/interface";
import { gql, useSuspenseQuery } from "@apollo/client";
import React from "react";
import ChatRoomTable from "./ChatRoomTable";
import Link from "next/link";
import { useAppStore } from "@/store";

type Data = { chatRooms: ChatRoomIF[] };

export default function AllChatRoomContainer() {
  const { setCurrentChatRoomID } = useAppStore();
  const { data, error } = useSuspenseQuery<Data>(GetAllChatRooms);
  if (error) {
    return <div>{error.message}</div>;
  }

  //   console.log(data);
  return (
    <div>
      {/* <ChatRoomTable chatData={data.chatRooms} /> */}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.chatRooms.map((m, i) => (
            <tr key={i}>
              <td>{m.title}</td>
              <td>{m.status}</td>
              <td onClick={() => setCurrentChatRoomID(m._id)}>
                <Link href={`/chat/${m._id}`}>Go to Chat</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const GetAllChatRooms = gql`
  query ChatRooms {
    chatRooms {
      _id
      status
      title
    }
  }
`;
