import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMatchPredictions } from '../../utils/dataController';
import RenderPredictions from './RenderPredictions';

function Predictions() {
  const { fixtureId } = useParams();
  const [predictions, setPredictions] = useState(null);
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

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {predictions && <RenderPredictions predictions={predictions} />}
    </div>
  );
}

export default Predictions;
