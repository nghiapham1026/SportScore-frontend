import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './NavBar.module.css';
import logo from '../assets/logo.png';

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className={styles.navbarContainer}>
      <ul className={styles.navbarList}>
        <li className={styles.logoItem}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to="/" className={styles.navbarLink}>
            Home
          </Link>
          <Link to="/fixtures" className={styles.navbarLink}>
            Fixtures
          </Link>
          <Link to="/news" className={styles.navbarLink}>
            News
          </Link>
        </li>
        <li className={`${styles.navbarItem} ${styles.signInLink}`}>
          {user ? (
            <>
              <span className={styles.navbarLink}>
                Hi, {user.displayName || user.email}
              </span>
              <Link to="/profile" className={styles.navbarLink}>
                Profile
              </Link>
              <Link
                to="/signout"
                className={`${styles.navbarLink} ${styles.navbarButton}`}
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className={styles.navbarLink}>
                Sign In
              </Link>
              <Link to="/signup" className={styles.navbarLink}>
                Sign Up
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
