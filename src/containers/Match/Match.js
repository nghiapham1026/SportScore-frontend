import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams, useLocation } from 'react-router-dom';
import './Match.css';  // Import the new CSS file

function Match() {
    const { fixtureId } = useParams();
    const location = useLocation();

    // Extract team IDs from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const team1Id = searchParams.get('team1');
    const team2Id = searchParams.get('team2');
    const team1Logo = searchParams.get('team1Logo');
    const team2Logo = searchParams.get('team2Logo');
    const team1Score = searchParams.get('team1Score');
    const team2Score = searchParams.get('team2Score');
    
    const [statistics, setStatistics] = useState(null);
    const [headToHeadData, setHeadToHeadData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`https://sportscore-a1cf52e3ff48.herokuapp.com/fixtures/db/getStatistics`, {
                    params: { fixture: fixtureId }
                });
                setStatistics(response.data.allFixtureStatistics);

                const h2hResponse = await axios.get(`https://sportscore-a1cf52e3ff48.herokuapp.com/fixtures/db/getHeadToHead?h2h=${team1Id}-${team2Id}`);
                setHeadToHeadData(h2hResponse.data.allHeadToHeadFixtures);
                console.log(team1Id, team2Id);

            } catch (err) {
                setError(err.message);
            }
        };
        fetchStatistics();
    }, [fixtureId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!statistics) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="team-score-container">
    <img src={team1Logo} alt="Team 1 Logo" className="team-logo" />
    <span className="score">
        {team1Score !== 'null' && team2Score !== 'null' ? `${team1Score} - ${team2Score}` : ' - '}
    </span>
    <img src={team2Logo} alt="Team 2 Logo" className="team-logo" />
</div>
            <div className="container">
                <div className="teamsContainer">
                    {statistics.map((teamStats) => (
                        <div key={teamStats.team.id} className="teamSection">
                            <h2 className="teamName">{teamStats.team.name}</h2>
                            <img src={teamStats.team.logo} alt={`${teamStats.team.name} logo`} className="teamLogo" />
                            <ul className="statsList">
                                {teamStats.statistics.map((stat, index) => (
                                    <li key={index} className="statItem">
                                        {stat.type}: {stat.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
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
            </div>
        </div>
    );    
}

export default Match;