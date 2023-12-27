import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFixtures } from '../../utils/dataController';
import styles from './LeagueResults.module.css'; // Updated import statement
import PropTypes from 'prop-types';

const LeagueResults = ({ leagueId, selectedSeason }) => {
  const [results, setResults] = useState([]);
  const [selectedRound, setSelectedRound] = useState('');

  useEffect(() => {
    const fetchLeagueResults = async () => {
      if (selectedSeason) {
        try {
          const fetchedResults = await fetchFixtures({
            league: leagueId,
            season: selectedSeason.year,
            status: 'FT-AET-PEN',
          });
          setResults(fetchedResults);
        } catch (err) {
          console.error('Error fetching results:', err);
        }
      }
    };
    fetchLeagueResults();
  }, [leagueId, selectedSeason]);

  if (!Array.isArray(results) || results.length === 0) {
    return <p>No data for this selected season.</p>;
  }

  const filteredResults = selectedRound
    ? results.filter((result) => result.league.round === selectedRound)
    : results;

  return (
    <div className={styles.resultsContainer}>
      <h3>Results</h3>

      <select
        className={styles.roundSelector}
        value={selectedRound}
        onChange={(e) => setSelectedRound(e.target.value)}
      >
        <option value="">All Rounds</option>
        {[...new Set(results.map((result) => result.league.round))].map(
          (round) => (
            <option key={round} value={round}>
              {round}
            </option>
          )
        )}
      </select>

      <div>
        {filteredResults.map((result, index) => (
          <div key={index} className={styles.resultItem}>
            <div className={styles.fixtureHeader}>
              <img
                className={styles.leagueLogo}
                src={result.league.logo}
                alt={result.league.name}
              />
              <span>
                {result.league.name} - {result.league.country}
              </span>
              <img
                className={styles.countryFlag}
                src={result.league.flag}
                alt={result.league.country}
              />
            </div>
            <div className={styles.fixtureDate}>
              {new Date(result.fixture.date).toLocaleDateString()}{' '}
              {new Date(result.fixture.date).toLocaleTimeString()}
            </div>
            <div className={styles.fixtureVenue}>
              {result.fixture.venue.name}, {result.fixture.venue.city}
            </div>
            <div className={styles.matchDetails}>
              <div className={styles.resultItemTeam}>
                <Link to={`/team/${result.teams.home.id}`}>
                  <img
                    className={styles.teamLogo}
                    src={result.teams.home.logo}
                    alt={result.teams.home.name}
                  />
                  <span>{result.teams.home.name}</span>
                </Link>
              </div>

              <div className={styles.scoreMain}>
                <Link to={`/match/${result.fixture.id}`}>
                  {result.goals.home} - {result.goals.away}
                </Link>
              </div>

              <div className={styles.resultItemTeam}>
                <Link to={`/team/${result.teams.away.id}`}>
                  <img
                    className={`${styles.teamLogo} ${styles.teamLogoRight}`}
                    src={result.teams.away.logo}
                    alt={result.teams.away.name}
                  />
                  <span>{result.teams.away.name}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

LeagueResults.propTypes = {
  leagueId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  selectedSeason: PropTypes.shape({
    year: PropTypes.number.isRequired,
  }).isRequired,
};

export default LeagueResults;
