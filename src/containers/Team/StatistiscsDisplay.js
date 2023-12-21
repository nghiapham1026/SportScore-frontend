import React from 'react';

const StatisticsDisplay = ({ stats }) => {
    return (
        <div className="statistics-container">
            <h3>Fixtures</h3>
            <div>Played - Home: {stats.fixtures.played.home}, Away: {stats.fixtures.played.away}, Total: {stats.fixtures.played.total}</div>
            <div>Wins - Home: {stats.fixtures.wins.home}, Away: {stats.fixtures.wins.away}, Total: {stats.fixtures.wins.total}</div>
            <div>Draws - Home: {stats.fixtures.draws.home}, Away: {stats.fixtures.draws.away}, Total: {stats.fixtures.draws.total}</div>
            <div>Loses - Home: {stats.fixtures.loses.home}, Away: {stats.fixtures.loses.away}, Total: {stats.fixtures.loses.total}</div>
            
            <h3>Goals</h3>
            <div>For - Home: {stats.goals.for.total.home}, Away: {stats.goals.for.total.away}, Total: {stats.goals.for.total.total}</div>
            <div>Against - Home: {stats.goals.against.total.home}, Away: {stats.goals.against.total.away}, Total: {stats.goals.against.total.total}</div>

            <h3>Biggest</h3>
            <div>Biggest Wins - Home: {stats.biggest.wins.home}, Away: {stats.biggest.wins.away}</div>
            <div>Biggest Loses - Home: {stats.biggest.loses.home || 'N/A'}, Away: {stats.biggest.loses.away || 'N/A'}</div>

            <h3>Penalty</h3>
            <div>Scored: {stats.penalty.scored.total}, Missed: {stats.penalty.missed.total}, Total: {stats.penalty.total}</div>

            <h3>Cards</h3>
            {/* Render card statistics similar to other sections */}

            <h3>Form</h3>
            <div>{stats.form}</div>

            <h3>Clean Sheets</h3>
            <div>Home: {stats.clean_sheet.home}, Away: {stats.clean_sheet.away}, Total: {stats.clean_sheet.total}</div>

            <h3>Failed to Score</h3>
            <div>Home: {stats.failed_to_score.home}, Away: {stats.failed_to_score.away}, Total: {stats.failed_to_score.total}</div>

            <h3>Lineups</h3>
            {stats.lineups.map((lineup, index) => (
                <div key={index}>Formation: {lineup.formation}, Played: {lineup.played}</div>
            ))}
        </div>
    );
};

export default StatisticsDisplay;
