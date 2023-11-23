import React from 'react';
import { Link } from 'react-router-dom';

const LeagueTable = ({ tableData }) => (
    <table>
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
                {tableData.map((team) => (
                    <tr key={team.rank}>
                        <td>{team.rank}</td>
                        <td><Link to={`/team/${team.team.id}`}><img src={team.team.logo} alt={team.team.name} width="30" /> {team.team.name}</Link></td>
                        <td>{team.all.played}</td>
                        <td>{team.all.win}</td>
                        <td>{team.all.draw}</td>
                        <td>{team.all.lose}</td>
                        <td>{team.all.goals.for}</td>
                        <td>{team.all.goals.against}</td>
                        <td>{team.goalsDiff}</td>
                        <td>{team.points}</td>
                        <td>{team.form}</td>
                    </tr>
                ))}
            </tbody>
        </table>
);

export default LeagueTable;
