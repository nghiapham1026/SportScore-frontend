import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import styles from './Profile.module.css';

function Profile() {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
  
    const handleUpdateProfile = async () => {
      setLoading(true);
      try {
        await updateProfile(user, { displayName: name });
        setMessage('Profile updated successfully');
      } catch (error) {
        setMessage('Failed to update profile');
      } finally {
        setLoading(false);
      }
    };
  
    const handlePasswordReset = async () => {
        if (user && user.email) {
          try {
            await sendPasswordResetEmail(auth, user.email);
            setMessage('Password reset email sent!');
          } catch (error) {
            console.error('Password reset error:', error);
            setMessage(`Failed to send password reset email: ${error.message}`);
          }
        }
      };      
  
      if (!user) return <div>Please sign in to view this page.</div>;

      return (
        <div className={styles.profileContainer}>
          <h2>Profile</h2>
          {user.photoURL && (
            <img src={user.photoURL} alt="Profile" className={styles.profileImage} />
          )}
          <div className={styles.profileInfo}>
            <p>Name: {user.displayName || 'Not set'}</p>
            <p>Email: {user.email}</p>
          </div>
    
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Display Name"
            className={styles.inputField}
          />
          <button onClick={handleUpdateProfile} disabled={loading} className={styles.button}>
            Update Profile
          </button>
    
          <button onClick={handlePasswordReset} disabled={loading} className={styles.button}>
            Reset Password
          </button>
    
          {message && <p className={message.includes('Failed') ? styles.errorMessage : styles.successMessage}>{message}</p>}
        </div>
      );
    }
    
    export default Profile;