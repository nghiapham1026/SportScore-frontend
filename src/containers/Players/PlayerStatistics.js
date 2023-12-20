// PlayerStatistics.js
import React from 'react';

const PlayerStatistics = ({ statistics }) => {
    return statistics.map(stat => (
        <div key={stat.league.id} className="statistics-container">
            <h3>{stat.league.name} - {stat.league.season}</h3>
            <img src={stat.team.logo} alt={stat.team.name} />
            <p>Appearances: {stat.games.appearences}</p>
            <p>Goals: {stat.goals.total}</p>
            <p>Assists: {stat.goals.assists}</p>
            <p>Minutes Played: {stat.games.minutes}</p>
            <p>Position: {stat.games.position}</p>
            <p>Yellow Cards: {stat.cards.yellow}</p>
            <p>Red Cards: {stat.cards.red}</p>
            {/* ... other statistics as needed ... */}
        </div>
    ));
};

export default PlayerStatistics;
