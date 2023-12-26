import React from 'react';
import './DateSelector.css';
import PropTypes from 'prop-types';

function DateSelector({ selectedDate, handleDateChange, minDate, maxDate }) {
  return (
    <label className="dateInput">
      Select date:
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={minDate}
        max={maxDate}
      />
    </label>
  );
}

DateSelector.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
};

export default DateSelector;
