import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/primary_logo.png';
import './Header.scss';

const Header = () => {


    return (
        <header className="header">
           <div className="logo">
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
           </div>
            <div className="nav-bar">
                <Link to="/" className="nav-bar-item">
                    Home
                </Link>
                <Link to="/services" className="nav-bar-item">
                    Services
                </Link>
                <Link to="/contact" className="nav-bar-item">
                    Works
                </Link>
                <Link to="/about" className="nav-bar-item">
                    About
                </Link>
            </div>
        </header>
    );
};

export default Header;