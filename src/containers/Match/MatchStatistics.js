import React from 'react';
import styles from './MatchStatistics.module.css'; // Updated import statement
import PropTypes from 'prop-types';

function MatchStatistics({ teamStats }) {
  return (
    <div className={styles.teamSection}>
      <img
        src={teamStats.team.logo}
        alt={`${teamStats.team.name} logo`}
        className={styles.teamLogo}
      />
      <div className={styles.statsList}>
        {teamStats.statistics.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <span>{stat.type}</span>
            <span>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

MatchStatistics.propTypes = {
  teamStats: PropTypes.shape({
    team: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    statistics: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default MatchStatistics;
