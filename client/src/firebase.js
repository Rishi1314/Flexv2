// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "flex-f7f8b.firebaseapp.com",
  projectId: "flex-f7f8b",
  storageBucket: "flex-f7f8b.appspot.com",
  messagingSenderId: "260739992245",
  appId: "1:260739992245:web:3473ece552ddb361aa0cfc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
