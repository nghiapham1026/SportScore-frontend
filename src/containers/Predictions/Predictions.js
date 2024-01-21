import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMatchPredictions, fetchFixtures } from '../../utils/dataController';
import RenderPredictions from './RenderPredictions';
import ScorePredictor from './ScorePredictor';

function Predictions() {
  const { fixtureId } = useParams();
  const [predictions, setPredictions] = useState(null);
  const [userPredictionDisplay, setUserPredictionDisplay] = useState(null);
  const [isPredictionLocked, setIsPredictionLocked] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let timerId;

    async function fetchData() {
      try {
        const predictionsResponse = await getMatchPredictions({ fixture: fixtureId });
        const fixturesResponse = await fetchFixtures({ id: fixtureId });

        setPredictions(predictionsResponse);

        const kickoffTime = new Date(fixturesResponse[0].fixture.date);
        const now = new Date();

        if (now >= kickoffTime) {
          setIsPredictionLocked(true);
          setCountdown('Match in progress or has ended');
        } else {
          timerId = startCountdown(kickoffTime);
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error in fetchData: ', err);
      }
    }

    fetchData();

    return () => {
      clearInterval(timerId); // Clear the interval when the component is unmounted
    };
  }, [fixtureId]);

  const startCountdown = (kickoffTime) => {
    return setInterval(() => {
      const now = new Date();
      const timeLeft = kickoffTime - now;

      if (timeLeft <= 0) {
        clearInterval(timerId);
        setIsPredictionLocked(true);
        setCountdown('Match has started');
      } else {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  };

  const handlePredictionSubmit = (userPrediction) => {
    setUserPredictionDisplay(userPrediction);
    console.log('User Prediction:', userPrediction);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {predictions && <RenderPredictions predictions={predictions} />}
      {!isPredictionLocked ? (
        <ScorePredictor onPredictionSubmit={handlePredictionSubmit} />
      ) : (
        <p>Prediction is locked as the match is about to start, in progress, or has ended.</p>
      )}
      <p>Time until kickoff: {countdown}</p>
      {userPredictionDisplay && (
        <div>
          <h3>Your Prediction:</h3>
          <p>Home Score: {userPredictionDisplay.home}</p>
          <p>Away Score: {userPredictionDisplay.away}</p>
        </div>
      )}
    </div>
  );
}

export default Predictions;
