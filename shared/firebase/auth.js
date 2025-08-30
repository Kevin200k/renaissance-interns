import { auth, googleProvider, db } from "./config"; // db also comes from your config
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getIdToken,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Set auth persistence so the session survives reloads
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Failed to set persistence", err);
});

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
  const user = result.user;

  // Save user to Firestore if it doesn't exist
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date()
    });
  }

  return user;
};
