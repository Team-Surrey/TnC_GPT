import { MessageAuthor } from "@/types/enums";
import React from "react";
import SlowResponse from "./SlowResponse";

interface Props {
  message: Partial<Message>;
  loading?: boolean;
}

export default function Message({ message, loading }: Props) {
  return (
    <div
      className={
        "text-white flex flex-row justify-start p-2 space-x-2 rounded-lg w-[inherit] " +
        (message.author == MessageAuthor.user
          ? "bg-[#2D2D2D]"
          : "")
      }
    >
      <h1 className="bg-[#454545] text-xl rounded-lg p-1 h-fit">
        {message.author == MessageAuthor.user ? "🧒" : "🤖"}
      </h1>
      <p className="m-auto break-words overflow-hidden break-all">
        {loading ? (
          <span className="animate-pulse">Thinking...</span>
        ) : message.author == MessageAuthor.user ? (
          message.content
        ) : (
          <SlowResponse speed={100} text={message.content!} />
        )}
      </p>
    </div>
  );
}
