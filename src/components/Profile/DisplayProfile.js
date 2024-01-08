import React from 'react';
import styles from './Profile.module.css';

const DisplayProfile = ({ user, onEdit }) => {
  return (
    <>
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
      <button onClick={onEdit} className={styles.button}>
        Edit Profile
      </button>
    </>
  );
};

export default DisplayProfile;
