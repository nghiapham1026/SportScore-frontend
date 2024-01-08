import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DisplayProfile from './DisplayProfile';
import EditProfile from './EditProfile';
import styles from './Profile.module.css';

function Profile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  if (!user) return <div>Please sign in to view this page.</div>;

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
      {editMode ? (
        <EditProfile
          user={user}
          name={name}
          setName={setName}
          setLoading={setLoading}
          setMessage={setMessage}
          setEditMode={setEditMode}
        />
      ) : (
        <DisplayProfile user={user} onEdit={() => setEditMode(true)} />
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
