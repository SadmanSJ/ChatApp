"use client";
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { useAppStore } from "@/store";
import Sidebar from "./Sidebar";
import { Session } from "next-auth";

interface Props {
  children: ReactNode;
  session: Session;
}

export default function MainView({ children, session }: Props) {
  const { showSidebar, setShowSidebar } = useAppStore();

  return (
    <div className="relative flex w-full">
      <Sidebar session={session} />
      <div
        className={`fixed inset-0 flex flex-col w-full lg:w-auto transition-all duration-300${
          showSidebar
            ? "ml-[100%] sm:ml-[420px] w-[80vw]"
            : "ml-0 lg:ml-[420px] w-screen "
        }`}
      >
        <Navbar />
        {children}
      </div>
      {/* <div
        className={`fixed top-0 bottom-0 flex-1 lg:w-auto transition-all duration-300 ${
          showSidebar
            ? "ml-[100%] sm:ml-[420px] w-[80vw]"
            : "ml-0 lg:ml-[420px] w-screen "
        }`}
      >
        <Navbar />
        {children}
      </div> */}
    </div>
  );
}
