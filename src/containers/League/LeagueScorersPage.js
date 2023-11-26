import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLeagues } from '../../utils/dataController';
import LeagueSelector from './helpers/LeagueSelector'; // Adjust the path as needed
import LeagueScorers from './LeagueScorers'; // Adjust the path as needed

function LeagueScorersPage() {
    const { leagueId } = useParams();
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);

    useEffect(() => {
        async function fetchSeasons() {
            try {
                const leagues = await getLeagues();
                const league = leagues.find(l => l.league.id === parseInt(leagueId));
                if (league) {
                    setSeasons(league.seasons);
                    const currentSeason = league.seasons.find(s => s.current) || league.seasons[league.seasons.length - 1];
                    setSelectedSeason(currentSeason);
                }
            } catch (err) {
                console.error("Error fetching seasons:", err);
            }
        }

        fetchSeasons();
    }, [leagueId]);

    const onSeasonChange = (seasonId) => {
        const season = seasons.find(s => s._id === seasonId);
        setSelectedSeason(season);
    };

    return (
        <div>
            <h2>League Top Scorers</h2>
            <LeagueSelector 
                seasons={seasons} 
                selectedSeason={selectedSeason} 
                onSeasonChange={onSeasonChange}
            />
            {selectedSeason && <LeagueScorers leagueId={leagueId} season={selectedSeason} />}
        </div>
    );
}

export default LeagueScorersPage;
