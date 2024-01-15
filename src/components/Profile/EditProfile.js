import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { auth, storage, db } from '../../firebase';
import FavoriteLeagues from './FavoriteLeagues';
import styles from './EditProfile.module.css';

const EditProfile = ({
  user,
  name,
  setName,
  loading,
  setLoading,
  setMessage,
  setEditMode,
  selectedLeagues,
  setSelectedLeagues,
}) => {
  const [image, setImage] = useState(null);
  const [tempSelectedLeagues, setTempSelectedLeagues] =
    useState(selectedLeagues);

  // Effect to reset tempSelectedLeagues when selectedLeagues changes,
  // which happens when the component mounts and potentially when the prop changes
  useEffect(() => {
    setTempSelectedLeagues(selectedLeagues);
  }, [selectedLeagues]);

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
    // Revert the local changes without saving them to Firestore
    setTempSelectedLeagues(selectedLeagues);
    setName(user?.displayName || '');
    setImage(null); // Assuming you want to reset the image as well
    setEditMode(false);
  };

  const handleSaveProfileAndFavorites = async () => {
    setLoading(true);
    try {
      // Update profile picture and name
      const photoURL = await uploadImage(image);
      if (photoURL) {
        await updateProfile(user, { displayName: name, photoURL });
      } else {
        await updateProfile(user, { displayName: name });
      }

      // Update favorite leagues in Firestore
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        await updateDoc(userRef, {
          favoriteLeagues: tempSelectedLeagues,
        });
      } else {
        await setDoc(userRef, {
          favoriteLeagues: tempSelectedLeagues,
        });
      }
      setSelectedLeagues(tempSelectedLeagues);

      setMessage('Profile and favorites updated successfully');

      // Reload the page to reflect the new changes
      window.location.reload();
    } catch (error) {
      setMessage(`Failed to update profile and favorites: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
        onClick={handlePasswordReset}
        disabled={loading}
        className={styles.button}
      >
        Reset Password
      </button>
      <button onClick={handleCancelEdit} className={styles.button}>
        Done
      </button>
      <FavoriteLeagues
        selectedLeagues={tempSelectedLeagues}
        setSelectedLeagues={setTempSelectedLeagues}
      />
      <button
        onClick={() => handleSaveProfileAndFavorites(image)}
        disabled={loading}
        className={styles.button}
      >
        Save Profile and Favorites
      </button>
    </>
  );
};

EditProfile.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  selectedLeagues: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedLeagues: PropTypes.func.isRequired,
};

export default EditProfile;
