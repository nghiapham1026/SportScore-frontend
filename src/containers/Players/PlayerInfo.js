// PlayerInfo.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayers, getPlayerSeasons } from '../../utils/dataController';
import PlayerStatistics from './PlayerStatistics'; // Import the new component
import "./PlayerInfo.css";

const PlayerInfo = () => {
    const { playerId } = useParams();
    const [playerData, setPlayerData] = useState(null);
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('');

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const seasonData = await getPlayerSeasons({ player: playerId });
                setSeasons(seasonData.seasons.map(s => s.year));
                setSelectedSeason(seasonData.seasons[0].year);
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
                const data = await getPlayers({ id: playerId, season: selectedSeason.toString() });
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
        <div className="player-container">
            <h1>Player Information</h1>
            <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
                {seasons.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <img src={playerData[0].player.photo} alt={playerData[0].player.name} className="player-photo"/>
            <p><strong>Name:</strong> {playerData[0].player.name}</p>
            <p><strong>First Name:</strong> {playerData[0].player.firstname}</p>
            <p><strong>Last Name:</strong> {playerData[0].player.lastname}</p>
            <p><strong>Age:</strong> {playerData[0].player.age}</p>
            <p><strong>Date of Birth:</strong> {playerData[0].player.birth.date}</p>
            <p><strong>Place of Birth:</strong> {playerData[0].player.birth.place}</p>
            <p><strong>Country:</strong> {playerData[0].player.birth.country}</p>
            <p><strong>Nationality:</strong> {playerData[0].player.nationality}</p>
            <p><strong>Height:</strong> {playerData[0].player.height}</p>
            <p><strong>Weight:</strong> {playerData[0].player.weight}</p>
            <p><strong>Injured:</strong> {playerData[0].player.injured ? 'Yes' : 'No'}</p>
            <PlayerStatistics statistics={playerData[0].statistics} />
        </div>
    );
};

export default PlayerInfo;
