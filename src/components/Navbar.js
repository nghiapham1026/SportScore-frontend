import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './NavBar.module.css'; // Updated import statement

function Navbar() {
  const { user, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    // Add any additional logic needed after sign out, like redirecting
  };

  return (
    <nav className={styles.navbarContainer}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <Link to="/" className={styles.navbarLink}>Home</Link>
          <Link to="/fixtures" className={styles.navbarLink}>Fixtures</Link>
          <Link to="/news" className={styles.navbarLink}>News</Link>
        </li>
        <li className={`${styles.navbarItem} ${styles.signInLink}`}>
          {user ? (
            <>
              <Link to="/profile" className={styles.navbarLink}>Profile</Link>
              <Link to="/signin" onClick={handleSignOut} className={styles.navbarLink}>Sign Out</Link>
            </>
          ) : (
            <Link to="/signin" className={styles.navbarLink}>Sign In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
