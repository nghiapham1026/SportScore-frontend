import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './RenderPredictions.module.css';

function RenderPredictions({ predictions }) {
  if (!predictions) {
    return <p>No data available</p>;
  }

  return (
    <div className={styles.container}>
      {predictions.allPredictions.map((prediction, index) => (
        <div key={index} className={styles.predictionItem}>
          {/* League Information */}
          <Link to={`/league/${prediction.league.id}`}>
            <div className={styles.leagueInfo}>
              <h2>
                {prediction.league.name} - {prediction.league.season}
              </h2>
              <img src={prediction.league.logo} alt="League logo" />
            </div>
          </Link>

          {/* Team Information */}
          <div className={styles.teams}>
            <h3>Teams</h3>
            <Link to={`/team/${prediction.teams.home.id}`}>
              <div className={styles.team}>
                <h4>Home: {prediction.teams.home.name}</h4>
                <img src={prediction.teams.home.logo} alt="Home team logo" />
              </div>
            </Link>
            <Link to={`/team/${prediction.teams.away.id}`}>
              <div className={styles.team}>
                <h4>Away: {prediction.teams.away.name}</h4>
                <img src={prediction.teams.away.logo} alt="Away team logo" />
              </div>
            </Link>
          </div>

          {/* Prediction Details */}
          <div className={styles.predictions}>
            <h3>Predictions</h3>
            <p>
              Winner: {prediction.predictions.winner.name} (
              {prediction.predictions.winner.comment})
            </p>
            <p>
              Win or Draw: {prediction.predictions.win_or_draw ? 'Yes' : 'No'}
            </p>
            <p>
              Under/Over Goals: Home - {prediction.predictions.goals.home}, Away
              - {prediction.predictions.goals.away}
            </p>
            <p>Advice: {prediction.predictions.advice}</p>
            <p>
              Chances: Home - {prediction.predictions.percent.home}, Draw -{' '}
              {prediction.predictions.percent.draw}, Away -{' '}
              {prediction.predictions.percent.away}
            </p>
          </div>

          {/* Comparison Stats */}
          <div className={styles.comparison}>
            <h3>Comparison</h3>
            <p>
              Form: Home - {prediction.comparison.form.home}, Away -{' '}
              {prediction.comparison.form.away}
            </p>
            <p>
              Attack: Home - {prediction.comparison.att.home}, Away -{' '}
              {prediction.comparison.att.away}
            </p>
            <p>
              Defense: Home - {prediction.comparison.def.home}, Away -{' '}
              {prediction.comparison.def.away}
            </p>
            {/* ... Other comparison stats ... */}
          </div>
        </div>
      ))}
    </div>
  );
}

RenderPredictions.propTypes = {
  predictions: PropTypes.shape({
    allPredictions: PropTypes.arrayOf(
      PropTypes.shape({
        league: PropTypes.shape({
          name: PropTypes.string.isRequired,
          season: PropTypes.string.isRequired,
          logo: PropTypes.string,
        }).isRequired,
        teams: PropTypes.shape({
          home: PropTypes.shape({
            name: PropTypes.string.isRequired,
            logo: PropTypes.string,
          }).isRequired,
          away: PropTypes.shape({
            name: PropTypes.string.isRequired,
            logo: PropTypes.string,
          }).isRequired,
        }).isRequired,
        predictions: PropTypes.object,
        comparison: PropTypes.object,
      })
    ).isRequired,
  }),
};

export default RenderPredictions;
