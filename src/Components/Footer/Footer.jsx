import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Top Section */}
                <div className="footer-top">
                    <div className="footer-left">
                        <h2 className="footer-tagline">Design it once. Design it right</h2>
                        <button className="footer-cta">
                            Lets Talk <span className="arrow">→</span>
                        </button>
                        <p className="footer-business">
                            New Business :<br />
                            hello@dzinr.in
                        </p>
                    </div>
                    
                    <div className="footer-right">
                        <div className="footer-nav">
                            <div className="nav-column">
                                <a href="#work">Work</a>
                                <a href="#about">About</a>
                                <a href="#services">Services</a>
                                <a href="#contact">Contact</a>
                            </div>
                            <div className="nav-column">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    Instagram <span className="arrow">↗</span>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    Linkedin <span className="arrow">↗</span>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    Twitter <span className="arrow">↗</span>
                                </a>
                                <a href="mailto:hello@dzinr.in">
                                    Email <span className="arrow">↗</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <div className="footer-meta">
                        <div className="footer-location">
                            <p>Mumbai</p>
                            <p>India, Asia</p>
                        </div>
                        <div className="footer-legal">
                            <a href="#terms">Terms & Conditions</a>
                            <a href="#privacy">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;