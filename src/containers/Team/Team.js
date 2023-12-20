import React from 'react';
import { useParams } from 'react-router-dom';
import TeamInfo from './TeamInfo';
import TeamSquad from './TeamSquad';
import TeamStatistics from './TeamStatistics';

const Team = () => {
    const { teamId } = useParams();

    return (
        <div>
            <TeamInfo teamId={teamId} />
            <TeamSquad teamId={teamId} />
            <TeamStatistics teamId={teamId} />
        </div>
    );
};

export default Team;
