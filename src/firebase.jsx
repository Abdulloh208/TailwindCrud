import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBuUXsABHMec6iyYWwsDNERyYqqGuxQeQs",
  authDomain: "first-project-121c4.firebaseapp.com",
  projectId: "first-project-121c4",
  storageBucket: "first-project-121c4.appspot.com",
  messagingSenderId: "511082843710",
  appId: "1:511082843710:web:e2e2dcf3cd610a26110b6f",
  measurementId: "G-25Z3ZR7TYE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)