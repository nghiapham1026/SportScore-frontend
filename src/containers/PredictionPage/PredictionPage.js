import React, { useState, useEffect } from 'react';
import { fetchFixtures } from '../../utils/dataController';
import styles from './PredictionPage.module.css';
import PredictionPageItems from './PredictionPageItems';

function PredictionPage() {
  const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(today);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const getPredictions = async () => {
      try {
        const predictionsData = await fetchFixtures({ date: selectedDate });
        setPredictions(predictionsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    if (selectedDate) {
      getPredictions();
    }
  }, [selectedDate]);

  return (
    <div className={styles.container}>
      <h2>Predictions for {selectedDate}</h2>
      <label htmlFor="datePicker">Select a date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChange}
        className={styles.dateInput}
      />

      {error && <p className={styles.error}>Error fetching data: {error}</p>}

      {predictions.length > 0 ? (
        <div className={styles.predictionsList}>
          {predictions.map((prediction, index) => (
            <PredictionPageItems key={index} prediction={prediction} />
          ))}
        </div>
      ) : (
        <p className={styles.noPredictions}>
          No predictions available for this date.
        </p>
      )}
    </div>
  );
}

export default PredictionPage;
