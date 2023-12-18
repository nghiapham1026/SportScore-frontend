import React from "react";
import './MatchLineup.css';
import { Link } from 'react-router-dom';

function MatchLineup({ lineupData }) {
    if (!lineupData) {
        return <p>No lineup data available.</p>;
    }

    return (
        <div className="lineup-container">
            {lineupData.map(team => (
                <div key={team.team.id} className="team-lineup">
                    <h2>{team.team.name}</h2>
                    <img src={team.team.logo} alt={`${team.team.name} logo`} />
                    <p>Formation: {team.formation}</p>
                    <div className="starting-eleven">
                        <h3>Starting XI:</h3>
                        <ul>
                            {team.startXI.map(player => (
                                <li key={player.id}>
                                    <Link to={`/players/${player.id}`}>{player.name} (#{player.number}) - {player.pos}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="substitutes">
                        <h3>Substitutes:</h3>
                        <ul>
                            {team.substitutes.map(sub => (
                                <li key={sub.id}>
                                    <Link to={`/players/${sub.id}`}>{sub.name} (#{sub.number}) - {sub.pos}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="coach">
                        <h3>Manager:</h3>
                        <p>{team.coach.name}</p>
                        <img src={team.coach.photo} alt={`${team.coach.name}`} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MatchLineup;
