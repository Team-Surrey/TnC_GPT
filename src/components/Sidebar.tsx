"use client";
import React, { useEffect, useRef } from "react";
import Button from "./Button";
import { history } from "@/lib/db.ts";
import { useRouter } from "next/navigation";
import ChatIcon from "./icons/ChatIcon";
import ChevLeft from "./icons/ChevLeft";
import ChevRight from "./icons/ChevRight";
import LoginIcon from "./icons/LoginIcon";

function Sidebar() {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const router = useRouter();
  const barRef = useRef<HTMLDivElement>(null);
  const handleChatOpen = (id: string) => {
    return () => {
      router.push(`/chat/${id}`);
    };
  };
  useEffect(() => {
    const handleResize = () => {
      if (toggle) {
        // change width of side bar using barRef to 0
        barRef.current!.style.width = "0px";
      } else {
        // change width to fit content
        barRef.current!.style.width = "200px";
      }
    };
    setTimeout(handleResize, toggle ? 500 : 0);
  }, [toggle]);
  return (
    <div
      className={
        "relative text-[#9E9E9E] max-w-fit h-[100dvh] bg-inherit border-r-[1px] border-r-[#454545] border-solid " +
        (toggle
          ? "transition ease-in-out delay-100 duration-400 -translate-x-[100%] "
          : "transition ease-in-out delay-100 duration-400 translate-x-0")
      }
    >
      <div
        ref={barRef}
        className={
          "flex flex-col space-y-2 h-full w-[200px] py-2 px-4 overflow-hidden"
        }
      >
        <Button onClick={() => router.push("/")} icon={<ChatIcon />}>
          New Chat
        </Button>
        <hr className="border-[#454545]" />
        <div className="grow h-max-full h-0 flex flex-col overflow-hidden">
          <h1 className="text-xl font-semibold text-center shadow-sm py-2">History</h1>
          <div className="flex flex-col space-y-2 overflow-scroll max-w-full pr-2">
            {history.map((chat: any) => (
              <Button key={chat.id} onClick={handleChatOpen(chat.id)}>
                {chat.title}
              </Button>
            ))}
          </div>
        </div>
        <hr className="border-[#454545]" />
        <Button icon={<LoginIcon/>}>Login</Button>
      </div>

      <button
        onClick={(e) => setToggle((prev) => !prev)}
        className="absolute left-[100%] top-0 h-full px-2 hover:bg-black hover:bg-opacity-20 opacity-60 hover:transition ease-in-out duration-250 hover:opacity-100 transition hover:animate-pulse"
      >
        {toggle ? <ChevRight /> : <ChevLeft />}
      </button>
    </div>
  );
}

export default Sidebar;
