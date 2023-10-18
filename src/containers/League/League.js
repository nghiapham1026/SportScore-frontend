import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getLeagues, getStandings } from '../../utils/dataController';
import LeagueTable from './LeagueTable';  // Adjust the path
import LeagueSelector from './LeagueSelector';  // Adjust the path

function League() {
    const { leagueId } = useParams();
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [leagueData, setLeagueData] = useState(null);
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        const fetchLeagueData = async () => {
            try {
                const leagues = await getLeagues();
                const league = leagues.find(l => l.league.id === parseInt(leagueId));
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
            if (leagueId === '5' && selectedSeason.year === 2018) {
                console.log("Fetching for league 5 in season 2018 is skipped.");
                return; // Exit the useEffect without fetching
            }
            const fetchLeagueStandings = async () => {
                try {
                    const leagueStandings = await getStandings({ league: leagueId, season: selectedSeason.year });
                    setStandings(leagueStandings);
                    console.log("Fetched standings:", leagueStandings);
                } catch (err) {
                    console.error("Error fetching standings data:", err);
                }
            };
            fetchLeagueStandings();
        }
    }, [selectedSeason, leagueId]);

    return (
        <div>
            <h2>{leagueData?.league.name}</h2>
            <LeagueSelector 
                seasons={seasons} 
                selectedSeason={selectedSeason} 
                onSeasonChange={(seasonId) => {
                    const season = seasons.find(s => s._id === seasonId);
                    setSelectedSeason(season);
                }}
            />
            
            {console.log("Rendering standings:", standings)}
            {Array.isArray(standings) && standings.length > 0 ? 
                (standings[0] instanceof Array ? 
                    standings.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <h3>{group[0]?.group}</h3>
                            <LeagueTable tableData={group} />
                        </div>
                    ))
                    :
                    <LeagueTable tableData={standings} />
                )
                :
                console.log("No valid table data.")
            }
        </div>
    );
}

export default League;
