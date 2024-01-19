import React, { useState, useEffect, useContext } from 'react';
import { getStandings } from '../../utils/dataController';
import { AuthContext } from '../../context/AuthContext';
import styles from './FavoriteTable.module.css';

const FavoriteTable = () => {
  const { userData } = useContext(AuthContext);
  const [leagueStandings, setLeagueStandings] = useState([]);
  const [visibleLeagueId, setVisibleLeagueId] = useState(null);

  const toggleVisibility = (leagueId) => {
    setVisibleLeagueId(visibleLeagueId === leagueId ? null : leagueId);
  };

  useEffect(() => {
    const fetchStandings = async () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth(); // January is 0, February is 1, and so on.
      const seasonYear = currentMonth >= 7 ? currentYear : currentYear - 1; // 7 corresponds to August

      const standingsData = [];
      for (const league of userData.favoriteLeagues) {
        const standings = await getStandings({
          league: league.id,
          season: seasonYear,
        });
        standingsData.push({
          leagueId: league.id,
          leagueName: league.name,
          leagueLogo: league.logo, // Storing the logo URL
          standings: standings[0],
        });
      }
      setLeagueStandings(standingsData);
    };

    if (userData.favoriteLeagues) {
      fetchStandings();
    }
  }, [userData.favoriteLeagues]);

  return (
    <div className={styles.favoriteTableContainer}>
      <h3>Tables</h3>
      {leagueStandings.map((leagueData, index) => (
        <div key={index} className={styles.leagueStandingsContainer}>
          <div
            className={styles.leagueHeader}
            onClick={() => toggleVisibility(leagueData.leagueId)}
          >
            {leagueData.leagueLogo && (
              <img
                src={leagueData.leagueLogo}
                alt={leagueData.leagueName}
                className={styles.leagueLogo}
              />
            )}
            <h3>{leagueData.leagueName}</h3>
          </div>
          {visibleLeagueId === leagueData.leagueId && (
            <table className={styles.leagueTable}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Played</th>
                  <th>Wins</th>
                  <th>Draws</th>
                  <th>Losses</th>
                  <th>Goals For</th>
                  <th>Goals Against</th>
                  <th>Goal Difference</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leagueData.standings.map((team, teamIndex) => (
                  <tr key={teamIndex}>
                    <td>{team.rank}</td>
                    <td>
                      <img
                        src={team.team.logo}
                        alt={team.team.name}
                        width="30"
                      />{' '}
                      {team.team.name}
                    </td>
                    <td>{team.all.played}</td>
                    <td>{team.all.win}</td>
                    <td>{team.all.draw}</td>
                    <td>{team.all.lose}</td>
                    <td>{team.all.goals.for}</td>
                    <td>{team.all.goals.against}</td>
                    <td>{team.goalsDiff}</td>
                    <td>
                      <strong>{team.points}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default FavoriteTable;
