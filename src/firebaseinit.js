import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "bloggingapp-b801e",
  storageBucket: "bloggingapp-b801e.firebasestorage.app",
  messagingSenderId: "936814642142",
  appId: "1:936814642142:web:5a82dceaac34ae730c934f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
