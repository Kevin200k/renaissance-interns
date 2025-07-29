// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmz4nusCcrEjwpNk3T09G-TCkvYtyj3hw",
  authDomain: "intern-attendance-9e1d0.firebaseapp.com",
  projectId: "intern-attendance-9e1d0",
  storageBucket: "intern-attendance-9e1d0.firebasestorage.app",
  messagingSenderId: "758215059442",
  appId: "1:758215059442:web:56ed67c83bc4ce4beced6b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
