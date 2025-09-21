// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDvGH8wVg4w5ofmau2__XEJsu0ECdEqHdA",
  authDomain: "aktubrand.firebaseapp.com",
  projectId: "aktubrand",
  storageBucket: "aktubrand.firebasestorage.app", // Matches your project ID
  messagingSenderId: "490999964542",
  appId: "1:490999964542:web:3be22c6b9eae78558a892f",
  measurementId: "G-9MDKPZJGYW"
};

const app = initializeApp(firebaseConfig);
const messaging = typeof window !== "undefined" ? getMessaging(app) : null; // Correctly handles SSR

export { messaging, getToken, onMessage };