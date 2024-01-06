import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import './NavBar.css';

function Navbar() {
  const { user, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    // Add any additional logic needed after sign out, like redirecting
  };

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
          {user ? (
            <>
              <Link to="/profile" className="navbarLink">
                Profile
              </Link>
              <Link to="/signin" onClick={handleSignOut} className="navbarLink">
                Sign Out
              </Link>
            </>
          ) : (
            <Link to="/signin" className="navbarLink">
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
