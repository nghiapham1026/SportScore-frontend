import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getLeagues, getStandings, fetchFixtures } from '../../utils/dataController';
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
    const [results, setResults] = useState([]);
    const [fixtures, setFixtures] = useState([]);
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
            const fetchResults = async () => {
                try {
                    const leagueResults = await fetchFixtures({ league: leagueId, season: selectedSeason.year, status: 'FT-AET-PEN'});
                    const leagueFixtures = await fetchFixtures({ league: leagueId, season: selectedSeason.year, status: 'NS'});
                    setResults(leagueResults);
                    setFixtures(leagueFixtures);
                } catch (err) {
                    console.error("Error fetching fixtures data:", err);
                }
            };
            fetchResults();
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
            <LeagueResults results={results} />
            {<LeagueFixtures fixtures={fixtures} />}
            <LeagueScorers leagueId={leagueId} season={selectedSeason} />
            <LeagueAssists leagueId={leagueId} season={selectedSeason} />
        </div>
    );
}

export default League;
