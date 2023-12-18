import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Match.css';
import MatchScore from './MatchScore';
import MatchStatistics from './MatchStatistics';
import HeadToHead from './HeadToHead';
import MatchLineup from './MatchLineup';
import { fetchStatistics, fetchHeadToHead, fetchFixtures, getEvents, getLineups } from '../../utils/dataController';

function Match() {
    const { fixtureId } = useParams();

    const [fixtureDetails, setFixtureDetails] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [headToHeadData, setHeadToHeadData] = useState([]);
    const [eventData, setEvents] = useState(null);
    const [lineupData, setLineup] = useState(null);
    const [error, setError] = useState(null);

    const [activeSection, setActiveSection] = useState('lineup');

    useEffect(() => {
        const getData = async () => {
            try {
                const allFixtures = await fetchFixtures({ id: fixtureId });
                setFixtureDetails(allFixtures[0]);
    
                const stats = await fetchStatistics({ fixture: fixtureId });
                setStatistics(stats);
    
                const h2h = await fetchHeadToHead({ h2h: `${allFixtures[0].teams.home.id}-${allFixtures[0].teams.away.id}` });
                setHeadToHeadData(h2h);

                const events = await getEvents({ fixture: fixtureId });
                setEvents(events);

                const lineups = await getLineups({ fixture: fixtureId });
                setLineup(lineups);
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

    const toggleSection = (section) => {
        setActiveSection(section);
    }

    return (
        <div>
            <MatchScore 
                team1Id={fixtureDetails.teams.home.id}
                team2Id={fixtureDetails.teams.away.id}
                team1Logo={fixtureDetails.teams.home.logo}
                team2Logo={fixtureDetails.teams.away.logo} 
                team1Score={fixtureDetails.goals.home} 
                team2Score={fixtureDetails.goals.away} 
                eventData={eventData}
            />
            <div className="match-nav">
                <button 
                    className={`nav-button ${activeSection === 'lineup' ? 'active' : ''}`} 
                    onClick={() => toggleSection('lineup')}
                >
                    Lineups
                </button>
                <button 
                    className={`nav-button ${activeSection === 'statistics' ? 'active' : ''}`} 
                    onClick={() => toggleSection('statistics')}
                >
                    Statistics
                </button>
                <button 
                    className={`nav-button ${activeSection === 'headToHead' ? 'active' : ''}`} 
                    onClick={() => toggleSection('headToHead')}
                >
                    Head-to-Head
                </button>
            </div>
            {activeSection === 'lineup' && <MatchLineup lineupData={lineupData} />}
            {activeSection === 'statistics' && (
                <div className="teamsContainer">
                    {statistics.map((teamStats) => (
                        <MatchStatistics key={teamStats.team.id} teamStats={teamStats} />
                    ))}
                </div>
            )}
            {activeSection === 'headToHead' && <HeadToHead headToHeadData={headToHeadData} />}
        </div>
    );    
}

export default Match;
