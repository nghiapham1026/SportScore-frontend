import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function LeaguePage() {
    const { leagueId } = useParams();

    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await axios.get(`https://sportscore-a1cf52e3ff48.herokuapp.com/standings/db/getStandings?league=${leagueId}&season=2022`);
                console.log("API Response:", response.data);
                setStandings(response.data.standings[0]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchStandings();
    }, [leagueId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{standings.league?.name}</h1>
            <img src={standings.league?.logo} alt={standings.league?.name} />
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Played</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Losses</th>
                        <th>Goals For</th>
                        <th>Goals Against</th>
                        <th>Goal Difference</th>
                        <th>Points</th>
                        <th>Form</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(standings) && standings.map((team) => (
                        <tr key={team.rank}>
                            <td>{team.rank}</td>
                            <td><img src={team.team.logo} alt={team.team.name} width="30" /> {team.team.name}</td>
                            <td>{team.all.played}</td>
                            <td>{team.all.win}</td>
                            <td>{team.all.draw}</td>
                            <td>{team.all.lose}</td>
                            <td>{team.all.goals.for}</td>
                            <td>{team.all.goals.against}</td>
                            <td>{team.goalsDiff}</td>
                            <td>{team.points}</td>
                            <td>{team.form}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeaguePage;
