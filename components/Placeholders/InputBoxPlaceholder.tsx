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

export default function InputBoxPlaceholder() {
  return (
    <div className="sticky bottom-0 w-full flex items-center justify-center pb-8 bg-neutral-900">
      <form className="w-full flex space-x-3">
        <div className="w-full bg-neutral-800 rounded-full flex items-center px-3">
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
