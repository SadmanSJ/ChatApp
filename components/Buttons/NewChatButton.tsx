import React, { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi2";

export default function NewChatButton() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className="absolute bottom-6 right-6 group"
      onBlur={() => setShowMenu(false)}
    >
      <button
        onClick={() => setShowMenu(!showMenu)}
        // onFocus={() => setShowMenu(true)}
        title="New Chat"
        type="button"
        className="w-14 flex items-center justify-center aspect-square rounded-full bg-purple-600"
      >
        <BiSolidPencil size={26} />
      </button>
      <div
        className={`absolute bg-neutral-900 p-1 bottom-16 right-0 text-xs shadow-md flex flex-col w-44 rounded-lg transition-all duration-300 ${
          showMenu ? "translate-y-0" : "scale-0 translate-y-20 translate-x-14"
        }`}
      >
        <button
          onClick={() => console.log("New group")}
          className="flex items-center space-x-3 p-2 justify-start hover:bg-neutral-800 rounded-md cursor-pointer transition-colors duration-300"
        >
          <HiOutlineUsers size={20} />
          <div>New Group</div>
        </button>
        <button
          onClick={() => console.log("New group")}
          className="flex items-center space-x-3 p-2 justify-start hover:bg-neutral-800 rounded-md cursor-pointer transition-colors duration-300"
        >
          <HiOutlineUser size={20} />
          <div>New Private Chat</div>
        </button>
      </div>
    </div>
  );
}
