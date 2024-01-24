import { db } from '../../firebase'; // Adjust the import path as needed
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getUserPredictions } from '../../utils/userDataController';
import { fetchFixtures } from '../../utils/dataController';

const checkPoints = async (userId) => {
  if (!userId) return [];

  const predictionsRef = collection(db, 'users', userId, 'predictions');
  const querySnapshot = await getDocs(predictionsRef);
  const fixtureIds = [];
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1); // Set to 24 hours ago

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const predictionDate = new Date(data.date); // Assuming 'date' is stored in a compatible format
    if (!('won' in data) && predictionDate < oneDayAgo) {
      // Check if the 'won' field exists, is true, and the date is at least 24 hours ago
      fixtureIds.push(doc.id); // Push the document ID only if conditions are met
    }
  });
  return fixtureIds;
};

const updatePredictionResult = async (userId, fixtureId, won) => {
  const predictionRef = doc(db, 'users', userId, 'predictions', fixtureId);
  await updateDoc(predictionRef, { won });
};

export const processPredictions = async (userId) => {
  console.log(`Processing predictions for user: ${userId}`);
  const fixtureIds = await checkPoints(userId);

  for (const fixtureId of fixtureIds) {
    try {
      console.log(`Processing fixture ID: ${fixtureId}`);
      const fixtureData = await fetchFixtures({ id: fixtureId });
      if (!fixtureData || fixtureData.length === 0) {
        console.log(`No data found for fixture ID: ${fixtureId}`);
        continue;
      }

      const fixture = fixtureData[0];
      const userPrediction = await getUserPredictions(userId, fixtureId);
      if (!userPrediction) {
        console.log(`No prediction found for fixture ID: ${fixtureId}`);
        continue;
      }

      console.log('User prediction:', userPrediction);
      console.log(
        'Actual fixture result:',
        fixture.goals.home,
        fixture.goals.away,
        'and',
        userPrediction.homeScore,
        userPrediction.awayScore
      );

      const won =
        userPrediction.homeScore === fixture.goals.home &&
        userPrediction.awayScore === fixture.goals.away;
      console.log(`Prediction result for fixture ID ${fixtureId}: ${won}`);
      await updatePredictionResult(userId, fixtureId, won);
    } catch (error) {
      console.error(
        `Error processing prediction for fixture ${fixtureId}:`,
        error
      );
    }
  }
};
