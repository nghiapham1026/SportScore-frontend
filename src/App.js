import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  
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
                <h2>{fixture.league.name} - {fixture.league.country} (Season: {fixture.league.season}, Round: {fixture.league.round})</h2>
                <img src={fixture.league.logo} alt={`${fixture.league.name} logo`} />
  
                <h3>{fixture.teams.home.name} vs {fixture.teams.away.name}</h3>
                <img src={fixture.teams.home.logo} alt={`${fixture.teams.home.name} logo`} />
                <img src={fixture.teams.away.logo} alt={`${fixture.teams.away.name} logo`} />
  
                <p>Date & Time: {new Date(fixture.fixture.date).toLocaleString()} ({fixture.fixture.timezone})</p>
                <p>Venue: {fixture.fixture.venue.name}, {fixture.fixture.venue.city}</p>
                <p>Referee: {fixture.fixture.referee}</p>
                <p>Status: {fixture.fixture.status.long} ({fixture.fixture.status.short}) - {fixture.fixture.status.elapsed} mins elapsed</p>
  
                <p>Score (Halftime): {fixture.score.halftime.home} - {fixture.score.halftime.away}</p>
                <p>Score (Fulltime): {fixture.score.fulltime.home} - {fixture.score.fulltime.away}</p>
                <p>Score (Extra time): {fixture.score.extratime.home} - {fixture.score.extratime.away}</p>
                <p>Score (Penalty): {fixture.score.penalty.home} - {fixture.score.penalty.away}</p>
  
                <p>Goals: Home - {fixture.goals.home}, Away - {fixture.goals.away}</p>
  
                {/* You can continue adding more fixture details here if needed */}
              </li>
            ))}
          </ul>
        </div>
      );
  };
  
  export default App;