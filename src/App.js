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
import LeagueScorersPage from './containers/League/LeagueScorersPage';
import LeagueAssistsPage from './containers/League/LeagueAssistsPage';
import Predictions from './containers/Predictions/Predictions';
import News from './containers/News/News';
import { AuthProvider } from './context/AuthContext';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
import SignUp from './components/SignUp/SignUp';
import SignOut from './components/SignOut/SignOut';
import Favorites from './containers/Favorites/Favorites';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fixtures" element={<FixturePage />} />
          <Route path="/fixture/:fixtureId" element={<Match />} />
          <Route path="/league/:leagueId" element={<League />} />
          <Route
            path="/league/:leagueId/results"
            element={<LeagueResultsPage />}
          />
          <Route
            path="/league/:leagueId/fixtures"
            element={<LeagueFixturesPage />}
          />
          <Route
            path="/league/:leagueId/scorers"
            element={<LeagueScorersPage />}
          />
          <Route
            path="/league/:leagueId/assists"
            element={<LeagueAssistsPage />}
          />
          <Route path="/team/:teamId" element={<Team />} />
          <Route path="/players/:playerId" element={<Players />} />
          <Route
            path="/fixture/predictions/:fixtureId"
            element={<Predictions />}
          />
          <Route path="/news" element={<News />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />}></Route>
          <Route path='/favorites' element={<Favorites />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
