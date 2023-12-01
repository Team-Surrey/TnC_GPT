"use client";
import Message from "@/components/Message";
import { MessageAuthor } from "@/types/enums";
import { useRef, useState } from "react";
import { useQuery } from "react-query";

const useFocus = () => {
  const ref = useRef<HTMLDivElement>(null);
  const setFocus = () => {
    ref.current?.focus();
  };

  return [ref, setFocus];
};

const replies = [
  "As I see it, yes",
  "It is certain",
  "It is decidedly so",
  "Most likely",
  "Outlook good",
  "Signs point to yes",
  "Without a doubt",
  "Yes",
  "Yes - definitely",
  "You may rely on it",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
];

export default function Home() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatRef, setChatRefFocus] = useFocus();

  const [loading, setLoading] = useState<boolean>(false);
  const handleMessage = (e: any) => {
    e.preventDefault();
    if (!inputRef?.current?.value) return;
    const message: Message = {
      author: MessageAuthor.user,
      content: inputRef?.current.value,
    };
    setMessages((prev) => [...prev, message]);
    inputRef.current.value = "";
    return setTimeout(handleResponse, 100);
  };
  const handleResponse = async () => {
    setLoading(true);
    const res = await fetch("127.0.0.1:8000/conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        human_input: inputRef?.current?.value,
      }),
    });

    const response: Message = {
      author: MessageAuthor.bot,
      content: replies[Math.floor(Math.random() * replies.length)],
    };
    setMessages((prev) => [...prev, response]);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col justify-between p-10 w-full">
      <div>
        <h1 className="text-4xl font-semibold text-stone-600">TnC Gpt</h1>
      </div>
      <div className="grow space-y-2 py-5">
        {messages.map((message, i) => (
          <Message key={i} message={message} />
        ))}
        {loading && (
          <Message
            message={{ author: MessageAuthor.bot, content: "" }}
            loading
          />
        )}
      </div>
      <div
        ref={chatRef}
        className="flex flex-row focus-within:outline focus-within::outline-offset-2 focus-within:outline-stone-200 bg-stone-600 rounded-lg p-2 px-4 shadow-md opacity-90"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleMessage(e);
          }
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="What do you desire to know?"
          className="bg-inherit h-auto w-full focus:outline-none text-stone-200"
          onFocus={(e) => {
            e.preventDefault;
          }}
        />
        <button
          className="bg-inherit text-white rounded-lg"
          onClick={handleMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
