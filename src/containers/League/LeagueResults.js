import React, { useState, useEffect } from 'react';
import './LeagueResults.css';

const LeagueResults = ({ results }) => {
    const [selectedRound, setSelectedRound] = useState('');

    useEffect(() => {
        const rounds = [...new Set(results.map(result => result.league.round))];
        setSelectedRound(rounds[rounds.length - 1]);
    }, [results]);

    const filteredResults = results.filter(result => result.league.round === selectedRound);

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
                        <div className="resultItemTeam resultItemTeam-left">
                            <img className="teamLogo" src={result.teams.home.logo} alt={result.teams.home.name} />
                            <span>{result.teams.home.name}</span>
                        </div>
                        <div className="resultItemTeam">
                            <span className="scoreMain">{result.goals.home} - {result.goals.away}</span>
                            {result.score.penalty.home !== null && result.score.penalty.away !== null && (
                                <div className="scorePenalty">
                                    (Pen: {result.score.penalty.home} - {result.score.penalty.away})
                                </div>
                            )}
                        </div>
                        <div className="resultItemTeam resultItemTeam-right">
                            <span>{result.teams.away.name}</span>
                            <img className="teamLogo teamLogo-right" src={result.teams.away.logo} alt={result.teams.away.name} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeagueResults;
