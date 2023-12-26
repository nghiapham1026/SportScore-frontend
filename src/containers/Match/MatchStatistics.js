import React from 'react';
import styles from './MatchStatistics.module.css'; // Updated import statement

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

export default MatchStatistics;
