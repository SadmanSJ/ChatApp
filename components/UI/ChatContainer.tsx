"use client";
import React, { Suspense } from "react";
import ChatBox from "./ChatBox";
import InputBox from "./InputBox";
import { useAppStore } from "@/store";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { ChatRoomIF } from "@/interface";

interface Props {
  currentChatRoom: ChatRoomIF;
  session: Session;
}

export default function ChatContainer({ currentChatRoom, session }: Props) {
  // const { selectedUser, currentChatRoom } = useAppStore();
  // const { data: session } = useSession();

  return (
    <div className="max-w-[600px] mx-auto w-full h-full flex flex-col justify-between">
      {currentChatRoom ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              Loading chat
            </div>
          }
        >
          <ChatBox currentChatRoom={currentChatRoom} session={session} />
        </Suspense>
      ) : (
        <div className="flex items-center justify-center m-auto">Its Empty</div>
      )}
      {currentChatRoom && (
        <Suspense>
          <InputBox currentChatRoom={currentChatRoom} session={session} />
        </Suspense>
      )}
    </div>
  );
}
