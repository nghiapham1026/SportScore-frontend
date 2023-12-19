import React, { useState, useEffect } from 'react';
import './LeagueResults.css';
import { Link } from 'react-router-dom';
import { fetchFixtures } from '../../utils/dataController';

const LeagueResults = ({ leagueId, selectedSeason }) => {
    const [results, setResults] = useState([]);
    const [selectedRound, setSelectedRound] = useState('');

    useEffect(() => {
        const fetchLeagueResults = async () => {
            if (selectedSeason) {
                try {
                    const fetchedResults = await fetchFixtures({ league: leagueId, season: selectedSeason.year, status: 'FT-AET-PEN' });
                    setResults(fetchedResults);
                } catch (err) {
                    console.error("Error fetching results:", err);
                }
            }
        };
        fetchLeagueResults();
    }, [leagueId, selectedSeason]);

    const filteredResults = selectedRound
        ? results.filter(result => result.league.round === selectedRound)
        : results;

    return (
        <div className="resultsContainer">
            <h3>Results</h3>
            
            <select className="roundSelector" value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)}>
                <option value=''>All Rounds</option>
                {[...new Set(results.map(result => result.league.round))].map(round => (
                    <option key={round} value={round}>{round}</option>
                ))}
            </select>

            <div>
                {filteredResults.map((result, index) => (
                    <div key={index} className="resultItem">
                        <div className="fixtureHeader">
                            <img className="leagueLogo" src={result.league.logo} alt={result.league.name} />
                            <span>{result.league.name} - {result.league.country}</span>
                            <img className="countryFlag" src={result.league.flag} alt={result.league.country} />
                        </div>
                        <div className="fixtureDate">
                            {new Date(result.fixture.date).toLocaleDateString()} {new Date(result.fixture.date).toLocaleTimeString()}
                        </div>
                        <div className="fixtureVenue">{result.fixture.venue.name}, {result.fixture.venue.city}</div>
                        <div className="matchDetails">
                            <div className="resultItemTeam">
                                <Link to={`/team/${result.teams.home.id}`}>
                                    <img className="teamLogo" src={result.teams.home.logo} alt={result.teams.home.name} />
                                    <span>{result.teams.home.name}</span>
                                </Link>
                            </div>
                            
                            <div className="scoreMain">
                                <Link to={`/match/${result.fixture.id}`}>
                                    {result.goals.home} - {result.goals.away}
                                </Link>
                            </div>
                            
                            <div className="resultItemTeam">
                                <Link to={`/team/${result.teams.away.id}`}>
                                    <img className="teamLogo teamLogo-right" src={result.teams.away.logo} alt={result.teams.away.name} />
                                    <span>{result.teams.away.name}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeagueResults;
