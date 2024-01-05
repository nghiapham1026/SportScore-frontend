import React from 'react';
import styles from './HeadToHead.module.css'; // Updated import statement
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function HeadToHead({ headToHeadData }) {
  if (headToHeadData.length === 0) {
    return (
      <div className={styles.headToHeadContainer}>
        <h2 className={styles.headToHeadTitle}>Head-to-Head Data</h2>
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className={styles.headToHeadContainer}>
      <h2 className={styles.headToHeadTitle}>Head-to-Head Data</h2>
      {headToHeadData
        .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))
        .map((match, idx) => (
          <div key={idx} className={styles.matchItem}>
            <div className={styles.matchDate}>
              <strong>Date:</strong>{' '}
              {new Date(match.fixture.date).toLocaleDateString()}
            </div>
            <Link to={`/match/${match.fixture.id}`}>
              <div className={styles.matchScore}>
                <strong>Score:</strong> {match.teams.home.name}{' '}
                {match.goals.home} - {match.goals.away} {match.teams.away.name}
              </div>
            </Link>
            <div className={styles.matchVenue}>
              <strong>Venue:</strong> {match.fixture.venue.name},{' '}
              {match.fixture.venue.city}
            </div>
            {idx < headToHeadData.length - 1 && (
              <hr className={styles.hrStyle} />
            )}{' '}
            {/* Don't render <hr> after last item */}
          </div>
        ))}
    </div>
  );
}

HeadToHead.propTypes = {
  headToHeadData: PropTypes.arrayOf(
    PropTypes.shape({
      fixture: PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        venue: PropTypes.shape({
          name: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      teams: PropTypes.shape({
        home: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        away: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      goals: PropTypes.shape({
        home: PropTypes.number,
        away: PropTypes.number,
      }).isRequired,
    })
  ).isRequired,
};

export default HeadToHead;
