// DisplayPredictions.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Adjust this import based on your file structure
import { collection, getDocs } from 'firebase/firestore';
import PropTypes from 'prop-types';
import styles from './DisplayPredictions.module.css'; // Create and use a separate CSS module for this component

const DisplayPredictions = ({ userId }) => {
  const [userPredictions, setUserPredictions] = useState([]);

  useEffect(() => {
    const fetchUserPredictions = async () => {
      if (userId) {
        const predictionsRef = collection(db, 'users', userId, 'predictions');
        const querySnapshot = await getDocs(predictionsRef);
        const predictions = [];
        querySnapshot.forEach((doc) => {
          predictions.push(doc.data());
        });
        setUserPredictions(predictions);
      }
    };

    fetchUserPredictions();
  }, [userId]);

  const getPredictionStatus = (date) => {
    const oneHour = 60 * 60 * 1000; // One hour in milliseconds
    const kickoffTime = new Date(date);
    const currentTime = new Date();
    return kickoffTime - currentTime > oneHour ? 'open' : 'closed';
  };

  return (
    <div>
      <h3>Fixture Predictions</h3>
      <div>
        {userPredictions.map((prediction, index) => (
          <div key={index} className={styles.predictionBox}>
            <img
              src={prediction.homeLogo}
              alt="Home Team Logo"
              className={styles.teamLogo}
            />
            <div>
              <span className={styles.score}>
                {prediction.homeScore} - {prediction.awayScore}
              </span>
              <p className={styles.predictionDate}>
                Date: {new Date(prediction.date).toLocaleString()}
              </p>
              <p
                className={
                  getPredictionStatus(prediction.date) === 'open'
                    ? styles.statusOpen
                    : styles.statusClosed
                }
              >
                Status: {getPredictionStatus(prediction.date)}
              </p>
            </div>
            <img
              src={prediction.awayLogo}
              alt="Away Team Logo"
              className={styles.teamLogo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

DisplayPredictions.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DisplayPredictions;
