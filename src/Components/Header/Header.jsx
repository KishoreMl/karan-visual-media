import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.webp';
import './Header.scss';

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
           <div className="logo">
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
           </div>
            <div className="nav-bar">
                <Link to="/" className={`nav-bar-item ${location.pathname === '/' ? 'active' : ''}`}>
                    Home
                </Link>
                <Link to="/services" className={`nav-bar-item ${location.pathname === '/services' ? 'active' : ''}`}>
                    Services
                </Link>
                <Link to="/about" className={`nav-bar-item ${location.pathname === '/about' ? 'active' : ''}`}>
                    About
                </Link>
                <Link to="/contact" className={`nav-bar-item ${location.pathname === '/contact' ? 'active' : ''}`}>
                    Contact
                </Link>
            </div>
        </header>
    );
};

export default Header;