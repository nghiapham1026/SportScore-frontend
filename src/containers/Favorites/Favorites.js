import React, { useState, useContext } from 'react';
import styles from './Favorites.module.css';
import { AuthContext } from '../../context/AuthContext';
import FavoriteFixtures from './FavoriteFixtures'; // Import the FavoriteFixtures component
import FavoriteTable from './FavoriteTable';

function Favorites() {
  const today = new Date().toISOString().slice(0, 10);
  const { user, userData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  if (!user) {
    return <div>Please log in to view your favorites.</div>;
  }

  const favoriteLeagues = userData?.favoriteLeagues || [];

  return (
    <div className={styles.container}>
      <h2>Favorites Feed for {user.displayName || user.email}</h2>
      {favoriteLeagues.length > 0 ? (
        <ul className={styles.leagueList}>
          {favoriteLeagues.map((league, index) => (
            <li key={index} className={styles.leagueItem}>
              {league.logo && <img src={league.logo} alt={league.name} />}
              {league.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noLeagues}>
          You have no favorite leagues added. Start adding some!
        </p>
      )}

      <label htmlFor="calendar" className={styles.calendarLabel}>
        Choose a date:
      </label>
      <input
        type="date"
        id="calendar"
        name="calendar"
        value={selectedDate}
        onChange={handleDateChange}
        className={styles.calendarInput}
      />

      <FavoriteFixtures selectedDate={selectedDate} />
      <FavoriteTable />
    </div>
  );
}

export default Favorites;
