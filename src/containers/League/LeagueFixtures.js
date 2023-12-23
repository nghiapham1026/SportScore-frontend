import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFixtures } from '../../utils/dataController';
import styles from './LeagueFixtures.module.css'; // Updated import statement

const LeagueFixtures = ({ leagueId, selectedSeason }) => {
    const [fixtures, setFixtures] = useState([]);
    const [selectedRound, setSelectedRound] = useState('');

    useEffect(() => {
        const fetchLeagueFixtures = async () => {
            if (selectedSeason) {
                try {
                    const fetchedFixtures = await fetchFixtures({ league: leagueId, season: selectedSeason.year, status: 'NS' });
                    setFixtures(fetchedFixtures);
                } catch (err) {
                    console.error("Error fetching fixtures:", err);
                }
            }
        };
        fetchLeagueFixtures();
    }, [leagueId, selectedSeason]);

    const filteredFixtures = selectedRound
        ? fixtures.filter(fixture => fixture.league.round === selectedRound)
        : fixtures;

    return (
        <div className={styles.fixturesContainer}>
            <h3>Upcoming Fixtures</h3>
            
            <select className={styles.roundSelector} value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)}>
                <option value=''>All Rounds</option>
                {[...new Set(fixtures.map(fixture => fixture.league.round))].map(round => (
                    <option key={round} value={round}>{round}</option>
                ))}
            </select>

            <div>
                {filteredFixtures.map((fixture, index) => (
                    <div key={index} className={styles.fixtureItem}>
                        <div className={styles.fixtureHeader}>
                            <img className={styles.leagueLogo} src={fixture.league.logo} alt={fixture.league.name} />
                            <span>{fixture.league.name} - {fixture.league.country}</span>
                            <img className={styles.countryFlag} src={fixture.league.flag} alt={fixture.league.country} />
                        </div>
                        <div className={styles.fixtureDate}>
                            {new Date(fixture.fixture.date).toLocaleDateString()} {new Date(fixture.fixture.date).toLocaleTimeString()}
                        </div>
                        <div className={styles.fixtureVenue}>{fixture.fixture.venue.name}, {fixture.fixture.venue.city}</div>
                        <div className={styles.fixtureTeamsContainer}>
                            <div className={`${styles.fixtureItemTeam} ${styles.fixtureItemTeamLeft}`}>
                                <Link to={`/team/${fixture.teams.home.id}`}>
                                    <img className={styles.teamLogo} src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                                    <span>{fixture.teams.home.name}</span>
                                </Link>
                            </div>
                            <div className={styles.fixtureItemTeam}>
                                <span className={styles.fixtureVersus}>vs</span>
                            </div>
                            <div className={`${styles.fixtureItemTeam} ${styles.fixtureItemTeamRight}`}>
                                <Link to={`/team/${fixture.teams.away.id}`}>
                                    <img className={`${styles.teamLogo} ${styles.teamLogoRight}`} src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                                    <span>{fixture.teams.away.name}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeagueFixtures;
