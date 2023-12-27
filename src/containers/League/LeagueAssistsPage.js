import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeagues } from '../../utils/dataController';
import LeagueSelector from './helpers/LeagueSelector';
import LeagueAssists from './LeagueAssists';

function LeagueAssistsPage() {
  const { leagueId } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSeasons() {
      try {
        const leagues = await getLeagues();
        const league = leagues.find((l) => l.league.id === parseInt(leagueId));
        if (league) {
          setSeasons(league.seasons);
          const currentSeason =
            league.seasons.find((s) => s.current) ||
            league.seasons[league.seasons.length - 1];
          setSelectedSeason(currentSeason);
        }
      } catch (err) {
        console.error('Error fetching seasons:', err);
      }
    }

    fetchSeasons();
  }, [leagueId]);

  const onSeasonChange = (seasonId) => {
    const season = seasons.find((s) => s._id === seasonId);
    setSelectedSeason(season);
  };

  const goToLeaguePage = () => {
    navigate(`/league/${leagueId}`);
  };

  return (
    <div>
      <button onClick={goToLeaguePage}>Go Back to League Page</button>

      <h2>League Top Assists</h2>
      <LeagueSelector
        seasons={seasons}
        selectedSeason={selectedSeason}
        onSeasonChange={onSeasonChange}
      />
      <LeagueAssists leagueId={leagueId} season={selectedSeason} />
    </div>
  );
}

export default LeagueAssistsPage;
