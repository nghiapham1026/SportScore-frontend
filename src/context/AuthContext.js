import React, { createContext, useState, useEffect, useCallback } from 'react';
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
import { getUserData } from '../utils/userDataController';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({}); // Store additional user data

  const autoSignOut = useCallback((timeout) => {
    setTimeout(() => {
      signOut();
    }, timeout);
  }, []);

  useEffect(() => {
    if (user) {
      autoSignOut(3600000);

      const resetTimer = () => {
        autoSignOut(3600000);
      };

      window.addEventListener('click', resetTimer);
      window.addEventListener('scroll', resetTimer);
      window.addEventListener('keypress', resetTimer);

      return () => {
        window.removeEventListener('click', resetTimer);
        window.removeEventListener('scroll', resetTimer);
        window.removeEventListener('keypress', resetTimer);
      };
    }
  }, [user, autoSignOut]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      console.log('Auth state changed:', authUser);
      if (authUser) {
        const data = await getUserData(authUser.uid);
        setUserData(data || {});
        setUser(authUser);
      } else {
        console.log('User signed out');
        setUser(null);
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
      setUser(null);
      setUserData({});
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
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
