"use client"
import Chat from '@/components/Chat'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';



function Page({params}:{params: {id: string}}) {
  const {id} = params  
  return (
    <Chat chatId={id}/>
  )
}

export default Page