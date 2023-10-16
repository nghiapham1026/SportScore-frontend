import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Match() {
    const { fixtureId } = useParams();
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`https://sportscore-a1cf52e3ff48.herokuapp.com/fixtures/db/getStatistics`, {
                    params: { fixture: fixtureId }
                });
                setStatistics(response.data.allFixtureStatistics);
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
            justifyContent: 'space-between',  // Space out the team sections
            padding: '20px',
            backgroundColor: '#f7f9fc',
            fontFamily: "'Arial', sans-serif",
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
        <div style={styles.container}>
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
    );
}

export default Match;

