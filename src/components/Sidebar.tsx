"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Button from "./Button";

import { useRouter } from "next/navigation";
import ChatIcon from "./icons/ChatIcon";
import ChevLeft from "./icons/ChevLeft";
import ChevRight from "./icons/ChevRight";
import LoginIcon from "./icons/LoginIcon";
import { app, auth, db } from "@/lib/firebase.ts";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import LogoutIcon from "./icons/LogoutIcon";
import useClickOff from "@/hooks/useClickOff";
import AnalysisIcon from "./icons/AnalysisIcon";
import UserIcon from "./icons/UserIcon";
import { query, collection, where, getDocs } from "firebase/firestore";

const provider = new GoogleAuthProvider();

function Sidebar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleOptions, setToggleOptions] = useState<boolean>(false);
  const router = useRouter();
  const barRef = useRef<HTMLDivElement>(null);
  const userOptionsRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const { state, signinWithGoogle, signOut } = useAuth();
  const [chats,setChats] = useState<Array<Chat>>([]);

  useClickOff([userOptionsRef, userButtonRef], () => setToggleOptions(false));

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

  useEffect(() => {
    if (!state?.user?.uid) return
    async function getChats() {
      const q = query(collection(db, "chatHistory"), where("userId", "==", state!.user!.uid));
      const querySnapshot = await getDocs(q);
      let history:Chat[] = []
      querySnapshot.forEach((doc:any) => {
        history.push({id:doc.id,...doc.data()})
      });
      console.log(history)
      setChats(history)
    }
    getChats()
  },[state])

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
          <h1 className="text-xl font-semibold text-center shadow-sm py-2">
            History
          </h1>
          <div className="flex flex-col space-y-2 overflow-scroll max-w-full pr-2">
            {
              chats?.map((chat:Chat,i:number) => (
                <Button
                  key={chat.id}
                  onClick={handleChatOpen(chat.id)}
                >
                  {chat.messages[0].content.slice(0, 20)}
                </Button>
              ))
            }
          </div>
        </div>
        <hr className="border-[#454545]" />
        <div className="relative">
          {state.user ? (
            <>
              <div
                ref={userOptionsRef}
                className={
                  "absolute bottom-[calc(100%+2px)] p-2 w-full bg-[#2f2f2f] rounded-md " +
                  (toggleOptions ? " transition ease-in duration-300" : "hidden")
                }
              >
               
                <Button icon={<AnalysisIcon/>} onClick={() => router.push("/analysis")}>Analysis</Button>
                <Button icon={<LogoutIcon />} onClick={signOut}>
                  Logout
                </Button>
              </div>
              <Button ref={userButtonRef} icon={<UserIcon/>} onClick={()=>setToggleOptions((prev) => !prev)}>
                {state.user.displayName?.split(" ")[0]}
              </Button>
            </>
          ) : (
            <Button icon={<LoginIcon />} onClick={signinWithGoogle}>
              Login
            </Button>
          )}
        </div>
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
