// MatchTimeline.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MatchTimeline.css'; // You can create and import a dedicated CSS file for MatchTimeline

const MatchTimeline = ({ eventData, team1Logo }) => {
    // Sort the events based on elapsed time
    const sortedEvents = (eventData || []).sort((a, b) => a.time.elapsed - b.time.elapsed);

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
        </div>
    );
};

export default MatchTimeline;
