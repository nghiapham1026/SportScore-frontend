import React from 'react';
import PropTypes from 'prop-types';

const LeagueSelector = ({ seasons, selectedSeason, onSeasonChange }) => (
  <select
    value={selectedSeason?._id}
    onChange={(e) => onSeasonChange(e.target.value)}
  >
    {seasons.map((season) => (
      <option key={season._id} value={season._id}>
        {season.year}
      </option>
    ))}
  </select>
);

LeagueSelector.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedSeason: PropTypes.shape({
    _id: PropTypes.string,
  }),
  onSeasonChange: PropTypes.func.isRequired,
};

export default LeagueSelector;
