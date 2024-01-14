import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from '../firebase';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({}); // Store additional user data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      console.log('Auth state changed:', authUser);
      if (authUser) {
        const userRef = doc(db, 'users', authUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          console.log('User data found:', docSnap.data());
          setUserData(docSnap.data());
        } else {
          console.log('No user data found');
        }
        setUser(authUser);
      } else {
        console.log('User signed out');
        setUserData({});
      }
    });
    return unsubscribe;
  }, []);

  const createUserDocument = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    // Only create a new document if it doesn't already exist
    if (!docSnap.exists()) {
      await setDoc(userRef, { favoriteLeagues: [] }, { merge: true });
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if the user is new and create a user document if they are
      if (result.additionalUserInfo?.isNewUser) {
        await createUserDocument(result.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const signUpWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserDocument(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signUpWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Define the prop type for children
};

export default AuthProvider;
