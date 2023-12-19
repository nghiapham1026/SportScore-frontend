import React from 'react';
import './DateSelector.css';

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

export default DateSelector;
