"use client";
import React, { Suspense } from "react";

import { useAppStore } from "@/store";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { ChatRoomIF } from "@/interface";
import InputBox from "../UI/InputBox";
import InputBoxPlaceholder from "./InputBoxPlaceholder";

export default function ChatContainerPlaceholder() {
  // const { selectedUser, currentChatRoom } = useAppStore();
  // const { data: session } = useSession();

  return (
    <div className="max-w-[600px] mx-auto w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-center m-auto">Its Empty</div>
      <InputBoxPlaceholder />
    </div>
  );
}
