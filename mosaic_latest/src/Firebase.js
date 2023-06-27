// import { initializeApp } from "firebase/app";
// import 'firebase/storage';

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCm_cLKEPTa1zv8p7IrAmJ4jbZsJYDA8oA",
  authDomain: "mosaic1-d1227.firebaseapp.com",
  projectId: "mosaic1-d1227",
  storageBucket: "mosaic1-d1227.appspot.com",
  messagingSenderId: "153682397608",
  appId: "1:153682397608:web:4b8321dde8ea84da0cb59d",
  measurementId: "G-N3DJKE4LFR"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
export const db = getFirestore(app);
export const storage = getStorage(app);