import React, { useState, useEffect, useContext } from 'react';
import { fetchFixtures } from '../../utils/dataController';
import styles from './FavoriteFixtures.module.css';
import { AuthContext } from '../../context/AuthContext';

function FavoriteFixtures({ selectedDate }) {
  const { userData } = useContext(AuthContext);
  const [fixtures, setFixtures] = useState([]);
  const [visibleLeagueId, setVisibleLeagueId] = useState(null);

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

  const toggleVisibility = (leagueId) => {
    setVisibleLeagueId(visibleLeagueId === leagueId ? null : leagueId);
  };

  const favoriteLeagues = userData?.favoriteLeagues || [];

  return (
    <div>
      <h3>Fixtures on {selectedDate}</h3>
      {favoriteLeagues.map((league) => (
        <div key={league.id} className={styles.leagueItemContainer}>
          <h4
            onClick={() => toggleVisibility(league.id)}
            className={styles.leagueHeader}
          >
            {league.logo && (
              <img
                src={league.logo}
                alt={league.name}
                className={styles.leagueLogo}
              />
            )}
            {league.name}
          </h4>
          {visibleLeagueId === league.id && (
            <ul className={styles.fixtureList}>
              {fixtures
                .filter((fixture) => fixture.league.id === league.id)
                .map((fixture, index) => (
                  <li key={index} className={styles.fixtureItem}>
                    {fixture.teams.home.name} vs. {fixture.teams.away.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default FavoriteFixtures;
