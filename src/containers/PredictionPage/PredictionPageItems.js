// PredictionPageItems.js
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './PredictionPageItems.module.css';

const PredictionPageItems = ({ prediction }) => {
  return (
    <div className={styles.predictionItem}>
      <Link to={`/league/${prediction.league.id}`}>
        <h3>
          {prediction.league.name} - {prediction.fixture.date}
        </h3>
      </Link>
      <div className={styles.teamInfo}>
        <Link to={`/team/${prediction.teams.home.id}`}>
          <div className={styles.team}>
            <img
              src={prediction.teams.home.logo}
              alt={prediction.teams.home.name}
              className={styles.teamLogo}
            />
            <span>{prediction.teams.home.name}</span>
          </div>
        </Link>
        <Link to={`/fixture/${prediction.fixture.id}`}>
          <div className={styles.score}>
            <strong>
              {prediction.goals.home} - {prediction.goals.away}
            </strong>
          </div>
        </Link>
        <Link to={`/team/${prediction.teams.away.id}`}>
          <div className={styles.team}>
            <img
              src={prediction.teams.away.logo}
              alt={prediction.teams.away.name}
              className={styles.teamLogo}
            />
            <span>{prediction.teams.away.name}</span>
          </div>
        </Link>
      </div>
      <p>Status: {prediction.fixture.status.long}</p>
      <p>
        Score: {prediction.goals.home} - {prediction.goals.away}
      </p>
      <Link to={`/predictions/${prediction.fixture.id}`}>
        <button className={styles.matchCenterButton}>Predictions</button>
      </Link>
    </div>
  );
};

PredictionPageItems.propTypes = {
  prediction: PropTypes.shape({
    league: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    fixture: PropTypes.shape({
      date: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      status: PropTypes.shape({
        long: PropTypes.string.isRequired,
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
    goals: PropTypes.shape({
      home: PropTypes.number,
      away: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default PredictionPageItems;
