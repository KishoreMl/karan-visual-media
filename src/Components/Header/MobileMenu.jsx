import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = (props) => {
    return (
        <div className={`mobile-menu-overlay ${props.isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <h2 className="mobile-brand">CREATIVE KNACKS</h2>
                    <button className="close-button" onClick={props.closeMobileMenu}>
                        ✕
                    </button>
                </div>
                
                <nav className="mobile-nav">
                    <Link 
                        to="/" 
                        className={`mobile-nav-item ${props.isActive('/') ? 'active' : ''}`}
                        onClick={props.closeMobileMenu}
                    >
                        HOME
                    </Link>
                    <Link 
                        to="/about" 
                        className={`mobile-nav-item ${props.isActive('/about') ? 'active' : ''}`}
                        onClick={props.closeMobileMenu}
                    >
                        ABOUT
                    </Link>
                    <Link 
                        to="/services" 
                        className={`mobile-nav-item ${props.isActive('/services') ? 'active' : ''}`}
                        onClick={props.closeMobileMenu}
                    >
                        SERVICES
                    </Link>
                    <Link 
                        to="/works" 
                        className={`mobile-nav-item ${props.isActive('/works') ? 'active' : ''}`}
                        onClick={props.closeMobileMenu}
                    >
                        WORKS
                    </Link>
                    <Link 
                        to="/contact" 
                        className={`mobile-nav-item ${props.isActive('/contact') ? 'active' : ''}`}
                        onClick={props.closeMobileMenu}
                    >
                        CONTACT
                    </Link>
                </nav>
            </div>
    );

};

export default MobileMenu;