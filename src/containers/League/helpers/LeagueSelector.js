import React from 'react';

const LeagueSelector = ({ seasons, selectedSeason, onSeasonChange }) => (
    <select
        value={selectedSeason?._id}
        onChange={(e) => onSeasonChange(e.target.value)}
    >
        {seasons.map(season => (
            <option key={season._id} value={season._id}>
                {season.year}
            </option>
        ))}
    </select>
);

export default LeagueSelector;
