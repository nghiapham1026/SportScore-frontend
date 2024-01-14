import React, { useState, useEffect, useContext } from 'react';
import { fetchFixtures } from '../../utils/dataController';
import styles from './Favorites.module.css';
import { AuthContext } from '../../context/AuthContext';

function Favorites() {
  const today = new Date().toISOString().slice(0, 10);
  const { user, userData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(today);
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const fetchLeagueFixtures = async () => {
      console.log('Fetching fixtures for date:', selectedDate);
      try {
        // Fetch all fixtures for the selected date
        const allFixturesForDate = await fetchFixtures({ date: selectedDate });

        // Filter these fixtures to include only those from favorite leagues
        const favoriteLeagueIDs = new Set(
          userData.favoriteLeagues.map((league) => league.id)
        );
        const filteredFixtures = allFixturesForDate.filter((fixture) =>
          favoriteLeagueIDs.has(fixture.league.id)
        );

        setFixtures(filteredFixtures);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      }
    };

    console.log('Clearing previous fixtures');
    setFixtures([]);
    fetchLeagueFixtures();
  }, [userData, selectedDate]);

  const handleDateChange = (event) => {
    console.log('Date changed:', event.target.value);
    setSelectedDate(event.target.value);
  };

  const favoriteLeagues = userData.favoriteLeagues;

  if (!user) return <div>Please log in to view your favorites.</div>;

  return (
    <div>
      <h2>Favorites Feed for {user.displayName || user.email}</h2>
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
                {fixture.league.name} - {fixture.teams.home.name} vs.{' '}
                {fixture.teams.away.name}
                {/* Add other fixture details you want to display */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Favorites;
