import React from 'react';
import logo from '../../assets/images/logo.webp';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
           <div className="logo">
            <img src={logo} alt="logo" />
           </div>
            <div className="nav-bar">
                <div className="nav-bar-item">Home</div>
                <div className="nav-bar-item">Services</div>
                <div className="nav-bar-item">About</div>
                <div className="nav-bar-item">Contact</div>
            </div>
        </header>
    );
};

export default Header;