import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      // Implement your sign-in logic here
      // On successful sign-in, set the user
      setUser({ email }); // Simplified example
      return true; // Indicate successful sign-in
    } catch (error) {
      console.error('Sign-in error:', error);
      return false; // Indicate sign-in failure
    }
  };

  const signOut = () => {
    // Implement sign-out logic
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
