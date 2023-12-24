import React from 'react';
import styles from './HeadToHead.module.css';  // Updated import statement

function HeadToHead({ headToHeadData }) {
    return (
        <div className={styles.headToHeadContainer}>
            <h2 className={styles.headToHeadTitle}>Head-to-Head Data</h2>
            {headToHeadData.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date)).map((match, idx) => (
                <div key={idx} className={styles.matchItem}>
                    <div className={styles.matchDate}>
                        <strong>Date:</strong> {new Date(match.fixture.date).toLocaleDateString()}
                    </div>
                    <div className={styles.matchScore}>
                        <strong>Score:</strong> {match.teams.home.name} {match.goals.home} - {match.goals.away} {match.teams.away.name}
                    </div>
                    <div className={styles.matchVenue}>
                        <strong>Venue:</strong> {match.fixture.venue.name}, {match.fixture.venue.city}
                    </div>
                    {idx < headToHeadData.length - 1 && <hr className={styles.hrStyle} />} {/* Don't render <hr> after last item */}
                </div>
            ))}
        </div>
    );
}

export default HeadToHead;
