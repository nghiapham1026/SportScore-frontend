// TeamSquad.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSquads } from '../../utils/dataController';
import './TeamSquad.css'; // Create and import a CSS file for styling

const TeamSquad = ({ teamId }) => {
    const [squadData, setSquadData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSquadData = async () => {
            try {
                const squads = await getSquads({ team: teamId });
                if (squads && squads.length > 0) {
                    setSquadData(squads[0].players); // Assuming the players are in the first item
                } else {
                    setError('No squad data found');
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchSquadData();
    }, [teamId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!squadData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="squad-container">
            <h2>Squad List</h2>
            <div className="players-list">
                {squadData.map(player => (
                    <div key={player.id} className="player-card">
                        <img src={player.photo} alt={player.name} className="player-photo" />
                        <div className="player-info">
                            <Link to={`/players/${player.id}`}><h3>{player.name}</h3></Link>
                            <p>Age: {player.age}</p>
                            <p>Number: {player.number}</p>
                            <p>Position: {player.position}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSquad;
