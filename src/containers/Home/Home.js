import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchData } from '../../utils/fetchData';  // Adjust the path if necessary
import './Home.css';

function Home() {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLeagues = async () => {
            try {
                const leaguesData = await fetchData('/leagues/db/getLeagues');  // Default is GET request
                setLeagues(leaguesData.allLeagues);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        getLeagues();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {leagues.map((leagueData) => (
                <div key={leagueData.league.id}>
                    <Link to={`/league/${leagueData.league.id}`}>
                        <img 
                            src={leagueData.league.logo} 
                            alt={leagueData.league.name} 
                            className="logoStyle"  // Use the CSS class
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Home;
