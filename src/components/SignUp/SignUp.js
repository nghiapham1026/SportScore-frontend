import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from '../SignIn/SignIn.module.css'; // Reusing the same styles

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUpWithEmail, signUpWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signUpWithGoogle();
      navigate('/profile');
    } catch (error) {
      console.error('Error during Google Sign-Up', error);
      setError('Failed to sign up with Google. Please try again.');
      setLoading(false);
    }
  };

  const handleEmailPasswordSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      navigate('/profile');
    } catch (error) {
      console.error('Error during Email/Password Sign-Up', error);
      setError('Sign-up failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.signInContainer}>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleEmailPasswordSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          Sign Up with Email
        </button>
        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className={styles.button}
        >
          Sign Up with Google
        </button>
      </form>
    </div>
  );
}

export default SignUp;
