// PlayerDetails.js
import React from 'react';

const PlayerDetails = ({ player }) => {
    return (
        <div>
            <img src={player.photo} alt={player.name} className="player-photo"/>
            <p><strong>Name:</strong> {player.name}</p>
            <p><strong>First Name:</strong> {player.firstname}</p>
            <p><strong>Last Name:</strong> {player.lastname}</p>
            <p><strong>Age:</strong> {player.age}</p>
            <p><strong>Date of Birth:</strong> {player.birth.date}</p>
            <p><strong>Place of Birth:</strong> {player.birth.place}</p>
            <p><strong>Country:</strong> {player.birth.country}</p>
            <p><strong>Nationality:</strong> {player.nationality}</p>
            <p><strong>Height:</strong> {player.height}</p>
            <p><strong>Weight:</strong> {player.weight}</p>
            <p><strong>Injured:</strong> {player.injured ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default PlayerDetails;
