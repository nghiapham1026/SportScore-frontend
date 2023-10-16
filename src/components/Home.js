import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import FixturePage from './Fixtures';
import Match from './Match';

function Navbar() {
    return (
        <nav style={{ backgroundColor: '#333', padding: '10px 0', marginBottom: '20px' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}>
                <li>
                    <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</Link>
                    <Link to="/fixtures" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Fixtures</Link>
                </li>
                {/* Add more navigation links as needed */}
            </ul>
        </nav>
    );
}

function LeagueLogos() {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await axios.get('https://sportscore-a1cf52e3ff48.herokuapp.com/leagues/db/getLeagues');
                setLeagues(response.data.allLeagues);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchLeagues();
    }, []);

    const logoStyle = {
        width: '100px',
        margin: '10px',
        transition: 'transform 0.2s',
        cursor: 'pointer'
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {leagues.map((leagueData) => (
                <div key={leagueData.league.id}>
                    <img 
                        src={leagueData.league.logo} 
                        alt={leagueData.league.name} 
                        style={logoStyle}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </div>
            ))}
        </div>
    );
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LeagueLogos />} />
                <Route path="/fixtures" element={<FixturePage />} />
                <Route path="/match/:fixtureId" element={<Match />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
