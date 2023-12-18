import React from 'react';
import './MatchScore.css';
import { Link } from 'react-router-dom';

function MatchScore({ team1Logo, team2Logo, team1Score, team2Score, team1Id, team2Id, eventData }) {
    const team1Goals = (eventData || []).filter(event => event.type === "Goal" && event.team.logo === team1Logo);
    const team2Goals = (eventData || []).filter(event => event.type === "Goal" && event.team.logo === team2Logo);

    // Sort the events based on elapsed time
    const sortedEvents = (eventData || []).sort((a, b) => a.time.elapsed - b.time.elapsed);

    return (
        <div className="match-container">
            <div className="team-score-container">
                <div className="team-info">
                    <Link to={`/team/${team1Id}`}><img src={team1Logo} alt="Team 1 Logo" className="team-logo" /></Link>
                    <div className="goal-details">
                        {team1Goals.map(goal => (
                            <div key={goal._id}>{goal.player.name} {goal.time.elapsed}'</div>
                        ))}
                    </div>
                </div>
                <span className="score">{team1Score} - {team2Score}</span>
                <div className="team-info">
                    <div className="goal-details">
                        {team2Goals.map(goal => (
                            <div key={goal._id}>{goal.player.name} {goal.time.elapsed}'</div>
                        ))}
                    </div>
                    <Link to={`/team/${team2Id}`}><img src={team2Logo} alt="Team 2 Logo" className="team-logo" /></Link>
                </div>
            </div>
            
            <div className="timeline-container">
                {sortedEvents.map(event => (
                    <div key={event._id} className={`timeline-event ${event.team.logo === team1Logo ? 'left' : 'right'}`}>
                        <div className="event-circle"></div>
                        <div className="event-details">
                            {event.detail} - <Link to={`/players/${event.player.id}`}>{event.player.name} {event.time.elapsed}'</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MatchScore;