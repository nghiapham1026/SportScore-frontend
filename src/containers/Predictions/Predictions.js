import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMatchPredictions } from '../../utils/dataController';
import RenderPredictions from './RenderPredictions';
import ScorePredictor from './ScorePredictor';

function Predictions() {
  const { fixtureId } = useParams();
  const [predictions, setPredictions] = useState(null);
  const [userPredictionDisplay, setUserPredictionDisplay] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPredictions() {
      try {
        const response = await getMatchPredictions({ fixture: fixtureId });
        if (response.error) {
          setError(response.error);
        } else {
          setPredictions(response);
        }
      } catch (err) {
        setError('Failed to fetch predictions');
        console.error('Error in useEffect: ', err);
      }
    }

    fetchPredictions();
  }, [fixtureId]);

  const handlePredictionSubmit = (userPrediction) => {
    // Handle the prediction submission logic
    setUserPredictionDisplay(userPrediction);
    console.log('User Prediction:', userPrediction);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {predictions && <RenderPredictions predictions={predictions} />}
      <ScorePredictor onPredictionSubmit={handlePredictionSubmit} />
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
