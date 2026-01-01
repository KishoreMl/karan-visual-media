import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/primary_logo.png';
import MobileMenu from './MobileMenu';
import './Header.scss';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const headerRef = useRef(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    // Set header height as CSS variable for hero section calculation
    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                const height = headerRef.current.offsetHeight;
                document.documentElement.style.setProperty('--header-height', `${height}px`);
            }
        };

        // Initial measurement
        updateHeaderHeight();

        // Update on resize
        window.addEventListener('resize', updateHeaderHeight);
        
        // Update when mobile menu opens/closes
        const timer = setTimeout(updateHeaderHeight, 100);

        return () => {
            window.removeEventListener('resize', updateHeaderHeight);
            clearTimeout(timer);
        };
    }, [isMobileMenuOpen]);

    return (
        <>

            <header className="header" ref={headerRef}>
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