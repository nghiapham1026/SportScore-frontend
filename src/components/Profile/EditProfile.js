import React from 'react';
import styles from './Profile.module.css';

const EditProfile = ({
  name,
  image,
  loading,
  onImageChange,
  onNameChange,
  onUpdateProfile,
  onPasswordReset,
  onCancel,
}) => {
  return (
    <>
      <input
        type="file"
        onChange={onImageChange}
        className={styles.inputField}
      />
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Display Name"
        className={styles.inputField}
      />
      <button
        onClick={onUpdateProfile}
        disabled={loading}
        className={styles.button}
      >
        Update Profile
      </button>
      <button
        onClick={onPasswordReset}
        disabled={loading}
        className={styles.button}
      >
        Reset Password
      </button>
      <button
        onClick={onCancel}
        className={styles.button}
      >
        Done
      </button>
    </>
  );
};

export default EditProfile;
