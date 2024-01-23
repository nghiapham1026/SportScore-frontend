import { db } from '../firebase'; // Adjust the import path as needed
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';

export const getUserPredictions = async (userId) => {
  if (!userId) return [];

  const predictionsRef = collection(db, 'users', userId, 'predictions');
  const querySnapshot = await getDocs(predictionsRef);
  const predictions = [];
  querySnapshot.forEach((doc) => {
    predictions.push({ fixtureId: doc.id, ...doc.data() });
  });
  return predictions;
};

export const getUserData = async (userId) => {
    if (!userId) return null;
  
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
  };