import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchFixtures } from '../../utils/dataController';
import styles from './Favorites.module.css';

function Favorites() {
    const today = new Date().toISOString().slice(0, 10);
  const { user, userData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(today);
  const [fixtures, setFixtures] = useState([]);

  if (!user) return <div>Please log in to view your favorites.</div>;

  const handleDateChange = (event) => {
    console.log('Date changed:', event.target.value);
    setSelectedDate(event.target.value);
  };

  /*useEffect(() => {
    const fetchLeagueFixtures = async () => {
      if (selectedDate && userData.favoriteLeagues) {
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
    // Clear the previous fixtures before fetching new ones
    setFixtures([]);
  
    // Call the async function
    fetchLeagueFixtures();
  }, [selectedDate, userData.favoriteLeagues]);  */

  const favoriteLeagues = userData?.favoriteLeagues || [];

  return (
    <div>
      <h2>Favorites Feed for User: {user.email}</h2>
      {favoriteLeagues.length > 0 ? (
        <ul>
          {favoriteLeagues.map((league, index) => (
            <li key={index}>
              {league.name} {/* Display the league name */}
              {/* If there's a logo, display it */}
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
              <li key={index}>{fixture}</li> // Replace with appropriate JSX based on fixture object structure
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Favorites;
