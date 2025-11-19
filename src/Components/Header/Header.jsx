import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/primary_logo.png';
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
            {/* Theme Toggle Button - Fixed at Top Center */}
            <div className="theme-toggle-container">
                <button 
                    className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    <div className="toggle-track">
                        <div className="toggle-thumb">
                            {isDarkMode ? (
                                <svg className="icon moon-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                </svg>
                            ) : (
                                <svg className="icon sun-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="12" r="5"/>
                                    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            )}
                        </div>
                    </div>
                </button>
            </div>

            <header className="header">
                <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                
                {/* Desktop Navigation */}
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

                {/* Mobile Hamburger Menu Button */}
                <button 
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'hidden' : ''}`} 
                    onClick={toggleMobileMenu}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </header>

            {/* Mobile/Tablet Full Screen Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <h2 className="mobile-brand">CREATIVE KNACKS</h2>
                    <button className="close-button" onClick={closeMobileMenu}>
                        ✕
                    </button>
                </div>
                
                <nav className="mobile-nav">
                    <Link 
                        to="/" 
                        className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        HOME
                    </Link>
                    <Link 
                        to="/about" 
                        className={`mobile-nav-item ${isActive('/about') ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        ABOUT
                    </Link>
                    <Link 
                        to="/services" 
                        className={`mobile-nav-item ${isActive('/services') ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        SERVICES
                    </Link>
                    <Link 
                        to="/works" 
                        className={`mobile-nav-item ${isActive('/works') ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        WORKS
                    </Link>
                    <Link 
                        to="/contact" 
                        className={`mobile-nav-item ${isActive('/contact') ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        CONTACT
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Header;