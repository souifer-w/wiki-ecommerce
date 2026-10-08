import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDICr1wWqQC7IN7UPPu6ACwJuefTooE_PM",
  authDomain: "wiki-store-cd700.firebaseapp.com",
  projectId: "wiki-store-cd700",
  storageBucket: "wiki-store-cd700.firebasestorage.app",
  messagingSenderId: "527073249089",
  appId: "1:527073249089:web:08bb5ae10c71c96c9a03c0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
