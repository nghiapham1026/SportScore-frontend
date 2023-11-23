import React from 'react';
import { useParams } from 'react-router-dom';
import TeamInfo from './TeamInfo';
import TeamSquad from './TeamSquad';

const Team = () => {
    const { teamId } = useParams();

    return (
        <div>
            <TeamInfo teamId={teamId} />
            <TeamSquad teamId={teamId} />
        </div>
    );
};

export default Team;
