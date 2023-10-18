import React from 'react';
import './MatchScore.css';

function MatchScore({ team1Logo, team2Logo, team1Score, team2Score, eventData }) {
    const team1Goals = (eventData || []).filter(event => event.type === "Goal" && event.team.logo === team1Logo);
    const team2Goals = (eventData || []).filter(event => event.type === "Goal" && event.team.logo === team2Logo);


    return (
        <div className="team-score-container">
            <div className="team-info">
                <img src={team1Logo} alt="Team 1 Logo" className="team-logo" />
                <div className="goal-details">
                    {team1Goals.map(goal => (
                        <div key={goal._id}>
                            {goal.player.name} {goal.time.elapsed}'
                        </div>
                    ))}
                </div>
            </div>
            <span className="score">
                {(team1Score !== null && team2Score !== null) ? `${team1Score} - ${team2Score}` : ' - '}
            </span>
            <div className="team-info">
                <img src={team2Logo} alt="Team 2 Logo" className="team-logo" />
                <div className="goal-details">
                    {team2Goals.map(goal => (
                        <div key={goal._id}>
                            {goal.player.name} {goal.time.elapsed}'
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MatchScore;
