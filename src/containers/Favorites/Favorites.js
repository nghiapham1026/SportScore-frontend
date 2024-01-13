import React, { useState, useEffect, useContext } from 'react';
import { fetchFixtures } from '../../utils/dataController';
import styles from './Favorites.module.css';
import { AuthContext } from '../../context/AuthContext';

function Favorites() {
  const today = new Date().toISOString().slice(0, 10);
  const { user, userData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(today);
  const [fixtures, setFixtures] = useState([]);
  
  if (!user) return <div>Please log in to view your favorites.</div>;

  // Hardcoded userData for debugging
  /*const userData = {
    favoriteLeagues: [
      {
        logo: "https://media.api-sports.io/football/leagues/78.png",
        id: 78,
        name: "Bundesliga"
      },
      {
        name: "Serie A",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        id: 135
      },
      {
        name: "Premier League",
        logo: "https://media.api-sports.io/football/leagues/39.png",
        id: 39
      }
    ]
  };*/

  const handleDateChange = (event) => {
    console.log('Date changed:', event.target.value);
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const fetchLeagueFixtures = async () => {
      if (selectedDate) {
        console.log('Fetching fixtures for date:', selectedDate);
        try {
          // Fetch all fixtures for the selected date
          const allFixturesForDate = await fetchFixtures({ date: selectedDate });
  
          // Filter these fixtures to include only those from favorite leagues
          const favoriteLeagueIDs = new Set(userData.favoriteLeagues.map(league => league.id));
          const filteredFixtures = allFixturesForDate.filter(fixture => 
            favoriteLeagueIDs.has(fixture.league.id));
  
          setFixtures(filteredFixtures);
        } catch (error) {
          console.error('Error fetching fixtures:', error);
        }
      }
    };
  
    console.log('Clearing previous fixtures');
    setFixtures([]);
    fetchLeagueFixtures();
  }, [selectedDate]); // Removed userData.favoriteLeagues from dependencies

  const favoriteLeagues = userData.favoriteLeagues;

  return (
    <div>
      <h2>Favorites Feed</h2>
      {favoriteLeagues.length > 0 ? (
        <ul>
          {favoriteLeagues.map((league, index) => (
            <li key={index}>
              {league.name}
              {league.logo && <img src={league.logo} alt={league.name} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no favorite leagues added. Start adding some!</p>
      )}
      <label htmlFor="calendar">Choose a date:</label>
      <input
        type="date"
        id="calendar"
        name="calendar"
        value={selectedDate}
        onChange={handleDateChange}
        className={styles.calendarInput}
      />
      {fixtures.length > 0 && (
        <div>
          <h3>Fixtures for {selectedDate}</h3>
          <ul>
          {fixtures.map((fixture, index) => (
  <li key={index}>
    {fixture.league.name} - {fixture.teams.home.name} vs. {fixture.teams.away.name}
    {/* Add other fixture details you want to display */}
  </li>
))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Favorites;
