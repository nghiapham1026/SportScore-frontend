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
                    setTeamDetails(teams[0]); // Accessing the first team in the array
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
        <div>
            <h1>{team.name}</h1>
            <img src={team.logo} alt={team.name} />
            <p>Code: {team.code}</p>
            <p>Country: {team.country}</p>
            <p>Founded: {team.founded}</p>

            <h2>Venue: {venue.name}</h2>
            <img src={venue.image} alt={venue.name} />
            <p>Address: {venue.address}, {venue.city}</p>
            <p>Capacity: {venue.capacity}</p>
            <p>Surface: {venue.surface}</p>
        </div>
    );
};

export default Team;
