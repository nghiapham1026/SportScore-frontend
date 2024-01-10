import React, { useState, useEffect } from 'react';
import { getLeagues } from '../../utils/dataController';
import styles from './FavoriteLeagues.module.css';

function FavoriteLeagues({ selectedLeagues, setSelectedLeagues }) {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const leaguesData = await getLeagues();
        setLeagues(leaguesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchLeagues();
  }, []);

  const handleLeagueSelect = (leagueId) => {
    const isCurrentlySelected = selectedLeagues.includes(leagueId);
    const updatedSelection = isCurrentlySelected
      ? selectedLeagues.filter((id) => id !== leagueId)
      : [...selectedLeagues, leagueId];
    setSelectedLeagues(updatedSelection);
  };

  const handleSaveFavorites = () => {
    updateUserFavorites(selectedLeagues); // Ensure this updates the user's profile correctly
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.leaguesContainer}>
      {leagues.map((item) => (
        <div
          key={item.league.id}
          onClick={() => handleLeagueSelect(item.league.id)}
          className={
            selectedLeagues.includes(item.league.id)
              ? styles.selectedLeague
              : styles.league
          }
        >
          {item.league.name}
          <img src={item.league.logo} alt={item.league.name} />
        </div>
      ))}
    </div>
  );
}

export default FavoriteLeagues;
