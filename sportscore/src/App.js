import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchFixtures = async () => {
        try {
          const response = await axios.get('https://sportscore-a1cf52e3ff48.herokuapp.com/fixtures/getFixtures', {
            params: { date: '2023-10-05' }
          });
          setFixtures(response.data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchFixtures();
    }, []);
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <div>
        <h1>Fixtures</h1>
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
