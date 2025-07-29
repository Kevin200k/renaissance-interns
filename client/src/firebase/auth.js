// src/authService.js
import { auth, googleProvider } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getIdToken
} from "firebase/auth";

// Sign up
export const signup = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Login
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Logout
export const logout = () => signOut(auth);

// Get ID token
export const getToken = async () => {
  const user = auth.currentUser;
  if (user) return await getIdToken(user);
  throw new Error("No user is currently logged in");
};

// Google Sign-In
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};