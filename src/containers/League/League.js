import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getLeagues, getStandings } from '../../utils/dataController';
import { handleSeasonChange, RenderStandings } from './helpers/LeagueUtils';
import LeagueSelector from './helpers/LeagueSelector';  // Adjust the path
import LeagueResults from './LeagueResults';
import LeagueFixtures from './LeagueFixtures';  // Adjust the path if needed
import LeagueScorers from './LeagueScorers';
import LeagueAssists from './LeagueAssists';

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
                    const season = handleSeasonChange(seasons, seasonId);
                    setSelectedSeason(season);
                }}
            />
            
            <RenderStandings standings={standings} />
            <LeagueResults leagueId={leagueId} selectedSeason={selectedSeason} />
            <LeagueFixtures leagueId={leagueId} selectedSeason={selectedSeason} />
            <LeagueScorers leagueId={leagueId} season={selectedSeason} />
            <LeagueAssists leagueId={leagueId} season={selectedSeason} />
        </div>
    );
}

export default League;
