// import { initializeApp } from "firebase/app";
// import 'firebase/storage';

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBmH8IzcIj73i-39YmTKgUrm8vTYnXIsRA",
  authDomain: "woven-benefit-365108.firebaseapp.com",
  projectId: "woven-benefit-365108",
  storageBucket: "woven-benefit-365108.appspot.com",
  messagingSenderId: "747209212784",
  appId: "1:747209212784:web:3e565a2358a6089d2705b5",
  measurementId: "G-RKZY6PHN7H"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);
