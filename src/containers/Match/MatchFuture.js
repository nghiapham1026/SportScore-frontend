import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MatchScore.module.css'; // Reusing MatchScore's CSS module
import PropTypes from 'prop-types';

function MatchFuture({ fixtureDetails }) {
  const fixtureDate = new Date(fixtureDetails.fixture.date).toLocaleString();

  return (
    <div className={styles.matchContainer}>
      <div className={styles.teamScoreContainer}>
        <div className={styles.teamInfo}>
          <Link to={`/team/${fixtureDetails.teams.home.id}`}>
            <img
              src={fixtureDetails.teams.home.logo}
              alt={`${fixtureDetails.teams.home.name} Logo`}
              className={styles.teamLogo}
            />
          </Link>
        </div>
        <div className={styles.fixtureDetails}>
          <span className={styles.score}>{fixtureDate}</span>
          <br />
          <span className={styles.fixtureVenue}>
            {fixtureDetails.fixture.venue.name},{' '}
            {fixtureDetails.fixture.venue.city}
          </span>
        </div>
        <div className={styles.teamInfo}>
          <Link to={`/team/${fixtureDetails.teams.away.id}`}>
            <img
              src={fixtureDetails.teams.away.logo}
              alt={`${fixtureDetails.teams.away.name} Logo`}
              className={styles.teamLogo}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

MatchFuture.propTypes = {
  fixtureDetails: PropTypes.shape({
    fixture: PropTypes.shape({
      date: PropTypes.string.isRequired,
      venue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    teams: PropTypes.shape({
      home: PropTypes.shape({
        id: PropTypes.number.isRequired,
        logo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      away: PropTypes.shape({
        id: PropTypes.number.isRequired,
        logo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default MatchFuture;
