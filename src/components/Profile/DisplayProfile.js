import React from 'react';
import styles from './Profile.module.css';

const DisplayProfile = ({ user, onEdit, selectedLeagues }) => {
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
        <button onClick={onEdit} className={styles.button}>
          Edit Profile
        </button>

        <h3>Favorite Leagues</h3>
        <ul>
          {selectedLeagues.map((league, index) => (
            <li key={index}>{league}</li> // Assuming league has a 'name' property
          ))}
        </ul>
      </div>
    </>
  );
};

export default DisplayProfile;
