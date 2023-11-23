// LeagueScorers.js
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
            <ul className="scorers-list">
                {topScorers.map(scorer => (
                    <li key={scorer.player.id} className="scorer-item">
                        <img src={scorer.player.photo} alt={scorer.player.name} className="player-photo" />
                        <div className="scorer-info">
                            <h4>{scorer.player.name}</h4>
                            <p><img src={scorer.statistics[0].team.logo} alt={scorer.statistics[0].team.name} className="team-logo" /></p>
                            <element class="goals"><p>Goals: {scorer.statistics[0].goals.total}</p></element>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeagueScorers;
