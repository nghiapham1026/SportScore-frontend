import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayers } from '../../utils/dataController'; // Import getPlayers
import "./Players.css";

const Players = () => {
    const { playerId } = useParams();
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                // Determine the season based on current date
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const season = currentDate.getMonth() < 7 ? currentYear - 1 : currentYear;

                const data = await getPlayers({ id: playerId, season: season.toString() });
                setPlayerData(data); // Update to store only player data
            } catch (error) {
                console.error('Error fetching player data:', error);
            }
        };

        fetchPlayerData();
    }, [playerId]);

    if (!playerData) {
        return <p>Loading player data or no data available...</p>;
    }

    return (
        <div className="player-container">
            <h1>Player Information</h1>
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
        </div>
    );
};

export default Players;
