import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeagues, getStandings } from '../../utils/dataController';
import { handleSeasonChange, RenderStandings } from './helpers/LeagueUtils';
import LeagueSelector from './helpers/LeagueSelector';

function League() {
    const { leagueId } = useParams();
    const [seasons, setSeasons] = useState([]);
    const navigate = useNavigate();
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeagueData() {
            setLoading(true);
            try {
                const leagues = await getLeagues();
                const league = leagues.find(l => l.league.id === parseInt(leagueId));
                if (league) {
                    setSeasons(league.seasons);
                    // Only set the selectedSeason if it hasn't been set yet
                    if (!selectedSeason) {
                        const currentSeason = league.seasons.find(s => s.current) || league.seasons[league.seasons.length - 1];
                        setSelectedSeason(currentSeason);
                    }
                }
            } catch (err) {
                console.error("Error fetching league data:", err);
            }
            setLoading(false);
        }

        fetchLeagueData();
    }, [leagueId]); // Remove selectedSeason from the dependency array

    useEffect(() => {
        async function fetchLeagueStandings() {
            if (selectedSeason && !loading) {
                try {
                    const leagueStandings = await getStandings({ league: leagueId, season: selectedSeason.year });
                    setStandings(leagueStandings);
                } catch (err) {
                    console.error("Error fetching standings data:", err);
                }
            }
        }

        fetchLeagueStandings();
    }, [selectedSeason, leagueId, loading]); // Add loading to the dependency array

    const handleSeasonSelectorChange = (seasonId) => {
        const season = handleSeasonChange(seasons, seasonId);
        setSelectedSeason(season);
        // Potentially reset standings or trigger a refetch of standings here
    };

    // Function to handle redirection to the Fixtures Page
    const goToFixturesPage = () => {
        navigate(`/league/${leagueId}/fixtures`); // Use navigate for redirection
    };

    const goToResultsPage = () => {
        navigate(`/league/${leagueId}/results`);
    }

    const goToScorersPage = () => {
        navigate(`/league/${leagueId}/scorers`);
    }

    const goToAssistsPage = () => {
        navigate(`/league/${leagueId}/assists`);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <button onClick={goToFixturesPage}>View Fixtures</button>
            <button onClick={goToResultsPage}>View Results</button>
            <button onClick={goToScorersPage}>View Top Scorers</button>
            <button onClick={goToAssistsPage}>View Top Assists</button>
            
            <h2>League Table</h2>
            <LeagueSelector 
                seasons={seasons} 
                selectedSeason={selectedSeason} 
                onSeasonChange={handleSeasonSelectorChange}
            />
            <RenderStandings standings={standings} />
        </div>
    );
}

export default League;