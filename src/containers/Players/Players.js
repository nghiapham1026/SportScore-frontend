import React from 'react';
import { useParams } from 'react-router-dom';

const Players = () => {
    const { playerId } = useParams();

    return(
        <h1>{playerId}</h1>
    );
};

export default Players;