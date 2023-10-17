import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ backgroundColor: '#333', padding: '10px 0', marginBottom: '20px' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}>
                <li>
                    <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</Link>
                    <Link to="/fixtures" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Fixtures</Link>
                </li>
                {/* Add more navigation links as needed */}
            </ul>
        </nav>
    );
}

export default Navbar;
