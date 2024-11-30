import React from 'react';
import '../assets/styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src="https://logos-download.com/wp-content/uploads/2021/01/ABC_Logo.png" alt="Bệnh viện Logo" className="logo" />
                <h1 className="header-title">ABC HOSPITAL</h1>
            </div>
        </header>
    );
};

export default Header;
