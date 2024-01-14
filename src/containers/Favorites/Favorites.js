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
    <div className={styles.container}>
      <h2 className={styles.header}>
        Favorites Feed for {user.displayName || user.email}
      </h2>
      {favoriteLeagues.length > 0 ? (
        <ul className={styles.leagueList}>
          {favoriteLeagues.map((league, index) => (
            <li key={index} className={styles.leagueItem}>
              {league.logo && <img src={league.logo} alt={league.name} />}
              {league.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noLeagues}>
          You have no favorite leagues added. Start adding some!
        </p>
      )}
      <label htmlFor="calendar" className={styles.calendarLabel}>
        Choose a date:
      </label>
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
          <h3>Fixtures on {selectedDate}</h3>
          <ul className={styles.fixtureList}>
            {fixtures.map((fixture, index) => (
              <li key={index} className={styles.fixtureItem}>
                {fixture.league.name} - {fixture.teams.home.name} vs.{' '}
                {fixture.teams.away.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Favorites;
