// LeagueScorers.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopScorers } from '../../utils/dataController';
import './LeagueScorers.css'; // Make sure this file is correctly named and located

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
        return <p className="league-scorers-error">Error: {error}</p>;
    }

    if (!topScorers.length) {
        return <p className="league-scorers-no-data">No top scorers data available.</p>;
    }

    return (
        <div className="league-scorers-container">
            <h1 className="league-scorers-title">Top Scorers</h1>
            <table className="league-scorers-table">
                <thead>
                    <tr>
                        <th className="league-scorers-player-row">Player</th>
                        <th className="league-scorers-goals">Goals</th>
                    </tr>
                </thead>
                <tbody>
                    {topScorers.map((scorer, index) => (
                        <tr key={scorer.player.id}>
                            <td className='league-scorers-player-row'>
                                <div className="league-scorers-player-info">
                                    <span className="league-scorers-player-rank">{index + 1}.</span>
                                    <Link to={`/players/${scorer.player.id}`}>
                                        <img src={scorer.player.photo} alt={scorer.player.name} className="league-scorers-player-photo" />
                                        <span className="league-scorers-player-name">{scorer.player.name}</span>
                                    </Link>
                                    <Link to={`/team/${scorer.statistics[0].team.id}`}>
                                        <img src={scorer.statistics[0].team.logo} alt={scorer.statistics[0].team.name} className="league-scorers-team-logo" />
                                        <span>{scorer.statistics[0].team.name}</span>
                                    </Link>
                                </div>
                            </td>
                            <td className="league-scorers-goals">{scorer.statistics[0].goals.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeagueScorers;
