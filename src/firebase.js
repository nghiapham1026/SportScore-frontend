// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
  apiKey: 'AIzaSyD4Do9ZZR5ZPrsLK8ht4Wt03xqGometLGo',
  authDomain: 'sportscore-aa33c.firebaseapp.com',
  projectId: 'sportscore-aa33c',
  storageBucket: 'sportscore-aa33c.appspot.com',
  messagingSenderId: '338079569254',
  appId: '1:338079569254:web:8c5185952c2666f08b64a7',
  measurementId: 'G-126MGMJ491',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export {
  auth,
  storage, // Export the storage instance
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
};
