import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Match.css';
import MatchScore from './MatchScore';
import MatchStatistics from './MatchStatistics';
import HeadToHead from './HeadToHead';
import { fetchStatistics, fetchHeadToHead, fetchFixtures } from '../../utils/dataController';

function Match() {
    const { fixtureId } = useParams();

    const [fixtureDetails, setFixtureDetails] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [headToHeadData, setHeadToHeadData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const allFixtures = await fetchFixtures({ id: fixtureId });
                setFixtureDetails(allFixtures[0]);
    
                const stats = await fetchStatistics({ fixture: fixtureId });
                setStatistics(stats);
    
                const h2h = await fetchHeadToHead({ h2h: `${allFixtures[0].teams.home.id}-${allFixtures[0].teams.away.id}` });
                setHeadToHeadData(h2h);
            } catch (err) {
                setError(err.message);
            }
        };         
        getData();
    }, [fixtureId]);
    

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!statistics || !fixtureDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <MatchScore 
                team1Logo={fixtureDetails.teams.home.logo} 
                team2Logo={fixtureDetails.teams.away.logo} 
                team1Score={fixtureDetails.goals.home} 
                team2Score={fixtureDetails.goals.away} 
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
