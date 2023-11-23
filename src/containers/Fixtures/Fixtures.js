import React, { useState, useEffect } from 'react';

import './Fixtures.css';
import { groupByProperty, toggleProperty } from './helpers/FixturesUtils';
import DateSelector from './helpers/DateSelector';
import LeagueHeader from './LeagueHeader';
import FixtureItem from './FixtureItem';
import { fetchFixtures } from '../../utils/dataController';

function Fixtures() {
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split('T')[0]);

    const [expandedLeagues, setExpandedLeagues] = useState({});
    const [expandedFixtures, setExpandedFixtures] = useState({});
  
    useEffect(() => {
        const getFixtures = async () => {
          try {
            const fixturesData = await fetchFixtures({ date: selectedDate });
            setFixtures(fixturesData);
          } catch (err) {
            setError(err.message);
          }
        };
        getFixtures();
      }, [selectedDate]);

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