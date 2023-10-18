import React, { useState, useEffect } from 'react';

import { useParams, useLocation } from 'react-router-dom';

import './Match.css';  // Import the new CSS file
import MatchScore from './MatchScore';
import MatchStatistics from './MatchStatistics';
import HeadToHead from './HeadToHead';
import { fetchStatistics, fetchHeadToHead } from '../../utils/dataController';

function Match() {
    const { fixtureId } = useParams();
    const location = useLocation();

    // Extract team IDs from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const team1Id = searchParams.get('team1');
    const team2Id = searchParams.get('team2');
    const team1Logo = searchParams.get('team1Logo');
    const team2Logo = searchParams.get('team2Logo');
    const team1Score = searchParams.get('team1Score');
    const team2Score = searchParams.get('team2Score');
    
    const [statistics, setStatistics] = useState(null);
    const [headToHeadData, setHeadToHeadData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const stats = await fetchStatistics({ fixture: fixtureId });
                setStatistics(stats);
                const h2h = await fetchHeadToHead({ h2h: `${team1Id}-${team2Id}` });
                setHeadToHeadData(h2h);
            } catch (err) {
                setError(err.message);
            }
        };         
        getData();
    }, [fixtureId, team1Id, team2Id]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!statistics) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <MatchScore 
                team1Logo={team1Logo} 
                team2Logo={team2Logo} 
                team1Score={team1Score} 
                team2Score={team2Score} 
            />
            <div className="container">
                <div className="teamsContainer">
                    {statistics.map((teamStats) => (
                        <MatchStatistics key={teamStats.team.id} teamStats={teamStats} />
                    ))}
                </div>
                <HeadToHead headToHeadData={headToHeadData} />
            </div>
        </div>
    );    
}

export default Match;