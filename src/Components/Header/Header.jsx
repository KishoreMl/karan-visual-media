import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/primary_logo.png';
import './Header.scss';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <header className="header">
                <div className="logo">
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
                    <Link to="/contact" className={`nav-bar-item ${isActive('/contact') ? 'active' : ''}`}>
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