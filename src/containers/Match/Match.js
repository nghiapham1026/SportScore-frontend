import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams, useLocation } from 'react-router-dom';

import './Match.css';  // Import the new CSS file
import MatchScore from './MatchScore';
import MatchStatistics from './MatchStatistics';
import HeadToHead from './HeadToHead';
import { fetchData } from '../../utils/fetchData';

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
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`https://sportscore-a1cf52e3ff48.herokuapp.com/fixtures/db/getStatistics`, {
                    params: { fixture: fixtureId }
                });
                setStatistics(response.data.allFixtureStatistics);
                        
                const h2hResponse = await axios.get(`https://sportscore-a1cf52e3ff48.herokuapp.com/fixtures/db/getHeadToHead?h2h=${team1Id}-${team2Id}`);
                setHeadToHeadData(h2hResponse.data.allHeadToHeadFixtures);
                console.log(team1Id, team2Id);
        
            } catch (err) {
                setError(err.message);
            }
        };        
        fetchStatistics();
    }, [fixtureId]);

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