// MatchTimeline.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MatchTimeline.css'; // You can create and import a dedicated CSS file for MatchTimeline
import PenaltyShootout from './PenaltyShootout';

const MatchTimeline = ({ eventData, team1Logo, team2Logo }) => {
    // Sort the events based on elapsed time
    const sortedEvents = (eventData || []).sort((a, b) => a.time.elapsed - b.time.elapsed);
    const shootoutData = (eventData || [])
        .filter(event => event.comments === "Penalty Shootout")
        .sort((a, b) => a.sequenceNumber - b.sequenceNumber);

    return (
        <div className="timeline-container">
            {sortedEvents.map(event => (
                <div key={event._id} className={`timeline-event ${event.team.logo === team1Logo ? 'left' : 'right'}`}>
                    <div className="event-circle"></div>
                    <div className="event-details">
                        {event.detail} - <Link to={`/players/${event.player.id}`}>{event.player.name} {event.time.elapsed}'</Link>
                        {event.comments === "Penalty Shootout" && <span className="penalty-shootout"> (Penalty Shootout)</span>}
                    </div>
                </div>
            ))}

{shootoutData.length > 0 && (
                            <PenaltyShootout 
                            shootoutData={shootoutData} 
                            team1Logo={team1Logo} 
                            team2Logo={team2Logo} 
                            />
                        )}
        </div>
    );
};

export default MatchTimeline;
