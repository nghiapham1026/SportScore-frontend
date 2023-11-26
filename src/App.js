import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './containers/Home/Home';
import FixturePage from './containers/Fixtures/Fixtures';
import Match from './containers/Match/Match';
import League from './containers/League/League';
import Team from './containers/Team/Team';
import Players from './containers/Players/Players';
import LeagueResultsPage from './containers/League/LeagueResultsPage';
import LeagueFixturesPage from './containers/League/LeagueFixturesPage';
// Import other pages like LeagueScorersPage, LeagueAssistsPage

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fixtures" element={<FixturePage />} />
                <Route path="/match/:fixtureId" element={<Match />} />
                <Route path="/league/:leagueId" element={<League />} />
                <Route path="/league/:leagueId/results" element={<LeagueResultsPage />} />
                <Route path="/league/:leagueId/fixtures" element={<LeagueFixturesPage />} />
                {/* Add routes for scorers and assists pages */}
                <Route path="/team/:teamId" element={<Team />} />
                <Route path="/players/:playerId" element={<Players />} />
            </Routes>
        </Router>
    );
}

export default App;
