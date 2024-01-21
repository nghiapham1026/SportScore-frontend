import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMatchPredictions, fetchFixtures } from '../../utils/dataController';
import RenderPredictions from './RenderPredictions';
import ScorePredictor from './ScorePredictor';
import { AuthContext } from '../../context/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Predictions() {
  const { fixtureId } = useParams();
  const [predictions, setPredictions] = useState(null);
  const [fixtureDetails, setFixtureDetails] = useState(null);
  const [userPredictionDisplay, setUserPredictionDisplay] = useState(null);
  const [isPredictionLocked, setIsPredictionLocked] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const predictionsResponse = await getMatchPredictions({ fixture: fixtureId });
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
    if (user && !userPredictionDisplay) {
      async function fetchUserPrediction() {
        const predictionRef = doc(db, 'users', user.uid, 'predictions', fixtureId);
        const docSnap = await getDoc(predictionRef);
        if (docSnap.exists()) {
          setUserPredictionDisplay(docSnap.data());
        }
      }

      fetchUserPrediction();
    }
  }, [user, fixtureId]);

  const handlePredictionSubmit = async (userPrediction) => {
    if (!user) {
      console.error("User not signed in");
      return;
    }

    const overwrite = !userPredictionDisplay || window.confirm("You have already predicted this match. Overwrite your prediction?");

    if (overwrite) {
      try {
        const predictionsRef = doc(db, 'users', user.uid, 'predictions', fixtureId.toString());
        await setDoc(predictionsRef, {
          homeScore: userPrediction.home,
          awayScore: userPrediction.away,
          homeLogo: predictions.allPredictions[0].teams.home.logo,
          awayLogo: predictions.allPredictions[0].teams.away.logo,
          date: fixtureDetails.fixture.date,
          submittedAt: new Date()
        });
        setUserPredictionDisplay(userPrediction);
        console.log("Prediction saved successfully");
        window.location.reload();
      } catch (error) {
        console.error('Error saving prediction:', error);
      }
    }
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
      
      {userPredictionDisplay && (
        <div>
          <h3>Your Prediction:</h3>
          <p>{userPredictionDisplay.homeLogo} Home Score: {userPredictionDisplay.homeScore}</p>
          <p>{userPredictionDisplay.awayLogo} Away Score: {userPredictionDisplay.awayScore}</p>
        </div>
      )}
    </div>
  );
}

export default Predictions;
