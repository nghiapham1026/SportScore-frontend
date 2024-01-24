import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMatchPredictions, fetchFixtures } from '../../utils/dataController';
import RenderPredictions from './RenderPredictions';
import ScorePredictor from './ScorePredictor';
import {
  getUserPredictions,
  getUserData,
  updateUserData,
} from '../../utils/userDataController';
import { AuthContext } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import styles from './Predictions.module.css';

function Predictions() {
  const { fixtureId } = useParams();
  const [predictions, setPredictions] = useState(null);
  const [fixtureDetails, setFixtureDetails] = useState(null);
  const [userPredictionDisplay, setUserPredictionDisplay] = useState(null);
  const [userPoints, setUserPoints] = useState(null);
  const [isPredictionLocked, setIsPredictionLocked] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const predictionsResponse = await getMatchPredictions({
          fixture: fixtureId,
        });
        const fixturesResponse = await fetchFixtures({ id: fixtureId });

        if (predictionsResponse.error) setError(predictionsResponse.error);
        if (fixturesResponse.error) setError(fixturesResponse.error);

        setPredictions(predictionsResponse);
        setFixtureDetails(fixturesResponse[0]);

        const kickoffTime = new Date(fixturesResponse[0].fixture.date);
        const now = new Date();
        if (now >= kickoffTime) {
          setIsPredictionLocked(true);
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error in fetchData: ', err);
      }
    }

    fetchData();
  }, [fixtureId]);

  useEffect(() => {
    const fetchUserPrediction = async () => {
      if (user) {
        const predictions = await getUserPredictions(user.uid);
        const predictionForFixture = predictions.find(
          (pred) => pred.fixtureId === fixtureId
        );
        setUserPredictionDisplay(predictionForFixture);
      }
    };

    fetchUserPrediction();
  }, [user, fixtureId]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userData = await getUserData(user.uid);
        setUserPoints(userData?.points || 0); // Fetch and set user points
      }
    };

    fetchUserData();
  }, [user]);

  const handlePredictionSubmit = async (userPrediction) => {
    if (!user) {
      console.error('User not signed in');
      return;
    }

    const overwrite =
      !userPredictionDisplay ||
      window.confirm(
        'You have already predicted this match. Overwrite your prediction?'
      );

    if (overwrite) {
      try {
        const predictionsRef = doc(
          db,
          'users',
          user.uid,
          'predictions',
          fixtureId.toString()
        );
        await setDoc(predictionsRef, {
          homeScore: userPrediction.home,
          awayScore: userPrediction.away,
          homeLogo: predictions.allPredictions[0].teams.home.logo,
          awayLogo: predictions.allPredictions[0].teams.away.logo,
          date: fixtureDetails.fixture.date,
          submittedAt: new Date(),
        });
        setUserPredictionDisplay(userPrediction);
        console.log('Prediction saved successfully');

        const updatedPoints = (userPoints || 0) - 1;
        await updateUserData(user.uid, { points: updatedPoints });

        window.location.reload();
      } catch (error) {
        console.error('Error saving prediction:', error);
      }
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      {error && (
        <p className={`alert alert-danger ${styles.error}`}>Error: {error}</p>
      )}
      {predictions && <RenderPredictions predictions={predictions} />}

      {!isPredictionLocked || userPoints === 0 ? (
        <>
          <div>
            <p>Your Current Points: {userPoints}</p>
            <p className="text-warning">
              Submitting or changing a prediction will cost 1 point.
            </p>
          </div>
          <ScorePredictor onPredictionSubmit={handlePredictionSubmit} />
        </>
      ) : (
        <p className={styles.lockedPrediction}>
          Prediction is unavailable, either the match has started or you are out
          of points.
        </p>
      )}

      {userPredictionDisplay && (
        <div className={styles.yourPrediction}>
          <h3>Your Prediction:</h3>
          <div className={styles.teamPrediction}>
            <img
              src={userPredictionDisplay.homeLogo}
              alt="Home Team Logo"
              className={styles.teamLogo}
            />
            <p>
              Home Score: <b>{userPredictionDisplay.homeScore}</b>
            </p>
          </div>
          <div className={styles.teamPrediction}>
            <img
              src={userPredictionDisplay.awayLogo}
              alt="Away Team Logo"
              className={styles.teamLogo}
            />
            <p>
              Away Score: <b>{userPredictionDisplay.awayScore}</b>
            </p>
          </div>
          <div className={styles.predictionStatus}>
          {userPredictionDisplay.won !== undefined && (
                <p className={userPredictionDisplay.won ? "text-success" : "text-danger"}>
                  {userPredictionDisplay.won ? "Won" : "Lost"}
                </p>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Predictions;
