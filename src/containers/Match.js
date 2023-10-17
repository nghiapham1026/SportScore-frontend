import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

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

    const styles = {
        container: {
            display: 'flex',  // Set the container to be a flex container
            flexDirection: 'column',  // Change direction to column
            padding: '20px',
            backgroundColor: '#f7f9fc',
            fontFamily: "'Arial', sans-serif",
        },
        teamsContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',  // Add some margin to separate from head-to-head data
        },
        teamSection: {
            flex: '0 0 48%',  // Each team section takes up 48% of the container width
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
            margin: '20px 0',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        teamName: {
            fontSize: '24px',
            textAlign: 'center',
            margin: '20px 0',
        },
        teamLogo: {
            display: 'block',
            margin: '0 auto',
            width: '100px',
            height: '100px',
        },
        statsList: {
            listStyleType: 'none',
            paddingLeft: '0',
        },
        statItem: {
            padding: '10px 0',
            borderBottom: '1px solid #eee',
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <img src={team1Logo} alt="Team 1 Logo" style={{ width: '120px', height: '120px', marginRight: '10px' }} />
                <span style={{ fontSize: '24px', margin: '0 10px' }}>
                    {team1Score !== 'null' && team2Score !== 'null' ? `${team1Score} - ${team2Score}` : ' - '}
                </span>
                <img src={team2Logo} alt="Team 2 Logo" style={{ width: '120px', height: '120px', marginLeft: '10px' }} />
            </div>
            <div style={styles.container}>
                <div style={styles.teamsContainer}>
                    {statistics.map((teamStats) => (
                        <div key={teamStats.team.id} style={styles.teamSection}>
                            <h2 style={styles.teamName}>{teamStats.team.name}</h2>
                            <img src={teamStats.team.logo} alt={`${teamStats.team.name} logo`} style={styles.teamLogo} />
                            <ul style={styles.statsList}>
                                {teamStats.statistics.map((stat, index) => (
                                    <li key={index} style={styles.statItem}>
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