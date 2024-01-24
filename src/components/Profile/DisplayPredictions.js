import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getUserData,
  getUserPredictions,
} from '../../utils/userDataController';
import { processPredictions } from './utils/CheckPredictions';
import styles from './DisplayPredictions.module.css'; // Your CSS module for styling

const DisplayPredictions = ({ userId }) => {
  const [userPredictions, setUserPredictions] = useState([]);
  const [userPoints, setUserPoints] = useState(0); // State to hold user's points

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await processPredictions(userId);
        let predictions = await getUserPredictions(userId);

        // Sort predictions by date, most recent first
        predictions = predictions.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA; // Sort in descending order
        });

        setUserPredictions(predictions);

        const userData = await getUserData(userId);
        setUserPoints(userData?.points || 0); // Set points or default to 0
      }
    };

    fetchData();
  }, [userId]);

  const getPredictionStatus = (date) => {
    const kickoffTime = new Date(date);
    const currentTime = new Date();
    return currentTime >= kickoffTime ? 'closed' : 'open';
  };

  return (
    <div>
      <h3>Fixture Predictions</h3>
      <p>User Points: {userPoints}</p> {/* Display user points */}
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
            <div>
              {prediction.won !== undefined && (
                <p className={prediction.won ? 'text-success' : 'text-danger'}>
                  {prediction.won ? 'Won' : 'Lost'}
                </p>
              )}
            </div>
            <Link
              to={`/predictions/${prediction.fixtureId}`}
              className={styles.editButton}
            >
              Edit Prediction
            </Link>
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
