"use client";
import { useAppStore } from "@/store";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import { MdSend, MdScheduleSend } from "react-icons/md";
import SubmitButton from "../Buttons/SubmitButton";
import { Session } from "next-auth";

interface Props {
  currentChatRoomID: string | null;
  session: Session | null;
}

export default function InputBox({ currentChatRoomID, session }: Props) {
  const { setCurrentChatRoomID } = useAppStore();

  const formRef = useRef<any>(null);

  const [addChat] = useMutation(CreateChat);

  const sendChat = (data: FormData) => {
    const message = data.get("message");

    addChat({
      variables: {
        record: {
          chatRoomID: currentChatRoomID,
          message: message,
          sentByUserID: session?.user._id,
        },
      },
      onError(error, clientOptions) {
        console.log(error);
      },
      onCompleted(data, clientOptions) {
        console.log(data);
        setCurrentChatRoomID(data.addChat.chatRoom._id);
        formRef.current.reset();
      },
      refetchQueries: "active",
    });
  };

  return (
    <div className="sticky bottom-0 w-full flex items-center justify-center pb-8 bg-slate-100 dark:bg-slate-950">
      <div className="bg-gray-200 shadow-inner dark:bg-gray-800 max-w-[800px] w-full p-4 rounded-2xl mx-4">
        <form
          ref={formRef}
          action={sendChat}
          className="flex items-end space-x-2"
        >
          <textarea
            className="w-full min-h-14 resize-none focus:outline-none bg-transparent"
            name="message"
            id="message"
            placeholder="Type here"
          ></textarea>
          <SubmitButton
            className="flex items-center"
            type="submit"
            LoadingIcon={<MdScheduleSend size={26} />}
          >
            <MdSend size={26} />
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

const CreateChat = gql`
  mutation AddChat($record: ChatInput) {
    addChat(record: $record) {
      _id
      message
      sentByUser {
        _id
      }
      chatRoom {
        _id
      }
    }
  }
`;
