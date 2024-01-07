import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './SignIn.css'; // Import CSS for styling

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/profile');
    } catch (error) {
      console.error('Error during Google Sign-In', error);
      setError('Failed to sign in with Google. Please try again.');
      setLoading(false);
    }
  };

  const handleEmailPasswordSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      navigate('/profile');
    } catch (error) {
      console.error('Error during Email/Password Sign-In', error);
      setError('Sign-in failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      {error && <p className="error">{error}</p>}
      <button onClick={handleGoogleSignIn} disabled={loading}>
        Sign In with Google
      </button>
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
        <button type="submit" disabled={loading}>
          Sign In with Email
        </button>
      </form>
    </div>
  );
}

export default SignIn;
