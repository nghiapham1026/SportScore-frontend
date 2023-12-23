import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopAssists } from '../../utils/dataController';
import styles from './LeagueAssists.module.css'; // Updated import statement

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
        return <p className={styles.leagueAssistsError}>Error: {error}</p>;
    }

    if (!topAssists.length) {
        return <p className={styles.leagueAssistsNoData}>No top assists data available.</p>;
    }

    return (
        <div className={styles.leagueAssistsContainer}>
            <h1 className={styles.leagueAssistsTitle}>Top Assists</h1>
            <table className={styles.leagueAssistsTable}>
                <thead>
                    <tr>
                        <th className={styles.leagueAssistsPlayerRow}>Player</th>
                        <th className={styles.leagueAssistsAssists}>Assists</th>
                    </tr>
                </thead>
                <tbody>
                    {topAssists.map((assist, index) => (
                        <tr key={assist.player.id}>
                            <td className={styles.leagueAssistsPlayerRow}>
                                <div className={styles.leagueAssistsPlayerInfo}>
                                    <span className={styles.leagueAssistsPlayerRank}>{index + 1}.</span>
                                    <Link to={`/players/${assist.player.id}`}>
                                        <img src={assist.player.photo} alt={assist.player.name} className={styles.leagueAssistsPlayerPhoto} />
                                        <span className={styles.leagueAssistsPlayerName}>{assist.player.name}</span>
                                    </Link>
                                    <Link to={`/team/${assist.statistics[0].team.id}`}>
                                        <img src={assist.statistics[0].team.logo} alt={assist.statistics[0].team.name} className={styles.leagueAssistsTeamLogo} />
                                        <span className={styles.leagueAssistsTeamName}>{assist.statistics[0].team.name}</span>
                                    </Link>
                                </div>
                            </td>
                            <td className={styles.leagueAssistsAssists}>{assist.statistics[0].goals.assists}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeagueAssists;
