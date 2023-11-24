import React, { useState, useEffect } from 'react';
import { getTopScorers } from '../../utils/dataController';
import './LeagueScorers.css'; // Create and import a CSS file for styling

const LeagueScorers = ({ leagueId, season }) => {
    const [topScorers, setTopScorers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopScorers = async () => {
            try {
                const scorers = await getTopScorers({ league: leagueId, season: season.year });
                setTopScorers(scorers);
            } catch (err) {
                setError(err.message);
            }
        };
        if (leagueId && season) {
            fetchTopScorers();
        }
    }, [leagueId, season]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!topScorers.length) {
        return <p>No top scorers data available.</p>;
    }

    return (
        <div className="top-scorers-container">
            <h1>Top Scorers</h1>
            <table className="scorers-table">
                <thead>
                    <tr>
                        <th className="player-rank">Player</th>
                        <th className="goals">Goals</th>
                    </tr>
                </thead>
                <tbody>
                    {topScorers.map((scorer, index) => (
                        <tr key={scorer.player.id}>
                            <td>
                                <div className="player-info">
                                    <span className="player-rank">{index + 1}.</span>
                                    <img src={scorer.player.photo} alt={scorer.player.name} className="player-photo" />
                                    <span>{scorer.player.name}</span>
                                    <img src={scorer.statistics[0].team.logo} alt={scorer.statistics[0].team.name} className="team-logo" />
                                </div>
                            </td>
                            <td className="goals">{scorer.statistics[0].goals.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeagueScorers;
