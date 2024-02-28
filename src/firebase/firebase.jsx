// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const analytics = getAnalytics(app);