import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAj5PrXqWMiNH31Zn70500B-ycu0Jhr3wE",
  authDomain: "tailwindcrud.firebaseapp.com",
  projectId: "tailwindcrud",
  storageBucket: "tailwindcrud.appspot.com",
  messagingSenderId: "1750191658",
  appId: "1:1750191658:web:3f3c0574119b2962d97d53",
  measurementId: "G-3Z5MF6VFEP"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)