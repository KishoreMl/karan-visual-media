import React, { useEffect, useRef } from 'react';
import DescriptionCard from '../DescriptionCard/DescriptionCard';
import DescriptiveContent from '../DescriptiveContent/DescriptiveContent';
import './Home.scss';

const Home = () => {
    const titleRef = useRef(null);
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (titleRef.current) {
                const rect = titleRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
        
                titleRef.current.style.setProperty('--mouse-x', `${x}px`);
                titleRef.current.style.setProperty('--mouse-y', `${y}px`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="content-container">
            {/* Header Section */}
            <div className="header-section">
                <h1 ref={titleRef} className="main-title">Creative Knacks</h1>
                <p>
                    We are creative agency, specialized in strategy, branding design, and development. <br></br>
                    Our work is always at the intersection of design and technology. 
                </p>
            </div>

            <div className="card-cover">
                <div className="central-card">
                    <div className="text-block">
                        <h3 className="card-heading">The search functionality is now fully implemented. Users can:</h3>
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

                    {/* File Changes Section */}
                    <div className="file-changes-section">
                        <div className="file-changes-header">
                            <span className="files-changed">3 files changed</span>
                            <div className="file-actions">
                                <button className="keep-button">Keep</button>
                                <button className="undo-button">Undo</button>
                                <button className="file-icon-button">📄</button>
                            </div>
                        </div>
                        
                        <div className="file-list">
                            <div className="file-item">
                                <span className="file-icon ts-icon">TS</span>
                                <span className="file-path">race-service.ts src/lib/data</span>
                            </div>
                            <div className="file-item">
                                <span className="file-icon ts-icon">TS</span>
                                <span className="file-path">+page.server.ts src/routes</span>
                                <span className="add-icon">+</span>
                            </div>
                            <div className="file-item">
                                <span className="file-icon svelte-icon">S</span>
                                <span className="file-path">+page.svelte src/routes</span>
                                <span className="add-icon">+</span>
                            </div>
                        </div>
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
            <DescriptiveContent />
        </div>
    );
};

export default Home;
