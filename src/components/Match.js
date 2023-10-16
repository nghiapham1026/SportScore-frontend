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

    return (
        <div>
            {statistics.map((teamStats) => (
                <div key={teamStats.team.id}>
                    <h2>{teamStats.team.name}</h2>
                    <img src={teamStats.team.logo} alt={`${teamStats.team.name} logo`} />
                    <ul>
                        {teamStats.statistics.map((stat, index) => (
                            <li key={index}>
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
