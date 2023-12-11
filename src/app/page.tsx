"use client";
import Message from "@/components/Message";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { MessageAuthor } from "@/types/enums";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import SendIcon from "@/components/icons/SendIcon";
import useFocus from "@/hooks/useFocus";
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

enum ModeEnum {
  standard = "standard",
  summary = "summarise",
}

export default function Page() {
  const params = useSearchParams();
  const id = params.get("id");
  const [chatId, setChatId] = useState<string|null>(id);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatRef, setChatRefFocus] = useFocus();
  const { state } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<ModeEnum>(ModeEnum.standard);
  const router = useRouter();
  const path = usePathname();

  const handleMessage = async (e: any) => {
    let newChatId: string | undefined = undefined;
    e.preventDefault();
    if (!inputRef?.current?.value) return;
    // create new message
    const message: Message = {
      author: MessageAuthor.user,
      content: inputRef?.current.value,
      timestamp: new Date(),
    };
    // check for id

    if (chatId) {
      await updateDoc(doc(db, "chatHistory", chatId), {
        messages: arrayUnion(message),
      });
    } else {
      // no id, create new doc with message
      await addDoc(collection(db, "chatHistory"), {
        messages: [message],
        userId: state.user?.uid,
      }).then((res) => {
        newChatId = res.id
      });
    }
    setMessages((prev) => [...prev, message]);
    inputRef.current.value = "";


    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_MODEL_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: {
          text: message.content,
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    const response: Message = {
      author: MessageAuthor.bot,
      content: res
        ? res.output.content
        : "Sorry, There appears to be an issue with the server. Please try again later.",
      timestamp: new Date(),
    };

    await updateDoc(doc(db, "chatHistory", newChatId ? newChatId : chatId as string), {
      messages: arrayUnion(response),
    });

    response.slow = true;

    setMessages((prev) => [...prev, response]);
    setLoading(false);
    if (newChatId) {
      setChatId(newChatId);
      router.push(`/?id=${newChatId}`);
    }
  };

  useEffect(() => {
    async function getDataOrCreate() {
      if (!chatId) return;
      const docRef = doc(db, "chatHistory", chatId);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMessages(docSnap.data()?.messages);
      }
    }
    getDataOrCreate();
  }, [chatId, router]);

  useEffect(() => {
    console.log(chatId)
    if (!params.get("id")) {
      setMessages([]);
      setChatId(null)
    }
    if (params.get("id")) setChatId(id)
  }, [ params ]);

  return (
    <div className="h-full flex flex-col justify-between p-10 pt-5 max-w-full overflow-hidden">
      <div className="flex flex-row rounded-lg w-fit text-sm mb-5  font-semibold">
        <button
          className={
            "p-2 h-full rounded-l-md" +
            (mode == ModeEnum.standard
              ? " transition ease-in duration-250 bg-[#0085FF] text-white "
              : " transition ease-out duration-250 shadow-inner")
          }
          onClick={() => setMode(ModeEnum.standard)}
        >
          Standard
        </button>
        <button
          className={
            "p-2 h-full rounded-r-md" +
            (mode == ModeEnum.summary
              ? " transition ease-in duration-250 bg-[#0085FF] text-white "
              : " transition ease-out duration-250 shadow-inner")
          }
          onClick={() => setMode(ModeEnum.summary)}
        >
          Summarise
        </button>
      </div>
      <div>
        <h1 className="text-4xl font-semibold">Term Aware Guard</h1>
      </div>
      <div className="grow space-y-2 py-5 h-0 overflow-scroll scroll-smooth max-w-full ">
        {messages.map((message, i) => (
          <Message key={i} message={message} slow={message.slow} />
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
        className="flex flex-row focus-within:outline focus-within:outline-[0.5px] focus-within::outline-offset-3 focus-within:outline-[#9e9e9e] bg-theme-secondary rounded-lg shadow-md opacity-90 overflow-hidden"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleMessage(e);
          }
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={
            mode == ModeEnum.standard
              ? "What do you desire to know?"
              : "Enter link of the Terms and condions"
          }
          className="bg-inherit h-auto w-full focus:outline-none  py-2 px-4"
          onFocus={(e) => {
            e.preventDefault;
          }}
        />
        <button
          className="bg-[#0085FF] text-white rounded-lg rounded-l-none px-3"
          onClick={handleMessage}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
