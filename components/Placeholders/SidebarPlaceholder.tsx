"use client";
import { useAppStore } from "@/store";
import React from "react";
import Navbar from "../UI/Navbar";

export default function SidebarPlaceholder() {
  const { isSidebarOpen } = useAppStore();
  return (
    <aside
      className={`sidebar ${
        isSidebarOpen ? "w-full md:w-100" : "w-0 xl:w-100"
      }`}
    >
      <div className="sidebarContainerView">
        <Navbar isSidebarNav />
        <div className="sidebarListView">loading</div>
      </div>
    </aside>
  );
}
