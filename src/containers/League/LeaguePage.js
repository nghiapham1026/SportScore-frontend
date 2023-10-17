import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchData } from '../../utils/fetchData';
import LeagueTable from './LeagueTable';  // Adjust the path
import LeagueSelector from './LeagueSelector';  // Adjust the path

function LeaguePage() {
    const { leagueId } = useParams();
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [leagueData, setLeagueData] = useState(null);
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        const fetchLeagueData = async () => {
            try {
                const response = await fetchData('/leagues/db/getLeagues');
                const league = response.allLeagues.find(l => l.league.id === parseInt(leagueId));
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
            // Fetch standings data for the selected season
            const fetchStandingsData = async () => {
                try {
                    const response = await fetchData(`/standings/db/getStandings`, 'GET', null, { league: leagueId, season: selectedSeason.year });
                    setStandings(response.standings);
                    console.log("Fetched standings:", response);
                } catch (err) {
                    console.error("Error fetching standings data:", err);
                }
            };
            fetchStandingsData();
        }
    }, [selectedSeason]);

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

export default LeaguePage;
