import React, { useState, useEffect } from 'react';
import { getTeams } from '../../utils/dataController';
import styles from './TeamInfo.module.css';
import PropTypes from 'prop-types';

const TeamInfo = ({ teamId }) => {
  const [teamDetails, setTeamDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teams = await getTeams({ id: teamId });
        if (teams && teams.length > 0) {
          setTeamDetails(teams[0]);
        } else {
          setError('No team data found');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTeamData();
  }, [teamId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!teamDetails) {
    return <p>Loading...</p>;
  }

  const { team, venue } = teamDetails;

  return (
    <div className={styles.teamContainer}>
      <div className={styles.teamHeader}>
        <img src={team.logo} alt={team.name} className={styles.teamLogo} />
        <h1>{team.name}</h1>
        <div className={styles.infoRow}>
          <p>Country: {team.country}</p>
          <p>Founded: {team.founded}</p>
        </div>
      </div>

      <div className={styles.venueInfo}>
        <div className={styles.venueHeader}>
          <img
            src={venue.image}
            alt={venue.name}
            className={styles.venueImage}
          />
          <h2>Home Stadium: {venue.name}</h2>
        </div>
        <div className={styles.infoRow}>
          <p>
            Address: {venue.address}, {venue.city}
          </p>
          <p>Capacity: {venue.capacity}</p>
          <p>Surface: {venue.surface}</p>
        </div>
      </div>
    </div>
  );
};

TeamInfo.propTypes = {
  teamId: PropTypes.string.isRequired,
};

export default TeamInfo;
