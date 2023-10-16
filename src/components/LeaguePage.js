import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function LeaguePage() {
    const { leagueId } = useParams();
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [leagueData, setLeagueData] = useState(null);
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        const fetchLeagueData = async () => {
            try {
                const response = await axios.get(`https://sportscore-a1cf52e3ff48.herokuapp.com/leagues/db/getLeagues`);
                const league = response.data.allLeagues.find(l => l.league.id === parseInt(leagueId));
                if (league) {
                    setLeagueData(league);
                    setSeasons(league.seasons);
                    const currentSeason = league.seasons.find(s => s.current) || league.seasons[league.seasons.length - 1];
                    setSelectedSeason(currentSeason);
                }
            } catch (err) {
                console.error("Error fetching league data:", err);
            }
        };
        fetchLeagueData();
    }, [leagueId]);

    useEffect(() => {
        if (selectedSeason) {
            // Fetch standings data for the selected season
            const fetchStandings = async () => {
                try {
                    const response = await axios.get(`https://sportscore-a1cf52e3ff48.herokuapp.com/standings/db/getStandings?league=${leagueId}&season=${selectedSeason.year}`);
                    setStandings(response.data.standings[0]);
                } catch (err) {
                    console.error("Error fetching standings data:", err);
                }
            };
            fetchStandings();
        }
    }, [selectedSeason]);

    return (
        <div>
            <h2>{leagueData?.league.name}</h2>
            <select
                value={selectedSeason?._id}
                onChange={(e) => {
                    const season = seasons.find(s => s._id === e.target.value);
                    setSelectedSeason(season);
                }}
            >
                {seasons.map(season => (
                    <option key={season._id} value={season._id}>
                        {season.year}
                    </option>
                ))}
            </select>
            
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
