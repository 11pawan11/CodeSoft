import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCXThXYYpD0FR3nNXx9eY6kcUFPG62dLfE",
  authDomain: "portfolipawan.firebaseapp.com",
  projectId: "portfolipawan",
  storageBucket: "portfolipawan.appspot.com",
  messagingSenderId: "1059329198063",
  appId: "1:1059329198063:web:65aec307fbfc68a0d9581a",
  measurementId: "G-CXJSQDY52S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
export {auth, storage}