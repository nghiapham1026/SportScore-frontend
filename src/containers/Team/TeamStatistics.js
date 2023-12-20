import React, { useState, useEffect } from "react";
import './TeamStatistics.css';
import { getLeagues, getTeamStatistics } from "../../utils/dataController";

const TeamStatistics = ({ teamId }) => {
    const [leagues, setLeagues] = useState([]);

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

    return (
        <div>
            <h1>Team Statistics of {teamId}</h1>
            {leagues.map(league => (
                <div key={league.league.id} className="league-container">
                    <img src={league.league.logo} alt={league.league.name} />
                    <h2>{league.league.name}</h2>
                    {league.seasons.map(season => (
                        <p key={season.year}>{season.year}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TeamStatistics;
