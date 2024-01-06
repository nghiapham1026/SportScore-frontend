import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  return (
    <nav className="navbarContainer">
      <ul className="navbarList">
        <li className="navbarItem">
          <Link to="/" className="navbarLink">
            Home
          </Link>
          <Link to="/fixtures" className="navbarLink">
            Fixtures
          </Link>
          <Link to="/news" className="navbarLink">
            News
          </Link>
        </li>
        <li className="navbarItem signInLink">
          <Link to="/signin" className="navbarLink">
            Sign In
          </Link>
          <Link to="/profile" className='navbarLink'>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
