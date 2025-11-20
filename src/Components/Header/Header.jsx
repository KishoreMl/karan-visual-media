import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/primary_logo.png';
import ThemeToggleButton from './ThemeToggleButton';
import MobileMenu from './MobileMenu';
import './Header.scss';
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            <header className="header">
                <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
            
                <div className="nav-bar desktop-nav">
                    <Link to="/" className={`nav-bar-item ${isActive('/') ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/services" className={`nav-bar-item ${isActive('/services') ? 'active' : ''}`}>
                        Services
                    </Link>
                    <Link to="/works" className={`nav-bar-item ${isActive('/works') ? 'active' : ''}`}>
                        Works
                    </Link>
                    <Link to="/about" className={`nav-bar-item ${isActive('/about') ? 'active' : ''}`}>
                        About
                    </Link>
                </div>

                <button 
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'hidden' : ''}`} 
                    onClick={toggleMobileMenu}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </header>

            <MobileMenu isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} isActive={isActive} />
        </>
    );
};

export default Header;