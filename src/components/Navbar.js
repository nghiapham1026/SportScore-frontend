import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  return (
    <nav className="navbarContainer">
      <ul className="navbarList">
        <li>
          <Link to="/" className="navbarLink">
            Home
          </Link>
          <Link to="/fixtures" className="navbarLink">
            Fixtures
          </Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
