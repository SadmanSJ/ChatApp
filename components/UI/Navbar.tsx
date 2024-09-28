"use client";
import React, { useState } from "react";
import ThemeChangeButton from "../Buttons/ThemeChangeButton";

import LogoutButton from "../Buttons/LogoutButton";

import NavbarBackButton from "../Buttons/NavbarBackButton";
import NavbarChatRoomTitle from "./NavbarChatRoomTitle";
import { useAppStore } from "@/store";
import { tv } from "tailwind-variants";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "./SearchBar";
import { FaArrowLeft } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Menu from "./Menu";

interface Props {
  isSidebarNav?: boolean;
  isSidebarUserSearch?: boolean;
}

function Navbar({ isSidebarNav, isSidebarUserSearch }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const { setUserSearchOpen } = useAppStore();
  const navbarStyle = tv({
    base: "w-full sticky top-0 z-30 bg-neutral-800 h-14",
    slots: {
      body: "flex px-4 items-center h-full justify-between space-x-2",
    },
  });

  return (
    <div className={navbarStyle().base()}>
      {isSidebarNav ? (
        <div className={navbarStyle().body()}>
          <div className="h-full flex items-center">
            {isSidebarUserSearch ? (
              <FaArrowLeft
                onClick={() => setUserSearchOpen(false)}
                className="icon"
                size={20}
              />
            ) : (
              <GiHamburgerMenu
                className="icon"
                size={20}
                onClick={() => setShowMenu(!showMenu)}
              />
            )}
          </div>
          <SearchBar />
        </div>
      ) : (
        <div className={navbarStyle().body()}>
          <NavbarBackButton />
          <NavbarChatRoomTitle />
          <div className="flex items-center justify-center">
            {/* <ThemeChangeButton />
            <LogoutButton /> */}
            <div className="p-4 shrink-0">
              <FaEllipsisVertical className="icon" size={20} />
            </div>
          </div>
        </div>
      )}
      {showMenu && <Menu />}
    </div>
  );

  // return (
  //   <div className="h-16 px-4 sticky top-0 w-full z-30 shadow-lg bg-slate-400  dark:bg-neutral-800">
  //     <div className="w-full h-full flex items-center justify-between">
  //       <NavbarBackButton />
  //       <NavbarChatRoomTitle />
  //       <div className="flex items-center justify-center">
  //         <ThemeChangeButton />
  //         <LogoutButton />
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Navbar;
