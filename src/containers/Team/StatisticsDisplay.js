// StatisticsDisplay.js

import React from 'react';
import styles from './StatisticsDisplay.module.css';
import PropTypes from 'prop-types';

const StatisticsDisplay = ({ stats }) => {
  return (
    <div className={styles.statisticsContainer}>
      <h3>Fixtures</h3>
      <div className={styles.fixtures}>
        <div>
          Played - Home: {stats.fixtures.played.home}, Away:{' '}
          {stats.fixtures.played.away}, Total: {stats.fixtures.played.total}
        </div>
        <div>
          Wins - Home: {stats.fixtures.wins.home}, Away:{' '}
          {stats.fixtures.wins.away}, Total: {stats.fixtures.wins.total}
        </div>
        <div>
          Draws - Home: {stats.fixtures.draws.home}, Away:{' '}
          {stats.fixtures.draws.away}, Total: {stats.fixtures.draws.total}
        </div>
        <div>
          Loses - Home: {stats.fixtures.loses.home}, Away:{' '}
          {stats.fixtures.loses.away}, Total: {stats.fixtures.loses.total}
        </div>
      </div>

      <h3>Goals</h3>
      <div className={styles.goals}>
        <div>
          For - Home: {stats.goals.for.total.home}, Away:{' '}
          {stats.goals.for.total.away}, Total: {stats.goals.for.total.total}
        </div>
        <div>
          Against - Home: {stats.goals.against.total.home}, Away:{' '}
          {stats.goals.against.total.away}, Total:{' '}
          {stats.goals.against.total.total}
        </div>
      </div>

      <h3>Biggest win and loss</h3>
      <div className={styles.biggest}>
        <div>
          Biggest Wins - Home: {stats.biggest.wins.home}, Away:{' '}
          {stats.biggest.wins.away}
        </div>
        <div>
          Biggest Loses - Home: {stats.biggest.loses.home || 'N/A'}, Away:{' '}
          {stats.biggest.loses.away || 'N/A'}
        </div>
      </div>

      <h3>Penalty</h3>
      <div className={styles.penalty}>
        <div>
          Scored: {stats.penalty.scored.total}, Missed:{' '}
          {stats.penalty.missed.total}, Total: {stats.penalty.total}
        </div>
      </div>

      <h3>Cards</h3>
      <div className={styles.cards}>
        <div>Yellow cards: </div>
        <div>{/** Yellow card data */}</div>
        <div>Red cards: </div>
        <div>{/** Red card data */}</div>
      </div>

      <h3>Form</h3>
      <div className={styles.statHighlight}>{stats.form}</div>

      <h3>Clean Sheets</h3>
      <div className={styles.cleanSheets}>
        <div>
          Home: {stats.clean_sheet.home}, Away: {stats.clean_sheet.away}, Total:{' '}
          {stats.clean_sheet.total}
        </div>
      </div>

      <h3>Failed to Score</h3>
      <div className={styles.failedToScore}>
        <div>
          Home: {stats.failed_to_score.home}, Away: {stats.failed_to_score.away}
          , Total: {stats.failed_to_score.total}
        </div>
      </div>

      <h3>Lineups</h3>
      <div className={styles.lineups}>
        {stats.lineups.map((lineup, index) => (
          <div key={index}>
            Formation: {lineup.formation}, Played: {lineup.played}
          </div>
        ))}
      </div>
    </div>
  );
};

StatisticsDisplay.propTypes = {
  stats: PropTypes.shape({
    fixtures: PropTypes.shape({
      played: PropTypes.shape({
        home: PropTypes.number.isRequired,
        away: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
      wins: PropTypes.shape({
        home: PropTypes.number.isRequired,
        away: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
      draws: PropTypes.shape({
        home: PropTypes.number.isRequired,
        away: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
      loses: PropTypes.shape({
        home: PropTypes.number.isRequired,
        away: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    goals: PropTypes.shape({
      for: PropTypes.shape({
        total: PropTypes.shape({
          home: PropTypes.number.isRequired,
          away: PropTypes.number.isRequired,
          total: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
      against: PropTypes.shape({
        total: PropTypes.shape({
          home: PropTypes.number.isRequired,
          away: PropTypes.number.isRequired,
          total: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    biggest: PropTypes.shape({
      wins: PropTypes.shape({
        home: PropTypes.string,
        away: PropTypes.string,
      }),
      loses: PropTypes.shape({
        home: PropTypes.string,
        away: PropTypes.string,
      }),
    }),
    penalty: PropTypes.shape({
      scored: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }).isRequired,
      missed: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }).isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
    form: PropTypes.string,
    clean_sheet: PropTypes.shape({
      home: PropTypes.number.isRequired,
      away: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
    failed_to_score: PropTypes.shape({
      home: PropTypes.number.isRequired,
      away: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
    lineups: PropTypes.arrayOf(
      PropTypes.shape({
        formation: PropTypes.string,
        played: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
};

export default StatisticsDisplay;
