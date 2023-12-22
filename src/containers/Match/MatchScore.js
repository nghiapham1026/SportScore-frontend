// MatchScore.js
import React from 'react';
import './MatchScore.css';
import { Link } from 'react-router-dom';
import MatchTimeline from './MatchTimeline';

function MatchScore({ team1Logo, team2Logo, team1Score, team2Score, team1Id, team2Id, eventData }) {
    const isRegularGoal = (event) => event.type === "Goal" && event.detail !== "Penalty" && event.comments !== "Penalty Shootout";

    const team1Goals = (eventData || []).filter(event => isRegularGoal(event) && event.team.logo === team1Logo);
    const team2Goals = (eventData || []).filter(event => isRegularGoal(event) && event.team.logo === team2Logo);

    return (
        <div className="match-container">
            <div className="team-score-container">
                <div className="team-info">
                    <Link to={`/team/${team1Id}`}><img src={team1Logo} alt="Team 1 Logo" className="team-logo" /></Link>
                    <div className="goal-details">
                        {team1Goals.map(goal => (
                            <Link to={`/players/${goal.player.id}`} key={goal._id}><div>{goal.player.name} {goal.time.elapsed}'</div></Link>
                        ))}
                    </div>
                </div>
                <span className="score">{team1Score} - {team2Score}</span>
                <div className="team-info">
                    <div className="goal-details">
                        {team2Goals.map(goal => (
                            <Link to={`/players/${goal.player.id}`} key={goal._id}><div>{goal.player.name} {goal.time.elapsed}'</div></Link>
                        ))}
                    </div>
                    <Link to={`/team/${team2Id}`}><img src={team2Logo} alt="Team 2 Logo" className="team-logo" /></Link>
                </div>
            </div>
            
            <MatchTimeline eventData={eventData} team1Logo={team1Logo} />
        </div>
    );
}

export default MatchScore;