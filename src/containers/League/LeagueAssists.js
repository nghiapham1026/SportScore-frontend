// LeagueAssists.js
import React, { useState, useEffect } from 'react';
import { getTopAssists } from '../../utils/dataController';
import './LeagueAssists.css'; // Ensure this CSS file exists and is styled appropriately

const LeagueAssists = ({ leagueId, season }) => {
    const [topAssists, setTopAssists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopAssists = async () => {
            try {
                const assists = await getTopAssists({ league: leagueId, season: season.year });
                setTopAssists(assists);
            } catch (err) {
                setError(err.message);
            }
        };
        if (leagueId && season) {
            fetchTopAssists();
        }
    }, [leagueId, season]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!topAssists.length) {
        return <p>No top assists data available.</p>;
    }

    return (
        <div className="top-assists-container">
            <h1>Top Assists</h1>
            <ul className="assists-list">
                {topAssists.map(assist => (
                    <li key={assist.player.id} className="assist-item">
                        <img src={assist.player.photo} alt={assist.player.name} className="player-photo" />
                        <div className="assist-info">
                            <h4>{assist.player.name}</h4>
                            <p>Team: <img src={assist.statistics[0].team.logo} alt={assist.statistics[0].team.name} className="team-logo" /></p>
                            <p>Assists: {assist.statistics[0].goals.assists}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeagueAssists;
