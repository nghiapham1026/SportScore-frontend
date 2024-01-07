import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './NavBar.module.css';

function Navbar() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/'); // Redirect to home after sign out
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
              <span className={styles.navbarLink}>Hi, {user.displayName || user.email}</span>
              <Link to="/profile" className={styles.navbarLink}>Profile</Link>
              <button onClick={handleSignOut} className={`${styles.navbarLink} ${styles.navbarButton}`}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className={styles.navbarLink}>Sign In</Link>
              <Link to="/signup" className={styles.navbarLink}>Sign Up</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
