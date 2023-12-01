import React from "react";
import Button from "./Button";

const history = [
  {
    id: 1,
    title: "Chat 1",
  },
  {
    id: 2,
    title: "Chat 2",
  },
  {
    id: 3,
    title: "Chat 3",
  },
  {
    id: 4,
    title: "Chat 4",
  },
  {
    id: 5,
    title: "Chat 5",
  },
  {
    id: 6,
    title: "Chat 6",
  },
  {
    id: 7,
    title: "Chat 7",
  },
  {
    id: 8,
    title: "Chat 8",
  },
  {
    id: 9,
    title: "Chat 9",
  },
  {
    id: 10,
    title: "Chat 10",
  },
  {
    id: 11,
    title: "Chat 11",
  },
  {
    id: 12,
    title: "Chat 12",
  },
  {
    id: 13,
    title: "Chat 13",
  },
  {
    id: 14,
    title: "Chat 14",
  },
  {
    id: 15,
    title: "Chat 15",
  },
  {
    id: 16,
    title: "Chat 16",
  },
  {
    id: 17,
    title: "Chat 17",
  },
  {
    id: 18,
    title: "Chat 18",
  },
  {
    id: 19,
    title: "Chat 19",
  },
  {
    id: 20,
    title: "Chat 20",
  },
  {
    id: 21,
    title: "Chat 21",
  },
  {
    id: 22,
    title: "Chat 22",
  },
  {
    id: 23,
    title: "Chat 23",
  },
  {
    id: 24,
    title: "Chat 24",
  },
  {
    id: 25,
    title: "Chat 25",
  },
  {
    id: 26,
    title: "Chat 26",
  },
  {
    id: 27,
    title: "Chat 27",
  },
  {
    id: 28,
    title: "Chat 28",
  },
  {
    id: 29,
    title: "Chat 29",
  },
];

function Sidebar() {
  return (
    <div className="w-[200px]  h-[100dvh] bg-stone-600 shadow-md p-2 px-4 flex flex-col space-y-2">
      <Button>New Chat</Button>
      <hr/>
      <div className="grow h-max-full h-0 flex flex-col overflow-hidden">
        <h1 className="text-xl font-semibold">Chats</h1>
        <div className="flex flex-col space-y-2 overflow-scroll max-w-full">
          {history.map((chat) => (
            <Button key={chat.id}>{chat.title}</Button>
          ))}
        </div>
      </div>
      <hr/>
      <Button>Login</Button>
    </div>
  );
}

export default Sidebar;
