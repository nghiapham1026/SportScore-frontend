import React from 'react';
import './MatchStatistics.css';

function MatchStatistics({ teamStats }) {
    return (
        <div className="teamSection">
            <img src={teamStats.team.logo} alt={`${teamStats.team.name} logo`} className="teamLogo" />
            <div className="statsList">
                {teamStats.statistics.map((stat, index) => (
                    <div key={index} className="statItem">
                        <span>{stat.type}</span>
                        <span>{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MatchStatistics;
