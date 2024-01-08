import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../../firebase';
import styles from './Profile.module.css';

function Profile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false); // New state for toggling edit mode

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (image) {
      const imageRef = ref(storage, `profile_images/${user.uid}`);
      await uploadBytes(imageRef, image);
      return await getDownloadURL(imageRef);
    }
    return null;
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const photoURL = await uploadImage(); // Upload the image and get the URL
      if (photoURL) {
        await updateProfile(user, { displayName: name, photoURL });
      } else {
        await updateProfile(user, { displayName: name });
      }
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

  const handleCancelEdit = () => {
    // Reset the form fields to their original states
    setName(user?.displayName || '');
    setImage(null);
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt="Profile"
          className={styles.profileImage}
        />
      )}
      <div className={styles.profileInfo}>
        <p>Name: {user.displayName || 'Not set'}</p>
        <p>Email: {user.email}</p>
      </div>

      {editMode ? (
        <>
          <input
            type="file"
            onChange={handleImageChange}
            className={styles.inputField}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Display Name"
            className={styles.inputField}
          />
          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className={styles.button}
          >
            Update Profile
          </button>
          <button
            onClick={handlePasswordReset}
            disabled={loading}
            className={styles.button}
          >
            Reset Password
          </button>
          <button
            onClick={handleCancelEdit}
            className={styles.button}
          >
            Cancel
          </button>
        </>
      ) : (
        <button onClick={toggleEditMode} className={styles.button}>
          Edit Profile
        </button>
      )}

      {message && (
        <p
          className={
            message.includes('Failed')
              ? styles.errorMessage
              : styles.successMessage
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Profile;
