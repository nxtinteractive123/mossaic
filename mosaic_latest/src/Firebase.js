// import { initializeApp } from "firebase/app";
// import 'firebase/storage';

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAL5YpfpgBX7VGGfuVLTA9VhYNZiPuLMRE",
  authDomain: "mosaic-a3974.firebaseapp.com",
  projectId: "mosaic-a3974",
  storageBucket: "mosaic-a3974.appspot.com",
  messagingSenderId: "926508018637",
  appId: "1:926508018637:web:304fd97774bb2078877284",
  measurementId: "G-7GLQ09QGW1"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);
