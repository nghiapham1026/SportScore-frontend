// Players.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayers, getPlayerSeasons } from '../../utils/dataController';
import PlayerStatistics from './PlayerStatistics'; // Import PlayerStatistics
import PlayerDetails from './PlayerDetails'; // Import PlayerDetails
import styles from './Players.module.css';

const Players = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const seasonData = await getPlayerSeasons({ player: playerId });
        // Sort seasons in descending order
        const sortedSeasons = seasonData.seasons
          .map((s) => s.year)
          .sort((a, b) => b - a);
        setSeasons(sortedSeasons);
        setSelectedSeason(sortedSeasons[0]); // Set the most recent season as selected
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    };

    fetchSeasons();
  }, [playerId]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!selectedSeason) return;

      try {
        const data = await getPlayers({
          id: playerId,
          season: selectedSeason.toString(),
        });
        setPlayerData(data);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayerData();
  }, [playerId, selectedSeason]);

  if (!playerData) {
    return <p>Loading player data or no data available...</p>;
  }

  return (
    <div className={styles.playerContainer}>
      <h1>Player Information</h1>
      <select
        value={selectedSeason}
        onChange={(e) => setSelectedSeason(e.target.value)}
      >
        {seasons.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <PlayerDetails player={playerData[0].player} />
      <PlayerStatistics statistics={playerData[0].statistics} />
    </div>
  );
};

export default Players;
