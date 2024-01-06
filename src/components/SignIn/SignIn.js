import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth, GoogleAuthProvider, signInWithPopup } from '../../firebase'; // Import from firebase.js

function SignIn() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      setUser(user); // Set the user in your AuthContext
      navigate('/profile'); // Redirect to profile page on successful sign-in
    } catch (error) {
      console.error('Error during Google Sign-In', error);
      alert('Sign-in failed. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
}

export default SignIn;
