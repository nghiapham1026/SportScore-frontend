import React, { useState, useEffect, useContext } from 'react';
import { fetchFixtures } from '../../utils/dataController';
import styles from './FavoriteFixtures.module.css'; // Make sure to have the appropriate CSS
import { AuthContext } from '../../context/AuthContext';

function FavoriteFixtures({ selectedDate, setSelectedDate }) {
  const { userData } = useContext(AuthContext);
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const fetchLeagueFixtures = async () => {
      console.log('Fetching fixtures for date:', selectedDate);
      try {
        const allFixturesForDate = await fetchFixtures({ date: selectedDate });
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

    setFixtures([]);
    fetchLeagueFixtures();
  }, [userData, selectedDate]);

  return (
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
  );
}

export default FavoriteFixtures;
