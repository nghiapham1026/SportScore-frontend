import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function SignOut() {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        await signOut();
        navigate('/signin'); // Redirect to sign-in page after sign out
      } catch (error) {
        console.error('Sign out error:', error);
        // Handle error, maybe show a message to the user
      }
    };

    performSignOut();
  }, [signOut, navigate]);

  return <div>Signing out...</div>;
}

export default SignOut;
