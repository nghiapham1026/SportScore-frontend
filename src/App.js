import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  
    useEffect(() => {
      const fetchFixtures = async () => {
        try {
          const response = await axios.get('https://sportscore-a1cf52e3ff48.herokuapp.com/fixtures/db/getFixtures', {
            params: { date: selectedDate }
          });
          setFixtures(response.data.allFixtures);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchFixtures();
    }, [selectedDate]); // Re-run effect when selectedDate changes
  
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };

    const minDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const maxDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <div>
        <h1>Fixtures</h1>
        <label>
          Select date: 
          <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange} 
            min={minDate}
            max={maxDate}
          />
        </label>
        <ul>
          {fixtures.map((fixture, index) => (
            <li key={index}>
              <h2>{fixture.league.name}</h2>
              <p>{fixture.teams.home.name} vs {fixture.teams.away.name}</p>
              <p>Score: {fixture.score.fulltime.home} - {fixture.score.fulltime.away}</p>
              {/* Add more fixture details here as needed */}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default App;
