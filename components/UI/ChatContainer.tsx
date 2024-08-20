"use client";
import React, { Suspense } from "react";
import ChatBox from "./ChatBox";
import InputBox from "./InputBox";
import { useAppStore } from "@/store";
import { useSession } from "next-auth/react";

export default function ChatContainer() {
  const { currentChatRoomID } = useAppStore();
  const { data: session } = useSession();

  return (
    <div className="w-full h-full flex flex-grow flex-col items-center justify-between">
      {currentChatRoomID !== null ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              Loading chat
            </div>
          }
        >
          {/* <ChatBox currentChatRoomID={currentChatRoomID} session={session} /> */}
        </Suspense>
      ) : (
        <div className="flex items-center justify-center m-auto">
          Start Typing
        </div>
      )}
      <Suspense>
        {/* <InputBox currentChatRoomID={currentChatRoomID} session={session} /> */}
      </Suspense>
    </div>
  );
}
