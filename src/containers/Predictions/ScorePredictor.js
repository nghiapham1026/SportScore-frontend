import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ScorePredictor.module.css'; // Import CSS module

function ScorePredictor({ onPredictionSubmit }) {
  const [userPrediction, setUserPrediction] = useState({ home: 0, away: 0 });

  const handlePredictionChange = (team, value) => {
    setUserPrediction((prev) => ({
      ...prev,
      [team]: Math.max(0, Math.min(10, Number(value))),
    }));
  };

  return (
    <div className={styles.scorePredictorContainer}>
      <h3 className={styles.scorePredictorHeader}>Make Your Prediction</h3>
      <label className={styles.label}>
        Home Score:
        <input
          className={styles.input}
          type="number"
          value={userPrediction.home}
          onChange={(e) => handlePredictionChange('home', e.target.value)}
          min="0"
          max="10"
        />
      </label>
      <label className={styles.label}>
        Away Score:
        <input
          className={styles.input}
          type="number"
          value={userPrediction.away}
          onChange={(e) => handlePredictionChange('away', e.target.value)}
          min="0"
          max="10"
        />
      </label>
      <button
        className={styles.button}
        onClick={() => onPredictionSubmit(userPrediction)}
      >
        Submit Prediction
      </button>
    </div>
  );
}

ScorePredictor.propTypes = {
  onPredictionSubmit: PropTypes.func.isRequired,
};

export default ScorePredictor;
