// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-6ff8b.firebaseapp.com",
  projectId: "mern-auth-6ff8b",
  storageBucket: "mern-auth-6ff8b.appspot.com",
  messagingSenderId: "600183680017",
  appId: "1:600183680017:web:7fbef6bc52207c31d715b0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);