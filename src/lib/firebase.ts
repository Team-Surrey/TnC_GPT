// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKgYIRJzKnEWC8d9BQoo4yTaWuxqGTx3M",
  authDomain: "test-f662a.firebaseapp.com",
  projectId: "test-f662a",
  storageBucket: "test-f662a.appspot.com",
  messagingSenderId: "497678146527",
  appId: "1:497678146527:web:3a0cbd4f6e914369cc026a",
  measurementId: "G-VKF6JQCV9Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);