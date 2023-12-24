import React from 'react';
import styles from './MatchScore.module.css'; // Updated import statement
import { Link } from 'react-router-dom';
import MatchTimeline from './MatchTimeline';

function MatchScore({ team1Logo, team2Logo, team1Score, team2Score, team1Id, team2Id, eventData }) {
    const isRegularGoal = (event) => event.type === "Goal" && event.comments !== "Penalty Shootout";

    const team1Goals = (eventData || []).filter(event => isRegularGoal(event) && event.team.logo === team1Logo);
    const team2Goals = (eventData || []).filter(event => isRegularGoal(event) && event.team.logo === team2Logo);

    return (
        <div className={styles.matchContainer}>
            <div className={styles.teamScoreContainer}>
                <div className={styles.teamInfo}>
                    <Link to={`/team/${team1Id}`}>
                        <img src={team1Logo} alt="Team 1 Logo" className={styles.teamLogo} />
                    </Link>
                    <div className={styles.goalDetails}>
                        {team1Goals.map(goal => (
                            <Link to={`/players/${goal.player.id}`} key={goal._id}><div>{goal.player.name} {goal.time.elapsed}'</div></Link>
                        ))}
                    </div>
                </div>
                <span className={styles.score}>{team1Score} - {team2Score}</span>
                <div className={styles.teamInfo}>
                    <Link to={`/team/${team2Id}`}>
                        <img src={team2Logo} alt="Team 2 Logo" className={styles.teamLogo} />
                    </Link>
                    <div className={styles.goalDetails}>
                            {team2Goals.map(goal => (
                                <Link to={`/players/${goal.player.id}`} key={goal._id}>
                                <div>
                                {goal.player.name} {goal.time.elapsed}' {goal.detail === "Own Goal" ? "(OG)" : ""} {goal.detail === "Penalty" && goal.comments !== "Penalty Shootout" ? "(PK)" : ""}
                                </div>
                            </Link>
                            ))}
                        </div>
                </div>
            </div>
            
            <MatchTimeline eventData={eventData} team1Logo={team1Logo} team2Logo={team2Logo} />
        </div>
    );
}

export default MatchScore;
