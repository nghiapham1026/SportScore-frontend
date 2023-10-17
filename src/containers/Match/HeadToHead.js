import React from 'react';
import './HeadToHead.css';

function HeadToHead({ headToHeadData }) {
    return (
        <div>
            <h2>Head-to-Head Data</h2>
            <ul>
                {headToHeadData.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date)).map((match, idx) => (
                    <li key={idx}>
                        <strong>Date:</strong> {new Date(match.fixture.date).toLocaleDateString()}
                        <br />
                        <strong>Score:</strong> {match.goals.home} - {match.goals.away}
                        <br />
                        <strong>Venue:</strong> {match.fixture.venue.name}
                        <br />
                        <strong>Status:</strong> {match.fixture.status.long}
                        <br />
                        <strong>Referee:</strong> {match.fixture.referee}
                        <br />
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HeadToHead;
