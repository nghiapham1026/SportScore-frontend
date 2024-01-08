import React from 'react';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../../firebase';
import styles from './Profile.module.css';

const EditProfile = ({ user, name, setName, setLoading, setMessage, setEditMode }) => {
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async (image) => {
    if (image) {
      const imageRef = ref(storage, `profile_images/${user.uid}`);
      await uploadBytes(imageRef, image);
      return await getDownloadURL(imageRef);
    }
    return null;
  };

  const handleUpdateProfile = async (image) => {
    setLoading(true);
    try {
      const photoURL = await uploadImage(image);
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

  const handleCancelEdit = () => {
    setName(user?.displayName || '');
    setEditMode(false);
  };

  return (
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
        onClick={() => handleUpdateProfile(image)}
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
        Done
      </button>
    </>
  );
};

export default EditProfile;
