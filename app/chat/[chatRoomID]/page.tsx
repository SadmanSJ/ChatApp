import ChatBox from "@/components/UI/ChatBox";
import InputBox from "@/components/UI/InputBox";
import { authOption } from "@/lib/authOptions";
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

interface Props {
  params: { chatRoomID: string };
}

async function ChatReplay({ params }: Props) {
  const session = await getServerSession(authOption);

  const { data } = await getClient().query({
    query: GetChatRoom,
    variables: {
      filter: {
        _id: params.chatRoomID,
      },
    },
    fetchPolicy: "no-cache",
  });

  return (
    <div>
      <h1>Admin Chat</h1>
      <Suspense>
        <ChatBox currentChatRoom={data.chatRoom} session={session} />
      </Suspense>
      <Suspense>
        <InputBox currentChatRoom={data.chatRoom} session={session} />
      </Suspense>
    </div>
  );
}

export default ChatReplay;

const GetChatRoom = gql`
  query ChatRoom {
    chatRoom {
      _id
      type
      title
    }
  }
`;
