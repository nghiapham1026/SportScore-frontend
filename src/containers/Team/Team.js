import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTeams } from '../../utils/dataController'; // Adjust the path as necessary
import './Team.css';

const Team = () => {
    const [teamDetails, setTeamDetails] = useState(null);
    const [error, setError] = useState(null);
    const { teamId } = useParams();

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const teams = await getTeams({ id: teamId });
                if (teams && teams.length > 0) {
                    setTeamDetails(teams[0]);
                } else {
                    setError('No team data found');
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchTeamData();
    }, [teamId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!teamDetails) {
        return <p>Loading...</p>;
    }

    const { team, venue } = teamDetails;

    return (
        <div className="team-container">
            <div className="team-header">
                <img src={team.logo} alt={team.name} className="team-logo" />
                <h1>{team.name}</h1>
                <div className="info-row">
                    <p>Code: {team.code}</p>
                    <p>Country: {team.country}</p>
                    <p>Founded: {team.founded}</p>
                </div>
            </div>

            <div className="venue-info">
                <div className="venue-header">
                    <img src={venue.image} alt={venue.name} className="venue-image" />
                    <h2>Venue: {venue.name}</h2>
                </div>
                <div className="info-row">
                    <p>Address: {venue.address}, {venue.city}</p>
                    <p>Capacity: {venue.capacity}</p>
                    <p>Surface: {venue.surface}</p>
                </div>
            </div>
        </div>
    );
};

export default Team;
