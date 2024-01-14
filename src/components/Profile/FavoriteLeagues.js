import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

  const handleLeagueSelect = (league) => {
    const isCurrentlySelected = selectedLeagues.some(
      (selected) => selected.id === league.id
    );
    const updatedSelection = isCurrentlySelected
      ? selectedLeagues.filter((selected) => selected.id !== league.id)
      : [
          ...selectedLeagues,
          { id: league.id, name: league.name, logo: league.logo },
        ];
    setSelectedLeagues(updatedSelection);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.leaguesContainer}>
      {leagues.map((item) => (
        <div
          key={item.league.id}
          onClick={() => handleLeagueSelect(item.league)}
          className={
            selectedLeagues.some((league) => league.id === item.league.id)
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

FavoriteLeagues.propTypes = {
  selectedLeagues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string,
    })
  ).isRequired,
  setSelectedLeagues: PropTypes.func.isRequired,
};

export default FavoriteLeagues;
