// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZJWVr1BXO9xSCYBUg78eN5ddjXFOJPhA",
  authDomain: "bloggingapp-b801e.firebaseapp.com",
  projectId: "bloggingapp-b801e",
  storageBucket: "bloggingapp-b801e.firebasestorage.app",
  messagingSenderId: "936814642142",
  appId: "1:936814642142:web:5a82dceaac34ae730c934f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
