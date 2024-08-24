"use client";
import { useAppStore } from "@/store";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function NavbarBackButton() {
  const { setShowSidebar, showSidebar } = useAppStore();
  return (
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
  );
}
