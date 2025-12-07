import React, { useEffect, useRef, useState } from 'react';
import DescriptionCard from '../DescriptionCard/DescriptionCard';
import DescriptiveContent from '../DescriptiveContent/DescriptiveContent';
import darkLogo from '../../assets/images/dark_theme_logo.png';
import lightLogo from '../../assets/images/light_theme_logo.png';
import Door from '../door';
import './Home.scss';

const Home = ({ isDarkMode }) => {
    const logo = isDarkMode ? darkLogo : lightLogo;
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing after first trigger
                }
            },
            {
                threshold: 0.3, // Trigger when 30% of the element is visible
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
                        <h3 className={`card-heading ${isVisible ? 'typing-active' : ''}`}>The search functionality is now fully implemented. Users can:</h3>
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
                            const companies = [
                                'Ford', 'Infosys', 'mercado\nlibre', 'Mercedes-Benz', 
                                'Shopify', 'PayPal', 'Amazon', 'Google'
                            ];
                            // Duplicate twice for seamless infinite loop
                            const duplicated = [...companies, ...companies];
                            
                            return duplicated.map((company, index) => (
                                <div key={index} className="company-logo">
                                    <span className="logo-text">{company}</span>
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
                    <a href="https://github.com/features/security" className="explore-link">Explore our works &gt;</a>
                </div>
            </div>

            <DescriptionCard />
        
            {/* <div className="logo-content">
                <div className="logo-icon">
                    <div className="logo-dot"></div>
                    <div className="logo-bar"></div>
                </div>
            </div> */}
            <Door />
            <div class="progress"></div>
            
            <DescriptiveContent />
        </div>
    );
};

export default Home;
