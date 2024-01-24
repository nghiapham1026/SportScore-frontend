import { db } from '../firebase'; // Adjust the import path as needed
import { collection, doc, getDocs, getDoc, setDoc } from 'firebase/firestore';

export const getUserPredictions = async (userId, fixtureId = null) => {
  if (!userId) return [];

  const predictionsRef = collection(db, 'users', userId, 'predictions');
  const querySnapshot = await getDocs(predictionsRef);
  const predictions = [];
  querySnapshot.forEach((doc) => {
    if (!fixtureId || doc.id === fixtureId) {
      predictions.push({ fixtureId: doc.id, ...doc.data() });
    }
  });
  return fixtureId ? predictions[0] : predictions;
};

export const getUserData = async (userId) => {
  if (!userId) return null;

  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
};

export const updateUserData = async (userId, data) => {
  if (!userId) return;

  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, data, { merge: true });
};
