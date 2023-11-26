import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLeagues, getStandings } from '../../utils/dataController';
import { handleSeasonChange, RenderStandings } from './helpers/LeagueUtils';
import LeagueSelector from './helpers/LeagueSelector';

function League() {
    const { leagueId } = useParams();
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        async function fetchLeagueData() {
            try {
                const leagues = await getLeagues();
                const league = leagues.find(l => l.league.id === parseInt(leagueId));
                if (league) {
                    setSeasons(league.seasons);
                    const currentSeason = league.seasons.find(s => s.current) || league.seasons[league.seasons.length - 1];
                    setSelectedSeason(currentSeason);
                }
            } catch (err) {
                console.error("Error fetching league data:", err);
            }
        }

        async function fetchLeagueStandings() {
            if (selectedSeason) {
                try {
                    const leagueStandings = await getStandings({ league: leagueId, season: selectedSeason.year });
                    setStandings(leagueStandings);
                } catch (err) {
                    console.error("Error fetching standings data:", err);
                }
            }
        }

        fetchLeagueData().then(fetchLeagueStandings);
    }, [leagueId, selectedSeason]);

    return (
        <div>
            <h2>League Table</h2>
            <LeagueSelector 
                seasons={seasons} 
                selectedSeason={selectedSeason} 
                onSeasonChange={(seasonId) => {
                    const season = handleSeasonChange(seasons, seasonId);
                    setSelectedSeason(season);
                }}
            />
            <RenderStandings standings={standings} />
        </div>
    );
}

export default League;
