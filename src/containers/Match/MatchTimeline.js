import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MatchTimeline.module.css'; // Updated import statement
import PenaltyShootout from './PenaltyShootout';

const MatchTimeline = ({ eventData, team1Logo, team2Logo }) => {
    // Sort the events based on elapsed time
    const sortedEvents = (eventData || []).sort((a, b) => a.time.elapsed - b.time.elapsed);
    const shootoutData = (eventData || [])
        .filter(event => event.comments === "Penalty Shootout")
        .sort((a, b) => a.sequenceNumber - b.sequenceNumber);

    return (
        <div className={styles.timelineContainer}>
            {sortedEvents.map(event => (
                <div key={event._id} className={`${styles.timelineEvent} ${event.team.logo === team1Logo ? styles.left : styles.right}`}>
                    <div className={styles.eventCircle}></div>
                    <div className={styles.eventDetails}>
                        {event.detail} - <Link to={`/players/${event.player.id}`}>{event.player.name} {event.time.elapsed}'</Link>
                        {event.comments === "Penalty Shootout" && <span className={styles.penaltyShootout}> (Penalty Shootout)</span>}
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
