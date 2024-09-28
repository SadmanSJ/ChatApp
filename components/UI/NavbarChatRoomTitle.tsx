"use client";

import { useAppStore } from "@/store";
import { useSession } from "next-auth/react";
import React from "react";

export default function NavbarChatRoomTitle() {
  const { selectedUser: user, currentChatRoom: chatRoom } = useAppStore();
  const { data: session } = useSession();
  if (!session) return;

  if (!user && !chatRoom) return;
  let title = "";

  chatRoom?.participants
    .filter((f) => f._id !== session?.user.id)
    .map((m, i) => {
      title = title.concat(m.name || "");
      if (i < chatRoom.participants.length - 2) title.concat(", ");
    });

  return (
    <div
      className="w-full flex items-center space-x-6 p-3 transition-all duration-300 rounded-xl"
      onClick={() => console.log("Title clicked")}
    >
      <div className="w-12 bg-blue-800 aspect-square rounded-full"></div>
      <div className="h-full">
        {user ? (
          <div>{user.name || user.mobile || user.email}</div>
        ) : (
          <div>{title}</div>
        )}
        <div className="text-sm text-neutral-500">last seen recently</div>
      </div>
    </div>
  );
}
