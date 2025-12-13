import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DescriptionCard from './DescriptionCard/DescriptionCard';
import DescriptiveContent from './DescriptiveContent/DescriptiveContent';
import darkLogo from '../../assets/images/dark_theme_logo.png';
import lightLogo from '../../assets/images/light_theme_logo.png';
import ScaleUpScreen from './ScaleUpScreen/ScaleUpScreen';
import './Home.scss';

// Import carousel logos
import client_logo_1 from "../../assets/images/logos/Nutrieros_1.png";
import client_logo_2 from "../../assets/images/logos/big_idea_dark.png";
import client_logo_3 from "../../assets/images/logos/eagle.png";
import client_logo_4 from "../../assets/images/logos/tamil_catering.png";

const Home = ({ isDarkMode }) => {
    const logo = isDarkMode ? darkLogo : lightLogo;
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const logoRef = useRef(null);
    const [logoProgress, setLogoProgress] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px'
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    // Logo progress bar animation - triggers when element is fully visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Element is fully visible, start animation from 0 to 100
                    let startTime = null;
                    const duration = 700; // 2 seconds animation

                    const animate = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        setLogoProgress(progress);
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    
                    requestAnimationFrame(animate);
                    observer.disconnect(); // Run animation only once
                }
            },
            {
                threshold: 1.0, // Trigger when 100% of element is visible
                rootMargin: '0px'
            }
        );

        if (logoRef.current) {
            observer.observe(logoRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div className="content-container">
            <div className="header-section">
                <img src={logo} alt="Creative Knacks" className="logo" />
                <p className="animated-text">
                    {" Where your ideas come to life.".split(' ').map((word, index) => (
                        <span key={index} className="word">
                            {word}{'   '}
                        </span>
                    ))}
                </p>
            </div>

            <div className="card-cover" ref={cardRef}>
                <div className="central-card">
                    <div className="text-block">
                        <h2 className={`card-heading ${isVisible ? 'typing-active' : ''}`}>The search functionality is now fully implemented. Users can:</h2>
                        <ol className="feature-list">
                            <li>Search for running races by name using the search box</li>
                            <li>See filtered results matching their search term</li>
                            <li>Navigate through paginated search results</li>
                            <li>The search term is preserved when navigating between pages</li>
                        </ol>
                        <p className="follow-up-question">
                            we craft powerful brand experiences that connect creativity with strategy. From 3D animations to digital marketing, we help businesses stand out in a crowded world with visuals that captivate and campaigns that convert.
                        </p>
                    </div>  
                </div>
            </div>

            {/* Carousel Section */}
            <div className="carousel-section">
                <div className="carousel-container">
                    <div className="carousel-track">
                        {(() => {
                            const logos = [
                                { src: client_logo_1, alt: 'Nutrieros' },
                                { src: client_logo_2, alt: 'Big Idea' },
                                { src: client_logo_3, alt: 'Eagle' },
                                { src: client_logo_4, alt: 'Tamil Catering' },
                            ];
                            // Duplicate twice for seamless infinite loop
                            const duplicated = [...logos, ...logos, ...logos];
                            
                            return duplicated.map((logo, index) => (
                                <div key={index} className="company-logo">
                                    <img src={logo.src} alt={logo.alt} className="logo-image" />
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            </div>
            <div className="autofix-container">
                <div className="text-content">
                    <h1 className="main-title">Design it right. Design it better.</h1>
                    <p className="main-description">
                        Spend less time fixing vulnerabilities and more time building features with Copilot Autofix.
                    </p>
                    <a href="/works" className="explore-link">Explore our works &gt;</a>
                </div>
                <div className="logo-content" ref={logoRef}>
                <div className="logo-icon">
                    <div className="logo-dot"></div>
                    <div className="logo-bar">
                        <div 
                            className="logo-bar-progress"
                            style={{ height: `${logoProgress * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            </div>

            <DescriptionCard />
            <DescriptiveContent />
            <ScaleUpScreen />

            <div className="shapes-container">
            </div>
            {/* Contact CTA Section */}
            <div className="contact-cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Have a Project in Mind?</h2>
                    <p className="cta-description">
                        Let's collaborate and bring your vision to life. Reach out to us for a free consultation and discover how we can help your brand stand out.
                    </p>
                    <Link to="/contact" className="cta-button">
                        <span>Contact Us</span>
                        <span className="button-arrow">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
