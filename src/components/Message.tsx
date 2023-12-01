import { MessageAuthor } from "@/types/enums";
import React from "react";
import SlowResponse from "./SlowResponse";

interface Props {
  message: Message;
  loading?: boolean;
}

export default function Message({ message, loading }: Props) {
  return (
    <div
      className={
        "flex flex-row justify-start p-2 space-x-2 rounded-lg " +
        (message.author == MessageAuthor.user
          ? "bg-black bg-opacity-20"
          : "")
      }
    >
      <h1 className="bg-black bg-opacity-30 text-xl rounded-lg p-1">
        {message.author == MessageAuthor.user ? "🧒" : "🤖"}
      </h1>
      <p className="m-auto text-stone-800">
        {loading ? (
          <span className="animate-pulse">Thinking...</span>
        ) : message.author == MessageAuthor.user ? (
          message.content
        ) : (
          <SlowResponse speed={100} text={message.content} />
        )}
      </p>
    </div>
  );
}
