import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LeagueTable.module.css'; // Updated import statement

const LeagueTable = ({ tableData }) => (
  <div className={styles.leagueTableContainer}>
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
          <th>Form</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((team, index) => (
          <tr key={index}>
            <td>{team.rank}</td>
            <td>
              <Link to={`/team/${team.team.id}`}>
                <img src={team.team.logo} alt={team.team.name} width="30" />{' '}
                {team.team.name}
              </Link>
            </td>
            <td>{team.all.played}</td>
            <td>{team.all.win}</td>
            <td>{team.all.draw}</td>
            <td>{team.all.lose}</td>
            <td>{team.all.goals.for}</td>
            <td>{team.all.goals.against}</td>
            <td>{team.goalsDiff}</td>
            <td>{team.points}</td>
            <td className={styles.form}>
              {team.form &&
                team.form
                  .split('')
                  .map((result, index) => (
                    <span
                      key={index}
                      className={`${styles.formIndicator} ${
                        result === 'W'
                          ? styles.win
                          : result === 'D'
                            ? styles.draw
                            : styles.loss
                      }`}
                    ></span>
                  ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LeagueTable;
