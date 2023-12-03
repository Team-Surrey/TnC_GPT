"use client"
import Chat from '@/components/Chat'
import React, { useEffect, useState } from 'react'
import { history } from '@/lib/db.ts'


function Page({params}:{params: {id: string}}) {
  const {id} = params
  const [messages, setMessages] = useState<Array<Message>>([]);
  useEffect(() => {
    console.log(id)
    if (id) {
      const chat = history.filter((chat:any) => chat.id == id)
      console.log(chat)
      setMessages(chat[0]?.history!)
    }
  }, [id])    
  return (
    <Chat messageHistory={messages}/>
  )
}

export default Page