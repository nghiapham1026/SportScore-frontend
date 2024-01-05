import React from 'react';
import styles from './MatchScore.module.css'; // Updated import statement
import { Link } from 'react-router-dom';
import MatchTimeline from './MatchTimeline';
import PropTypes from 'prop-types';

function MatchScore({
  team1Logo,
  team2Logo,
  team1Score,
  team2Score,
  team1Id,
  team2Id,
  eventData,
}) {
  const isRegularGoal = (event) =>
    event.type === 'Goal' && event.comments !== 'Penalty Shootout';

  const extractTeamIdFromLogoUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1]; // Get the last part of the URL
  };

  const team1Goals = (eventData || []).filter(
    (event) =>
      isRegularGoal(event) &&
      extractTeamIdFromLogoUrl(event.team.logo) ===
        extractTeamIdFromLogoUrl(team1Logo)
  );
  const team2Goals = (eventData || []).filter(
    (event) =>
      isRegularGoal(event) &&
      extractTeamIdFromLogoUrl(event.team.logo) ===
        extractTeamIdFromLogoUrl(team2Logo)
  );

  return (
    <div className={styles.matchContainer}>
      <div className={styles.teamScoreContainer}>
        <div className={styles.teamInfo}>
          <Link to={`/team/${team1Id}`}>
            <img
              src={team1Logo}
              alt="Team 1 Logo"
              className={styles.teamLogo}
            />
          </Link>
          <div className={styles.goalDetails}>
            {team1Goals.map((goal) => (
              <Link to={`/players/${goal.player.id}`} key={goal._id}>
                <div>
                  {goal.player.name} {goal.time.elapsed}&apos;
                  {goal.detail === 'Own Goal' ? '(OG)' : ''}{' '}
                  {goal.detail === 'Penalty' &&
                  goal.comments !== 'Penalty Shootout'
                    ? '(P)'
                    : ''}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <span className={styles.score}>
          {team1Score} - {team2Score}
        </span>
        <div className={styles.teamInfo}>
          <Link to={`/team/${team2Id}`}>
            <img
              src={team2Logo}
              alt="Team 2 Logo"
              className={styles.teamLogo}
            />
          </Link>
          <div className={styles.goalDetails}>
            {team2Goals.map((goal) => (
              <Link to={`/players/${goal.player.id}`} key={goal._id}>
                <div>
                  {goal.player.name} {goal.time.elapsed}&apos;{' '}
                  {goal.detail === 'Own Goal' ? '(OG)' : ''}{' '}
                  {goal.detail === 'Penalty' &&
                  goal.comments !== 'Penalty Shootout'
                    ? '(P)'
                    : ''}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <MatchTimeline
        eventData={eventData}
        team1Logo={team1Logo}
        team2Logo={team2Logo}
      />
    </div>
  );
}

MatchScore.propTypes = {
  team1Logo: PropTypes.string.isRequired,
  team2Logo: PropTypes.string.isRequired,
  team1Score: PropTypes.number.isRequired,
  team2Score: PropTypes.number.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  eventData: PropTypes.array.isRequired, // Assuming eventData is an array
};

export default MatchScore;
