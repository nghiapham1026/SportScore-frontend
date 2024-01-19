import React, { useState, useEffect, useContext } from 'react';
import { getStandings } from '../../utils/dataController';
import { AuthContext } from '../../context/AuthContext';
import styles from './FavoriteTable.module.css'; // Make sure to have the corresponding CSS

const FavoriteTable = () => {
  const { userData } = useContext(AuthContext);
  const [leagueStandings, setLeagueStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const standingsData = [];
      for (const league of userData.favoriteLeagues) {
        const standings = await getStandings({
          league: league.id,
          season: 2023,
        });
        standingsData.push({
          leagueName: league.name,
          standings: standings[0],
        });
      }
      setLeagueStandings(standingsData);
      console.log(standingsData);
    };

    if (userData.favoriteLeagues) {
      fetchStandings();
    }
  }, [userData.favoriteLeagues]);

  return (
    <div className={styles.favoriteTableContainer}>
      {leagueStandings.map((leagueData, index) => (
        <div key={index} className={styles.leagueStandingsContainer}>
          <h3>{leagueData.leagueName}</h3>
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
                    <img src={team.team.logo} alt={team.team.name} width="30" />{' '}
                    {team.team.name}
                  </td>
                  <td>{team.all.played}</td>
                  <td>{team.all.win}</td>
                  <td>{team.all.draw}</td>
                  <td>{team.all.lose}</td>
                  <td>{team.all.goals.for}</td>
                  <td>{team.all.goals.against}</td>
                  <td>{team.goalsDiff}</td>
                  <strong>
                    <td>{team.points}</td>
                  </strong>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default FavoriteTable;
