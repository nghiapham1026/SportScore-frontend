import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeagues } from '../../utils/dataController';
import LeagueFixtures from './LeagueFixtures';

function LeagueFixturesPage() {
  const { leagueId } = useParams();
  const [selectedSeason, setSelectedSeason] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSeasons() {
      try {
        const leagues = await getLeagues();
        const league = leagues.find((l) => l.league.id === parseInt(leagueId));
        if (league) {
          // Find the most recent season, assuming 'current' property is set to true for the most recent season
          const currentSeason = league.seasons.find((s) => s.current);
          setSelectedSeason(currentSeason);
        }
      } catch (err) {
        console.error('Error fetching seasons:', err);
      }
    }

    fetchSeasons();
  }, [leagueId]);

  // If there is no selected season (i.e., data is still loading), show a loading indicator or null
  if (!selectedSeason) {
    return <div>Loading fixtures...</div>;
  }

  const goToLeaguePage = () => {
    navigate(`/league/${leagueId}`);
  };

  return (
    <div>
      <button onClick={goToLeaguePage}>Go Back to League Page</button>

      <h2>League Fixtures - {selectedSeason.year}</h2>
      <LeagueFixtures leagueId={leagueId} selectedSeason={selectedSeason} />
    </div>
  );
}

export default LeagueFixturesPage;
