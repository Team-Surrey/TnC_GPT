"use client"
import Chat from '@/components/Chat'
import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import React from "react";

function Page({params}:{params: {id: string}}) {
  const {id} = params  
  return (
    <Chat chatId={id}/>
  )
}


export default Page