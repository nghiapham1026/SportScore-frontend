import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from '../../firebase'; // Import additional functions

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleEmailPasswordSignIn = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      setUser(user);
      navigate('/profile');
    } catch (error) {
      console.error('Error during Email/Password Sign-In', error);
      alert('Sign-in failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <form onSubmit={handleEmailPasswordSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In with Email</button>
      </form>
    </div>
  );
}

export default SignIn;
