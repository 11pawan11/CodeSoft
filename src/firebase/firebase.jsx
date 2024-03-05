
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';


export const firebaseConfig = {
  apiKey: "AIzaSyDfjdzfDEjBcZEYLA80e0Wmy74iOI8eSnY",
  authDomain: "portfolio-pawan11.firebaseapp.com",
  projectId: "portfolio-pawan11",
  storageBucket: "portfolio-pawan11.appspot.com",
  messagingSenderId: "944931300119",
  appId: "1:944931300119:web:686e3776b836858b7ecd52",
  measurementId: "G-J5TTP66Q2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export {auth,storage};