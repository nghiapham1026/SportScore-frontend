import React, { useState, useEffect } from 'react';

const LeagueResults = ({ results }) => {
    const [selectedRound, setSelectedRound] = useState('');

    useEffect(() => {
        const rounds = [...new Set(results.map(result => result.league.round))];
        setSelectedRound(rounds[rounds.length - 1]);
    }, [results]);

    const filteredResults = results.filter(result => result.league.round === selectedRound);

    return (
        <div style={{ padding: '20px' }}>
            <h3>Results</h3>
            
            <select value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)}>
                <option value=''>All Rounds</option>
                {[...new Set(results.map(result => result.league.round))].map(round => (
                    <option key={round} value={round}>{round}</option>
                ))}
            </select>

            <div style={{ marginTop: '20px' }}>
                {filteredResults.map((result, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                            <img src={result.teams.home.logo} alt={result.teams.home.name} style={{ marginRight: '10px' }}/>
                            <span>{result.teams.home.name}</span>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <span style={{ fontSize: '24px' }}>{result.goals.home} - {result.goals.away}</span>
                            {result.score.penalty.home !== null && result.score.penalty.away !== null && (
                                <div style={{ fontSize: '14px', marginTop: '5px' }}>
                                    (Pen: {result.score.penalty.home} - {result.score.penalty.away})
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1, textAlign: 'left' }}>
                            <span>{result.teams.away.name}</span>
                            <img src={result.teams.away.logo} alt={result.teams.away.name} style={{ marginLeft: '10px' }}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeagueResults;
