import React from 'react';
import PropTypes from 'prop-types';
import styles from './DisplayProfile.module.css';

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
            <li key={index}>
              <div className={styles.leagueItem}>
                <img
                  src={league.logo}
                  alt={league.name}
                  className={styles.leagueLogo}
                />
                <span>{league.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

DisplayProfile.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }),
  onEdit: PropTypes.func.isRequired,
  selectedLeagues: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DisplayProfile;
