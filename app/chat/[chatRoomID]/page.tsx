import ChatContainerPlaceholder from "@/components/Placeholders/ChatContainerPlaceholder";
import ChatContainer from "@/components/UI/ChatContainer";
import { ChatRoomIF } from "@/interface";
import { authOption } from "@/lib/authOptions";
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

interface Props {
  params: { chatRoomID: string };
}

type Data = {
  chatRoomByID: ChatRoomIF;
};

async function ChatReplay({ params }: Props) {
  const session = await getServerSession(authOption);

  if (!session) return <div>No Session</div>;

  const { data } = await getClient().query<Data>({
    query: GetChatRoom,
    variables: {
      filter: {
        _id: params.chatRoomID,
      },
    },
    fetchPolicy: "no-cache",
  });

  if (!data.chatRoomByID) return <div>No Data Found</div>;

  return (
    <div className="h-full">
      <Suspense fallback={<ChatContainerPlaceholder />}>
        <ChatContainer currentChatRoom={data.chatRoomByID} session={session} />
      </Suspense>
    </div>
  );
}

export default ChatReplay;

const GetChatRoom = gql`
  query ChatRoom($filter: ChatRoomFilter) {
    chatRoomByID(filter: $filter) {
      _id
      title
      type
      participants {
        _id
      }
      createdAt
    }
  }
`;
