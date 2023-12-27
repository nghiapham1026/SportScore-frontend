import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; // Updated import statement
import { getLeagues } from '../../utils/dataController'; // Adjust the path to dataController.js if necessary

function Home() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const leaguesData = await getLeagues(); // Using the function from dataController.js
        setLeagues(leaguesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchLeagues();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.homeContainer}>
      {leagues.map((leagueData) => (
        <div key={leagueData.league.id}>
          <Link to={`/league/${leagueData.league.id}`}>
            <img
              src={leagueData.league.logo}
              alt={leagueData.league.name}
              className={styles.logoStyle} // Updated class reference
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
