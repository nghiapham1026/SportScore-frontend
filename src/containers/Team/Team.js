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
            <h4>Team Statistics is temporary disabled due to API limits</h4>

            {/* Currently Unstable due to API limits
            <TeamStatistics teamId={teamId} />
            */}

        </div>
    );
};

export default Team;
