import React from 'react';
import styles from './PenaltyShootout.module.css'; // Updated import statement
import PropTypes from 'prop-types';

const PenaltyShootout = ({ shootoutData, team1Logo, team2Logo }) => {
  // Split the shootout data into two arrays based on team logo
  const team1ShootoutData = shootoutData.filter(
    (event) => event.team.logo === team1Logo
  );
  const team2ShootoutData = shootoutData.filter(
    (event) => event.team.logo === team2Logo
  );

  const renderShootoutAttempts = (teamShootoutData, teamLogo) => (
    <div className={styles.shootoutColumn}>
      <img src={teamLogo} alt="Team Logo" className={styles.shootoutTeamLogo} />
      {teamShootoutData.map((event, index) => (
        <div key={index} className={styles.shootoutRow}>
          <span className={styles.playerName}>{event.player.name}</span>
          {event.type === 'Goal' && event.detail !== 'Missed Penalty' ? (
            <span className={styles.goalIcon}>✔️</span>
          ) : (
            <span className={styles.missIcon}>❌</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.shootoutContainer}>
      <div className={styles.shootoutHeader}>
        <h2>PENALTY SHOOTOUT</h2>
      </div>

      <div className={styles.shootoutTeams}>
        {renderShootoutAttempts(team1ShootoutData, team1Logo)}
        {renderShootoutAttempts(team2ShootoutData, team2Logo)}
      </div>
    </div>
  );
};

PenaltyShootout.propTypes = {
  shootoutData: PropTypes.arrayOf(
    PropTypes.shape({
      team: PropTypes.shape({
        logo: PropTypes.string.isRequired,
      }).isRequired,
      player: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      type: PropTypes.string.isRequired,
      detail: PropTypes.string,
    })
  ).isRequired,
  team1Logo: PropTypes.string.isRequired,
  team2Logo: PropTypes.string.isRequired,
};

export default PenaltyShootout;
