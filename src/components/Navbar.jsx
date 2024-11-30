import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-link">
                <i className="fas fa-home"></i>
            </Link>

            <Link to="/hospital-database" className="navbar-link">
                <i className="fas fa-bars"></i>
            </Link>

            <Link to="/" className="navbar-link logout">
                <i className="fas fa-sign-out-alt"></i>
            </Link>
        </nav>
    );
};

export default Navbar;