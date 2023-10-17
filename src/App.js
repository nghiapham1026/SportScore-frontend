import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './containers/Home/Home';
import FixturePage from './containers/Fixtures';
import Match from './containers/Match';
import LeaguePage from './containers/LeaguePage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fixtures" element={<FixturePage />} />
                <Route path="/match/:fixtureId" element={<Match />} />
                <Route path="/league/:leagueId" element={<LeaguePage />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
