import React from 'react';
import './HeadToHead.css';

function HeadToHead({ headToHeadData }) {
    return (
        <div className="headToHeadContainer">
            <h2 className="headToHeadTitle">Head-to-Head Data</h2>
            {headToHeadData.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date)).map((match, idx) => (
                <div key={idx} className="matchItem">
                    <div className="matchDate">
                        <strong>Date:</strong> {new Date(match.fixture.date).toLocaleDateString()}
                    </div>
                    <div className="matchScore">
                        <strong>Score:</strong> {match.teams.home.name} {match.goals.home} - {match.goals.away} {match.teams.away.name}
                    </div>
                    <div className="matchVenue">
                        <strong>Venue:</strong> {match.fixture.venue.name}, {match.fixture.venue.city}
                    </div>
                    {idx < headToHeadData.length - 1 && <hr className="hrStyle" />} {/* Don't render <hr> after last item */}
                </div>
            ))}
        </div>
    );
}

export default HeadToHead;
