import ChatContainer from "@/components/UI/ChatContainer";
import React from "react";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col flex-grow justify-between overflow-auto">
      <ChatContainer />
    </div>
  );
}
