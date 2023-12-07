// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "@/../firebase.config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig2 = {

    apiKey: process.env.FIREBASE_API_KEY,
  
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  
    projectId: process.env.FIREBASE_PROJECT_ID,
  
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  
    appId: process.env.FIREBASE_APP_ID,

};


const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!)

// Initialize Firebase
export const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);