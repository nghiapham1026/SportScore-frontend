// PlayerDetails.js
import React from 'react';
import styles from './PlayerDetails.module.css';
import PropTypes from 'prop-types';

const PlayerDetails = ({ player }) => {
  return (
    <div>
      <img
        src={player.photo}
        alt={player.name}
        className={styles.playerPhoto}
      />
      <p>
        <strong>Name:</strong> {player.name}
      </p>
      <p>
        <strong>First Name:</strong> {player.firstname}
      </p>
      <p>
        <strong>Last Name:</strong> {player.lastname}
      </p>
      <p>
        <strong>Age:</strong> {player.age}
      </p>
      <p>
        <strong>Date of Birth:</strong> {player.birth.date}
      </p>
      <p>
        <strong>Place of Birth:</strong> {player.birth.place}
      </p>
      <p>
        <strong>Country:</strong> {player.birth.country}
      </p>
      <p>
        <strong>Nationality:</strong> {player.nationality}
      </p>
      <p>
        <strong>Height:</strong> {player.height}
      </p>
      <p>
        <strong>Weight:</strong> {player.weight}
      </p>
      <p>
        <strong>Injured:</strong> {player.injured ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

PlayerDetails.propTypes = {
  player: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    age: PropTypes.number,
    birth: PropTypes.shape({
      date: PropTypes.string,
      place: PropTypes.string,
      country: PropTypes.string,
    }),
    nationality: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    injured: PropTypes.bool,
  }).isRequired,
};

export default PlayerDetails;
