import Navbar from "@/components/UI/Navbar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="w-full h-full bg-neutral-900">
      <Navbar />
      {children}
    </div>
  );
}
