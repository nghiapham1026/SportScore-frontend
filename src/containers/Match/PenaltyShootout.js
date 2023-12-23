import React from 'react';
import './PenaltyShootout.css'; // Ensure you create and import the corresponding CSS

const PenaltyShootout = ({ shootoutData, team1Logo, team2Logo }) => {
  // Split the shootout data into two arrays based on team logo
  const team1ShootoutData = shootoutData.filter(event => event.team.logo === team1Logo);
  const team2ShootoutData = shootoutData.filter(event => event.team.logo === team2Logo);

  const renderShootoutAttempts = (teamShootoutData, teamLogo) => (
    <div className="shootout-column">
      <img src={teamLogo} alt="Team Logo" className="shootout-team-logo" />
      {teamShootoutData.map((event, index) => (
        <div key={index} className="shootout-row">
          <span className="player-name">{event.player.name}</span>
          {event.type === "Goal" && event.detail !== "Missed Penalty" ? (
            <span className="goal-icon">✔️</span>
          ) : (
            <span className="miss-icon">❌</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="shootout-container">
      <div className="shootout-header">
        <h2>PENALTY SHOOTOUT</h2>
      </div>

      <div className="shootout-teams">
        {renderShootoutAttempts(team1ShootoutData, team1Logo)}
        {renderShootoutAttempts(team2ShootoutData, team2Logo)}
      </div>
    </div>
  );
};

export default PenaltyShootout;
