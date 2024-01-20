import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FixtureItem.module.css'; // Updated import statement
import PropTypes from 'prop-types';

function FixtureItem({ fixture, toggleFixture, expandedFixtures }) {
  return (
    <li className={styles.listItem}>
      <h3
        className={styles.fixtureHeader}
        onClick={() => toggleFixture(fixture.fixture.id)}
      >
        <Link to={`/team/${fixture.teams.home.id}`}>
          <img
            src={fixture.teams.home.logo}
            alt={`${fixture.teams.home.name} logo`}
            className={styles.teamLogo}
          />
        </Link>
        {fixture.teams.home.name} {fixture.goals.home}-{fixture.goals.away}{' '}
        {fixture.teams.away.name}
        <Link to={`/team/${fixture.teams.away.id}`}>
          <img
            src={fixture.teams.away.logo}
            alt={`${fixture.teams.away.name} logo`}
            className={styles.teamLogo}
          />
        </Link>
      </h3>
      {expandedFixtures[fixture.fixture.id] && (
        <div className={styles.fixtureDetails}>
          <p>
            Date & Time: {new Date(fixture.fixture.date).toLocaleString()} (
            {fixture.fixture.timezone})
          </p>
          <p>
            Venue: {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
          </p>
          <p>Referee: {fixture.fixture.referee}</p>
          <p>
            Status: {fixture.fixture.status.long} (
            {fixture.fixture.status.short}) - {fixture.fixture.status.elapsed}{' '}
            mins elapsed
          </p>
          <p>
            Score (Halftime): {fixture.score.halftime.home} -{' '}
            {fixture.score.halftime.away}
          </p>
          <p>
            Score (Fulltime): {fixture.score.fulltime.home} -{' '}
            {fixture.score.fulltime.away}
          </p>
          <p>
            Score (Extra time): {fixture.score.extratime.home} -{' '}
            {fixture.score.extratime.away}
          </p>
          <p>
            Score (Penalty): {fixture.score.penalty.home} -{' '}
            {fixture.score.penalty.away}
          </p>
        </div>
      )}
      <Link to={`/fixture/${fixture.fixture.id}`}>
        <button className={styles.matchCenterButton}>Match Center</button>
      </Link>
      <Link to={`/predictions/${fixture.fixture.id}`}>
        <button className={styles.matchCenterButton}>Predictions</button>
      </Link>
    </li>
  );
}

FixtureItem.propTypes = {
  fixture: PropTypes.shape({
    fixture: PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      timezone: PropTypes.string,
      venue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
      }).isRequired,
      referee: PropTypes.string,
      status: PropTypes.shape({
        long: PropTypes.string,
        short: PropTypes.string,
        elapsed: PropTypes.number,
      }),
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
    goals: PropTypes.shape({
      home: PropTypes.number,
      away: PropTypes.number,
    }),
    score: PropTypes.shape({
      halftime: PropTypes.shape({
        home: PropTypes.number,
        away: PropTypes.number,
      }),
      fulltime: PropTypes.shape({
        home: PropTypes.number,
        away: PropTypes.number,
      }),
      extratime: PropTypes.shape({
        home: PropTypes.number,
        away: PropTypes.number,
      }),
      penalty: PropTypes.shape({
        home: PropTypes.number,
        away: PropTypes.number,
      }),
    }),
  }).isRequired,
  toggleFixture: PropTypes.func.isRequired,
  expandedFixtures: PropTypes.object.isRequired, // Or a more specific shape if known
};

export default FixtureItem;
