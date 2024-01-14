import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DisplayProfile from './DisplayProfile';
import EditProfile from './EditProfile';
import styles from './Profile.module.css';

function Profile() {
  const { user, userData } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedLeagues, setSelectedLeagues] = useState([]);

  useEffect(() => {
    setEditMode(false);

    if (userData && userData.favoriteLeagues) {
      setSelectedLeagues(userData.favoriteLeagues);
    }
  }, [userData]);

  if (!user) return <div>Please sign in to view this page.</div>;

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
      {editMode ? (
        <EditProfile
          user={user}
          name={name}
          loading={loading}
          setName={setName}
          setLoading={setLoading}
          setMessage={setMessage}
          setEditMode={setEditMode}
          selectedLeagues={selectedLeagues}
          setSelectedLeagues={setSelectedLeagues}
        />
      ) : (
        <DisplayProfile
          user={user}
          onEdit={() => setEditMode(true)}
          selectedLeagues={selectedLeagues}
        />
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
