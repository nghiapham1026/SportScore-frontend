import React, { useState, useEffect } from 'react';

import './Fixtures.css';
import { groupByProperty, toggleProperty } from '../../utils/objectUtils';
import { fetchData } from '../../utils/fetchData';
import DateSelector from './DateSelector';
import LeagueHeader from './LeagueHeader';
import FixtureItem from './FixtureItem';

function Fixtures() {
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split('T')[0]);

    const [expandedLeagues, setExpandedLeagues] = useState({});
    const [expandedFixtures, setExpandedFixtures] = useState({});
  
    useEffect(() => {
      const fetchFixtures = async () => {
        try {
          const endpoint = `/fixtures/db/getFixtures`;
          const params = { date: selectedDate };
          const response = await fetchData(endpoint, 'GET', null, params);
          setFixtures(response.allFixtures);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchFixtures();
    }, [selectedDate]); // Re-run effect when selectedDate changes

    const groupedFixtures = groupByProperty(fixtures, 'league.name');

    const toggleLeague = (leagueName) => {
        setExpandedLeagues(prev => toggleProperty(prev, leagueName));
    };

    const toggleFixture = (fixtureId) => {
        setExpandedFixtures(prev => toggleProperty(prev, fixtureId));
    };
  
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };

    const minDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const maxDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <h1 className="header">Fixtures</h1>
            <DateSelector 
                selectedDate={selectedDate} 
                handleDateChange={handleDateChange} 
                minDate={minDate} 
                maxDate={maxDate} 
            />
            <ul>
                {Object.keys(groupedFixtures).map(leagueName => (
                    <React.Fragment key={leagueName}>
                        <LeagueHeader 
                            leagueName={leagueName} 
                            logo={groupedFixtures[leagueName][0].league.logo} 
                            toggleLeague={toggleLeague} 
                        />
                        {expandedLeagues[leagueName] && groupedFixtures[leagueName].map((fixture, index) => (
                            <FixtureItem 
                                key={index} 
                                fixture={fixture} 
                                toggleFixture={toggleFixture} 
                                expandedFixtures={expandedFixtures} 
                            />
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default Fixtures;