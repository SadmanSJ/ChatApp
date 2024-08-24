import { ChatRoomIF, UserIF } from "@/interface";
import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  type: "user" | "chat";
  user?: UserIF;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  chatRoom?: ChatRoomIF;
}

export default function ListCard({ type, user, onClick, chatRoom }: Props) {
  const { data: session } = useSession();
  if (!session) return;

  let title = "";

  chatRoom?.participants
    .filter((f) => f._id !== session?.user._id)
    .map((m, i) => {
      title = title.concat(m.name || "");
      if (i < chatRoom.participants.length - 2) title.concat(", ");
    });

  return (
    <div
      className="w-full flex items-center space-x-6 hover:bg-neutral-700 p-3 transition-all duration-300 rounded-xl"
      onClick={onClick}
    >
      <div className="w-14 bg-blue-800 aspect-square rounded-full"></div>
      <div className="h-full">
        {user ? (
          <div>{user.name || user.mobile || user.email}</div>
        ) : (
          <div>{title}</div>
        )}

        {user && (
          <div className="text-sm text-neutral-500">last seen recently</div>
        )}
      </div>
    </div>
  );
}
