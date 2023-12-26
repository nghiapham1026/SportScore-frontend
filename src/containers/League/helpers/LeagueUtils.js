import React from 'react';
import LeagueTable from '../LeagueTable';

export function handleSeasonChange(seasons, seasonId) {
  return seasons.find((s) => s._id === seasonId);
}

export function RenderStandings({ standings }) {
  if (!Array.isArray(standings) || standings.length === 0) {
    console.log('No valid table data.');
    return null;
  }

  if (standings[0] instanceof Array) {
    return standings.map((group, groupIndex) => (
      <div key={groupIndex}>
        <LeagueTable tableData={group} />
      </div>
    ));
  }

  return <LeagueTable tableData={standings} />;
}
