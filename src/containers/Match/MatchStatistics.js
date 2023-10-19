import React from 'react';
import './MatchStatistics.css';

function MatchStatistics({ teamStats }) {
    return (
        <div className="teamSection">
            <h2 className="teamName">{teamStats.team.name}</h2>
            <img src={teamStats.team.logo} alt={`${teamStats.team.name} logo`} className="teamLogo" />
            <ul className="statsList">
                {teamStats.statistics.map((stat, index) => (
                    <li key={index} className="statItem">
                        {stat.type}: {stat.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MatchStatistics;
