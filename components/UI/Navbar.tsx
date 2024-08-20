"use client";
import Image from "next/image";
import React from "react";
import ThemeChangeButton from "../Buttons/ThemeChangeButton";
import Link from "next/link";
import LogoutButton from "../Buttons/LogoutButton";
import { useAppStore } from "@/store";
import { FaArrowLeft } from "react-icons/fa";

function Navbar() {
  const { setShowSidebar, showSidebar } = useAppStore();
  return (
    <div className="h-16 px-4 sticky top-0 w-full z-30 shadow-lg bg-slate-400  dark:bg-neutral-800">
      <div className="w-full h-full flex items-center justify-between">
        <div className="h-full">
          <button
            className="h-full lg:hidden aspect-square flex items-center justify-center"
            title="Back"
            type="button"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FaArrowLeft className="icon" size={20} />
          </button>
        </div>
        {/* <Link href={"/"} className="h-16 container mx-auto transition-all">
          <Image
            className="h-full"
            style={{ width: "auto" }}
            src={"/shwapno.jpg"}
            alt="Logo"
            width={387}
            height={140}
          />
        </Link> */}
        <div className="flex items-center justify-center">
          <ThemeChangeButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
