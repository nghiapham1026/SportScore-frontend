// LeagueAssists.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        return <p className="league-assists-error">Error: {error}</p>;
    }

    if (!topAssists.length) {
        return <p className="league-assists-no-data">No top assists data available.</p>;
    }

    return (
        <div className="league-assists-container">
            <h1 className="league-assists-title">Top Assists</h1>
            <table className="league-assists-table">
                <thead>
                    <tr>
                        <th className="league-assists-player-row">Player</th>
                        <th className="league-assists-assists">Assists</th>
                    </tr>
                </thead>
                <tbody>
                    {topAssists.map((assist, index) => (
                        <tr key={assist.player.id}>
                            <td className='league-assists-player-row'>
                                <div className="league-assists-player-info">
                                    <span className="league-assists-player-rank">{index + 1}.</span>
                                    <Link to={`/players/${assist.player.id}`}>
                                        <img src={assist.player.photo} alt={assist.player.name} className="league-assists-player-photo" />
                                        <span className="league-assists-player-name">{assist.player.name}</span>
                                    </Link>
                                    <Link to={`/team/${assist.statistics[0].team.id}`}>
                                        <img src={assist.statistics[0].team.logo} alt={assist.statistics[0].team.name} className="league-assists-team-logo" />
                                        <span className="league-assists-team-name">{assist.statistics[0].team.name}</span>
                                    </Link>
                                </div>
                            </td>
                            <td className="league-assists-assists">{assist.statistics[0].goals.assists}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeagueAssists;
