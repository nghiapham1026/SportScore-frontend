import React, { useState, useEffect } from 'react';
import './LeagueFixtures.css'; // Create and style accordingly
import { Link } from 'react-router-dom';

const LeagueFixtures = ({ fixtures }) => {
    const [selectedRound, setSelectedRound] = useState('');

    useEffect(() => {
        const rounds = [...new Set(fixtures.map(fixture => fixture.league.round))];
        setSelectedRound(rounds[0]);
    }, [fixtures]);

    const filteredFixtures = fixtures.filter(fixture => fixture.league.round === selectedRound);

    // If there are no fixtures, return null
    if (!fixtures || fixtures.length === 0) {
        return null;
    }

    return (
        <div className="fixturesContainer">
            <h3>Upcoming Fixtures</h3>
            
            <select className="roundSelector" value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)}>
                <option value=''>All Rounds</option>
                {[...new Set(fixtures.map(fixture => fixture.league.round))].map(round => (
                    <option key={round} value={round}>{round}</option>
                ))}
            </select>

            <div>
                {filteredFixtures.map((fixture, index) => (
                    <div key={index} className="fixtureItem">
                        <div className="fixtureHeader">
                            <img className="leagueLogo" src={fixture.league.logo} alt={fixture.league.name} />
                            <span>{fixture.league.name} - {fixture.league.country}</span>
                            <img className="countryFlag" src={fixture.league.flag} alt={fixture.league.country} />
                        </div>
                        <div className="fixtureDate">
                            {new Date(fixture.fixture.date).toLocaleDateString()} {new Date(fixture.fixture.date).toLocaleTimeString()}
                        </div>
                        <div className="fixtureVenue">{fixture.fixture.venue.name}, {fixture.fixture.venue.city}</div>
                        <div className="fixtureItemTeam fixtureItemTeam-left">
                        <Link to={`/team/${fixture.teams.home.id}`}><img className="teamLogo" src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                            <span>{fixture.teams.home.name}</span></Link>
                        </div>
                        <div className="fixtureItemTeam">
                            <span className="fixtureVersus">vs</span>
                        </div>
                        <div className="fixtureItemTeam fixtureItemTeam-right">
                            <Link to={`/team/${fixture.teams.home.id}`}><span>{fixture.teams.away.name}</span>
                            <img className="teamLogo teamLogo-right" src={fixture.teams.away.logo} alt={fixture.teams.away.name} /></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeagueFixtures;