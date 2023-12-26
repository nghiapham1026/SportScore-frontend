import React from 'react';
import styles from './LeagueHeader.module.css'; // Updated import statement
import PropTypes from 'prop-types';

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

LeagueHeader.propTypes = {
  leagueName: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  toggleLeague: PropTypes.func.isRequired,
};

export default LeagueHeader;
