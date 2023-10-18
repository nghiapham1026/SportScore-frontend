import React from 'react';
import './MatchScore.css';

function MatchScore({ team1Logo, team2Logo, team1Score, team2Score }) {
    return (
        <div className="team-score-container">
            <img src={team1Logo} alt="Team 1 Logo" className="team-logo" />
            <span className="score">
                {(team1Score !== null && team2Score !== null) ? `${team1Score} - ${team2Score}` : ' - '}
            </span>
            <img src={team2Logo} alt="Team 2 Logo" className="team-logo" />
        </div>
    );
}

export default MatchScore;
