import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split('T')[0]);

    const [expandedLeagues, setExpandedLeagues] = useState({});
    const [expandedFixtures, setExpandedFixtures] = useState({});
  
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

    const groupByLeague = (fixturesArray) => {
        return fixturesArray.reduce((acc, fixture) => {
          const leagueName = fixture.league.name;
          if (!acc[leagueName]) {
            acc[leagueName] = [];
          }
          acc[leagueName].push(fixture);
          return acc;
        }, {});
    }

    const toggleLeague = (leagueName) => {
        setExpandedLeagues(prev => ({
          ...prev,
          [leagueName]: !prev[leagueName]
        }));
      };
  
      const toggleFixture = (fixtureId) => {
        setExpandedFixtures(prev => ({
          ...prev,
          [fixtureId]: !prev[fixtureId]
        }));
      };
  
    const groupedFixtures = groupByLeague(fixtures);
  
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };

    const minDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const maxDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    const styles = {
        container: {
            fontFamily: "'Arial', sans-serif",
            padding: "20px",
            backgroundColor: "#f7f9fc",
        },
        header: {
            marginBottom: "20px",
        },
        dateInput: {
            margin: "20px 0",
        },
        listItem: {
            backgroundColor: "#fff",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
        },
        listItemHover: {
            transform: "scale(1.02)",
        },
        teamLogo: {
            width: "50px",
            height: "50px",
            marginRight: "10px",
        },
        leagueLogo: {
            width: "30px",
            height: "30px",
            marginRight: "10px",
        }
    };

    return (
        <div style={styles.container}>
          <h1 style={styles.header}>Fixtures</h1>
          <label style={styles.dateInput}>
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
            {Object.keys(groupedFixtures).map(leagueName => (
              <React.Fragment key={leagueName}>
                <h2 style={{marginTop: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px', cursor: 'pointer'}}
                    onClick={() => toggleLeague(leagueName)}>
                    <img src={groupedFixtures[leagueName][0].league.logo} alt={`${leagueName} logo`} style={styles.leagueLogo} />
                    {leagueName}
                </h2>
                {expandedLeagues[leagueName] && groupedFixtures[leagueName].map((fixture, index) => (
                  <li key={index} style={styles.listItem} onClick={() => toggleFixture(fixture.fixture.id)}>
                    <h3 style={{cursor: 'pointer'}}>
                      <img src={fixture.teams.home.logo} alt={`${fixture.teams.home.name} logo`} style={styles.teamLogo} />
                      {fixture.teams.home.name} vs 
                      <img src={fixture.teams.away.logo} alt={`${fixture.teams.away.name} logo`} style={styles.teamLogo} />
                      {fixture.teams.away.name}
                    </h3>
                    {expandedFixtures[fixture.fixture.id] && (
                      <div>
                        <p>Date & Time: {new Date(fixture.fixture.date).toLocaleString()} ({fixture.fixture.timezone})</p>
                <p>Venue: {fixture.fixture.venue.name}, {fixture.fixture.venue.city}</p>
                <p>Referee: {fixture.fixture.referee}</p>
                <p>Status: {fixture.fixture.status.long} ({fixture.fixture.status.short}) - {fixture.fixture.status.elapsed} mins elapsed</p>
  
                <p>Score (Halftime): {fixture.score.halftime.home} - {fixture.score.halftime.away}</p>
                <p>Score (Fulltime): {fixture.score.fulltime.home} - {fixture.score.fulltime.away}</p>
                <p>Score (Extra time): {fixture.score.extratime.home} - {fixture.score.extratime.away}</p>
                <p>Score (Penalty): {fixture.score.penalty.home} - {fixture.score.penalty.away}</p>
  
                <p>Goals: Home - {fixture.goals.home}, Away - {fixture.goals.away}</p>
                      </div>
                    )}
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </div>
    );
};

export default App;