import React from 'react';

function LeagueHeader({ leagueName, logo, toggleLeague }) {
    return (
        <h2 className="leagueHeader" onClick={() => toggleLeague(leagueName)}>
            <img src={logo} alt={`${leagueName} logo`} className="leagueLogo" />
            {leagueName}
        </h2>
    );
}

export default LeagueHeader;
