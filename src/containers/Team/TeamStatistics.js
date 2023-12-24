import React, { useState, useEffect } from "react";
import { getLeagues, getTeamStatistics } from "../../utils/dataController";
import StatisticsDisplay from "./StatisticsDisplay";

const TeamStatistics = ({ teamId }) => {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [teamStats, setTeamStats] = useState(null);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const leagueData = await getLeagues({ team: teamId });
                setLeagues(leagueData);
            } catch (error) {
                console.error('Error fetching leagues:', error);
            }
        };

        fetchLeagues();
    }, [teamId]);

    useEffect(() => {
        const fetchTeamStatistics = async () => {
            if (selectedLeague && selectedSeason) {
                try {
                    const stats = await getTeamStatistics({
                        league: selectedLeague,
                        season: selectedSeason,
                        team: teamId
                    });
                    setTeamStats(stats);
                } catch (error) {
                    console.error('Error fetching team statistics:', error);
                }
            }
        };

        fetchTeamStatistics();
    }, [selectedLeague, selectedSeason, teamId]);

    return (
        <div>
            <h1>Team Statistics of {teamId}</h1>
            <div>
                <label>
                    Select League:
                    <select onChange={e => setSelectedLeague(e.target.value)}>
                        <option value="">--Choose a League--</option>
                        {leagues.map(league => (
                            <option key={league.league.id} value={league.league.id}>
                                {league.league.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Select Season:
                    <select onChange={e => setSelectedSeason(e.target.value)}>
                        <option value="">--Choose a Season--</option>
                        {leagues.find(league => league.league.id.toString() === selectedLeague)?.seasons.map(season => (
                            <option key={season.year} value={season.year}>
                                {season.year}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {teamStats && (
                <div>
                    <h2>{teamStats.league.name} - {teamStats.league.season}</h2>
                    <StatisticsDisplay stats={teamStats} />
                </div>
            )}
        </div>
    );
};

export default TeamStatistics;
