import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import FixturePage from './Fixtures';
import Match from './Match';

function Home() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/fixtures">Fixtures</Link>
                        </li>
                        {/* Add more navigation links as needed */}
                    </ul>
                </nav>

                <Routes>
                    <Route path="/fixtures" element={<FixturePage />} />
                    <Route path="/match/:fixtureId" element={<Match />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default Home;
