import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DescriptionCard from '../DescriptionCard/DescriptionCard';
import DescriptiveContent from '../DescriptiveContent/DescriptiveContent';
import darkLogo from '../../assets/images/dark_theme_logo.png';
import lightLogo from '../../assets/images/light_theme_logo.png';
// import Door from '../door';
import './Home.scss';

// Import carousel logos
import animationLogo from '../../assets/images/logos/Animation.png';
import brandingLogo from '../../assets/images/logos/Branding.png';
import devLogo from '../../assets/images/logos/Dev.png';
import mainLogo from '../../assets/images/logos/Logo.png';
import socialMediaLogo from '../../assets/images/logos/Social_media.png';
import vfxLogo from '../../assets/images/logos/VFX.png';

const Home = ({ isDarkMode }) => {
    const logo = isDarkMode ? darkLogo : lightLogo;
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

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

    return (
        <div className="content-container">
            <div className="header-section">
                <img src={logo} alt="Creative Knacks" className="logo" />
                <p> Where your ideas come to life.</p>
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
                                { src: animationLogo, alt: 'Animation' },
                                { src: brandingLogo, alt: 'Branding' },
                                { src: devLogo, alt: 'Development' },
                                { src: mainLogo, alt: 'Main Logo' },
                                { src: socialMediaLogo, alt: 'Social Media' },
                                { src: vfxLogo, alt: 'VFX' }
                            ];
                            // Duplicate twice for seamless infinite loop
                            const duplicated = [...logos, ...logos];
                            
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
                    <h1 className="main-title">Design it once. Design it right.</h1>
                    <p className="main-description">
                        Spend less time fixing vulnerabilities and more time building features with Copilot Autofix.
                    </p>
                    <a href="/works" className="explore-link">Explore our works &gt;</a>
                </div>
                <div className="logo-content">
                <div className="logo-icon">
                    <div className="logo-dot"></div>
                    <div className="logo-bar"></div>
                </div>
            </div>
            </div>

            <DescriptionCard />
            {/* <Door /> */}
            <DescriptiveContent />

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
