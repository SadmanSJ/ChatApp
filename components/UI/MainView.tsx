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
        className={`fixed inset-x-0 flex-1 transition-all duration-300 ${
          showSidebar ? "ml-[100%] sm:ml-[420px]" : "ml-0 lg:ml-[420px]"
        }`}
      >
        <Navbar />
        {children}
      </div>
    </div>
  );
}
