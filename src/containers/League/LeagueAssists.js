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
        return <p>Error: {error}</p>;
    }

    if (!topAssists.length) {
        return <p>No top assists data available.</p>;
    }

    return (
        <div className="top-assists-container">
            <h1>Top Assists</h1>
            <table className="assists-table">
                <thead>
                    <tr>
                        <th className="player-rank">Player</th>
                        <th className="assists">Assists</th>
                    </tr>
                </thead>
                <tbody>
                    {topAssists.map((assist, index) => (
                        <tr key={assist.player.id}>
                            <td>
                                <Link to={`/players/${assist.player.id}`}>
                                <span className="player-rank">{index + 1}.</span>
                                <img src={assist.player.photo} alt={assist.player.name} className="player-photo" />
                                {assist.player.name}
                                <img src={assist.statistics[0].team.logo} alt={assist.statistics[0].team.name} className="team-logo" />
                                </Link>
                            </td>
                            <td className="assists">{assist.statistics[0].goals.assists}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeagueAssists;
