// PredictionPageItems.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PredictionPageItems.module.css';

const PredictionPageItems = ({ prediction }) => {
  return (
    <div className={styles.predictionItem}>
      <h3>
        {prediction.league.name} - {prediction.fixture.date}
      </h3>
      <div className={styles.teamInfo}>
        <div className={styles.team}>
          <img
            src={prediction.teams.home.logo}
            alt={prediction.teams.home.name}
            className={styles.teamLogo}
          />
          <span>{prediction.teams.home.name}</span>
        </div>
        <div className={styles.score}>
          <strong>
            {prediction.goals.home} - {prediction.goals.away}
          </strong>
        </div>
        <div className={styles.team}>
          <img
            src={prediction.teams.away.logo}
            alt={prediction.teams.away.name}
            className={styles.teamLogo}
          />
          <span>{prediction.teams.away.name}</span>
        </div>
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

export default PredictionPageItems;
