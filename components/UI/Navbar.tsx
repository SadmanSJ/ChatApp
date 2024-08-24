import React from "react";
import ThemeChangeButton from "../Buttons/ThemeChangeButton";

import LogoutButton from "../Buttons/LogoutButton";

import NavbarBackButton from "../Buttons/NavbarBackButton";
import NavbarChatRoomTitle from "./NavbarChatRoomTitle";

function Navbar() {
  return (
    <div className="h-16 px-4 sticky top-0 w-full z-30 shadow-lg bg-slate-400  dark:bg-neutral-800">
      <div className="w-full h-full flex items-center justify-between">
        <NavbarBackButton />
        <NavbarChatRoomTitle />
        <div className="flex items-center justify-center">
          <ThemeChangeButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
