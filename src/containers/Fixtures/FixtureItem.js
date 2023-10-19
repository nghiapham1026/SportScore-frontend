import React from 'react';
import { Link } from 'react-router-dom';

function FixtureItem({ fixture, toggleFixture, expandedFixtures }) {
    return (
        <li className="listItem">
            <h3 className="fixtureHeader" onClick={() => toggleFixture(fixture.fixture.id)}>
                <img src={fixture.teams.home.logo} alt={`${fixture.teams.home.name} logo`} className="teamLogo" />
                {fixture.teams.home.name} {fixture.goals.home}-{fixture.goals.away} {fixture.teams.away.name}
                <img src={fixture.teams.away.logo} alt={`${fixture.teams.away.name} logo`} className="teamLogo" />
            </h3>
            {expandedFixtures[fixture.fixture.id] && (
                <div className="fixtureDetails">
                    <p>Date & Time: {new Date(fixture.fixture.date).toLocaleString()} ({fixture.fixture.timezone})</p>
                    <p>Venue: {fixture.fixture.venue.name}, {fixture.fixture.venue.city}</p>
                    <p>Referee: {fixture.fixture.referee}</p>
                    <p>Status: {fixture.fixture.status.long} ({fixture.fixture.status.short}) - {fixture.fixture.status.elapsed} mins elapsed</p>
                    <p>Score (Halftime): {fixture.score.halftime.home} - {fixture.score.halftime.away}</p>
                    <p>Score (Fulltime): {fixture.score.fulltime.home} - {fixture.score.fulltime.away}</p>
                    <p>Score (Extra time): {fixture.score.extratime.home} - {fixture.score.extratime.away}</p>
                    <p>Score (Penalty): {fixture.score.penalty.home} - {fixture.score.penalty.away}</p>
                </div>
            )}
            <Link to={`/match/${fixture.fixture.id}`}>
                <button className="matchCenterButton">
                    Match Center
                </button>
            </Link>
        </li>
    );
}

export default FixtureItem;
