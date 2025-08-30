import { db } from './config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Create or Update User Role (Admin/User)
export const saveUserRole = async (uid, data) => {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
    console.log(`User role saved for UID: ${uid}`);
  } catch (err) {
    console.error('Error saving user role:', err);
    throw err;
  }
};

// Get User Data by UID
export const getUserData = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
    throw err;
  }
};

// Update User Status (active/inactive)
export const updateUserStatus = async (uid, status) => {
  try {
    await updateDoc(doc(db, 'users', uid), { status });
    console.log(`User status updated to ${status} for UID: ${uid}`);
  } catch (err) {
    console.error('Error updating user status:', err);
    throw err;
  }
};
