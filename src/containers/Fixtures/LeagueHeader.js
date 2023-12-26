import React from 'react';
import styles from './LeagueHeader.module.css'; // Updated import statement

function LeagueHeader({ leagueName, logo, toggleLeague }) {
  return (
    <h2
      className={styles.leagueHeader}
      onClick={() => toggleLeague(leagueName)}
    >
      <img
        src={logo}
        alt={`${leagueName} logo`}
        className={styles.leagueLogo}
      />
      {leagueName}
    </h2>
  );
}

export default LeagueHeader;
