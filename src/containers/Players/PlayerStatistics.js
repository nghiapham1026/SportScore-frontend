// PlayerStatistics.js
import React, { useState } from 'react';
import './PlayerStatistics.css';

const PlayerStatistics = ({ statistics }) => {
    // Initialize visibility state as an object with league IDs as keys
    const [visibility, setVisibility] = useState(
        statistics.reduce((acc, stat) => {
            acc[stat.league.id] = false;
            return acc;
        }, {})
    );

    const toggleVisibility = (id) => {
        setVisibility(prev => ({
            ...prev,
            [id]: !prev[id] // Toggle the visibility for the specific ID
        }));
    };

    return statistics.map(stat => (
        <div key={stat.league.id} className="statistics-container">
            <button className="toggle-button" onClick={() => toggleVisibility(stat.league.id)}>
                {stat.league.name} - {stat.league.season}
            </button>
            {visibility[stat.league.id] && (
                <div className="statistics-details">
                    <img src={stat.team.logo} alt={stat.team.name} />
                    <p>Appearances: {stat.games.appearences}</p>
                    <p className="important-stat">Goals: {stat.goals.total}</p>
                    <p>Assists: {stat.goals.assists}</p>
                    <p>Minutes Played: {stat.games.minutes}</p>
                    <p>Position: {stat.games.position}</p>
                    <p>Yellow Cards: {stat.cards.yellow}</p>
                    <p>Red Cards: {stat.cards.red}</p>
                    {/* ... other statistics as needed ... */}
                </div>
            )}
        </div>
    ));
};

export default PlayerStatistics;
