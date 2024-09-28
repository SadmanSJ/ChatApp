"use client";
import { useAppStore } from "@/store";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import { MdSend, MdScheduleSend } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import SubmitButton from "../Buttons/SubmitButton";
import { Session } from "next-auth";

import { ChatRoomIF } from "@/interface";

interface Props {
  currentChatRoom: ChatRoomIF | null;
  session: Session | null;
}

export default function InputBox({ currentChatRoom, session }: Props) {
  const { setCurrentChatRoom } = useAppStore();

  const formRef = useRef<any>(null);

  const [addChat] = useMutation(CreateChat);

  const sendChat = (data: FormData) => {
    const text = data.get("message");
    const message = { text };

    addChat({
      variables: {
        record: {
          chatRoomID: currentChatRoom?._id,
          message: message,
          sentByUserID: session?.user.id,
        },
      },
      onError(error, clientOptions) {
        console.log(error);
      },
      onCompleted(data, clientOptions) {
        console.log(data);
        // setCurrentChatRoomID(data.addChat.chatRoom._id);
        formRef.current.reset();
      },
    });
  };

  return (
    <div className="sticky bottom-0 w-full flex items-center justify-center pb-8 bg-neutral-900">
      <form
        ref={formRef}
        action={sendChat}
        // className="flex items-end space-x-2"
        className="w-full flex space-x-3"
      >
        <div className="w-full bg-neutral-800 rounded-full flex items-center px-3">
          {/* <input
            type="text"
            name="message"
            id="message"
            placeholder="Message"
            className="bg-transparent w-full focus:outline-none"
          /> */}
          <textarea
            name="message"
            id="message"
            title="Message"
            placeholder="Message"
            rows={1}
            className="w-full bg-transparent min-h-6 focus:outline-none resize-none p-2"
          ></textarea>
          <button title="Attachment" type="button">
            <ImAttachment size={20} className="icon" />
          </button>
        </div>
        <button
          title="Send"
          className="flex flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 w-14 aspect-square"
          type="submit"
        >
          <MdSend className="shrink-0" size={26} />
        </button>
      </form>
    </div>
  );
}

const CreateChat = gql`
  mutation AddChat($record: ChatInput) {
    addChat(record: $record) {
      _id
      message {
        text
        attachment
      }
      sentByUser {
        _id
      }
      chatRoom {
        _id
      }
    }
  }
`;
