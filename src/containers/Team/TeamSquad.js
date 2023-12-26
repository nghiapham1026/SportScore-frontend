// TeamSquad.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSquads } from '../../utils/dataController';
import styles from './TeamSquad.module.css';
import PropTypes from 'prop-types';

const TeamSquad = ({ teamId }) => {
  const [squadData, setSquadData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSquadData = async () => {
      try {
        const squads = await getSquads({ team: teamId });
        if (squads && squads.length > 0) {
          setSquadData(squads[0].players); // Assuming the players are in the first item
        } else {
          setError('No squad data found');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchSquadData();
  }, [teamId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!squadData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.squadContainer}>
      <h2>Squad List</h2>
      <div className={styles.playersList}>
        {squadData.map((player) => (
          <div key={player.id} className={styles.playerCard}>
            <img
              src={player.photo}
              alt={player.name}
              className={styles.playerPhoto}
            />
            <div className={styles.playerInfo}>
              <Link to={`/players/${player.id}`}>
                <h3>{player.name}</h3>
              </Link>
              <div className={styles.playerDetailRow}>
                <p>Age: {player.age}</p>
              </div>
              <div className={styles.playerDetailRow}>
                <p>Number: {player.number}</p>
              </div>
              <div className={styles.playerDetailRow}>
                <p>Position: {player.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TeamSquad.propTypes = {
  teamId: PropTypes.string.isRequired,
};

export default TeamSquad;
