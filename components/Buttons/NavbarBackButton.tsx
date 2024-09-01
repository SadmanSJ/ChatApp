"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function NavbarBackButton() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { setSidebarOpen, isSidebarOpen } = useAppStore();
  const router = useRouter();
  return (
    <div className="h-full">
      <button
        className="h-full xl:hidden aspect-square flex items-center justify-center"
        title="Back"
        type="button"
        onClick={() => {
          setSidebarOpen(!isSidebarOpen);
          if (isMobile) router.back();
        }}
      >
        <FaArrowLeft className="icon" size={20} />
      </button>
    </div>
  );
}
