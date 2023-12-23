import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopScorers } from '../../utils/dataController';
import styles from './LeagueScorers.module.css'; // Updated import statement

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
        return <p className={styles.leagueScorersError}>Error: {error}</p>;
    }

    if (!topScorers.length) {
        return <p className={styles.leagueScorersNoData}>No top scorers data available.</p>;
    }

    return (
        <div className={styles.leagueScorersContainer}>
            <h1 className={styles.leagueScorersTitle}>Top Scorers</h1>
            <table className={styles.leagueScorersTable}>
                <thead>
                    <tr>
                        <th className={styles.leagueScorersPlayerRow}>Player</th>
                        <th className={styles.leagueScorersGoals}>Goals</th>
                    </tr>
                </thead>
                <tbody>
                    {topScorers.map((scorer, index) => (
                        <tr key={scorer.player.id}>
                            <td className={styles.leagueScorersPlayerRow}>
                                <div className={styles.leagueScorersPlayerInfo}>
                                    <span className={styles.leagueScorersPlayerRank}>{index + 1}.</span>
                                    <Link to={`/players/${scorer.player.id}`}>
                                        <img src={scorer.player.photo} alt={scorer.player.name} className={styles.leagueScorersPlayerPhoto} />
                                        <span className={styles.leagueScorersPlayerName}>{scorer.player.name}</span>
                                    </Link>
                                    <Link to={`/team/${scorer.statistics[0].team.id}`}>
                                        <img src={scorer.statistics[0].team.logo} alt={scorer.statistics[0].team.name} className={styles.leagueScorersTeamLogo} />
                                        <span>{scorer.statistics[0].team.name}</span>
                                    </Link>
                                </div>
                            </td>
                            <td className={styles.leagueScorersGoals}>{scorer.statistics[0].goals.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeagueScorers;
