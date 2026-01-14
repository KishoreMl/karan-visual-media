import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import ContactSection from '../Home/CtaSection/CtaSection';
import './Works.scss';

// Import works cover images
import npsImage5 from '../../assets/works/nps/nps (5).jpg';
import artBoardImage from '../../assets/works/ad/Artboard 1-100.jpg';
import swadeshiImage from '../../assets/images/clients/swadeshi.jpg';

const Works = () => {
    const [filter, setFilter] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const works = [
        {
            id: 1,
            slug: 'nps-project',
            title: 'NPS Project',
            category: 'Branding & Design',
            year: '2024',
            description: 'Comprehensive branding and design project for NPS, featuring modern visual identity and brand guidelines.',
            tags: ['NPS', 'Branding'],
            image: npsImage5,
            bgColor: '#1e40af'
        },
        {
            id: 2,
            slug: 'ad-photography',
            title: 'Ad Photography',
            category: 'Branding & Design',
            year: '2025',
            description: 'Art board with logo variations and high-quality mockups for their conference event.',
            tags: ['Art Board', 'Branding'],
            image: artBoardImage,
            bgColor: '#c4b5a0'
        },
        {
            id:3,
            slug:'swadeshi-glass-plywood',
            title: 'Swadeshi Glass & Plywood',
            category: 'Social Media Management',
            year: '2025',
            description: 'Branding and design project for Swadeshi Glass & Plywood, featuring modern visual identity and brand guidelines.',
            tags: ['Swadeshi Glass & Plywood', 'Branding'],
            image: swadeshiImage,
            bgColor: '#1e40af'
        }
    ];

    const handleProjectClick = (slug) => {
        navigate(`/works/${slug}`);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFilterChange = (category) => {
        setFilter(category);
        setIsDropdownOpen(false);
    };

    const categories = ['All', 'Branding & Design', 'Motion Graphics', '3D Animation', '3D Interior & Exterior Walkthrough Animation', 'Social Media Management', 'Website Development'];

    const filteredWorks = filter === 'All' 
        ? works 
        : works.filter(work => work.category === filter);

    return (
        <div className="works-container">
            <div className="works-header">
                <AnimatedHeading text="Our Works" tag="h1" className="works-title centered" />
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons">
                {/* Desktop View - Horizontal Buttons */}
                <div className="filter-buttons-desktop">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Mobile View - Dropdown */}
                <div className="filter-buttons-mobile">
                    <button 
                        className="filter-dropdown-toggle"
                        onClick={toggleDropdown}
                    >
                        {filter}
                        <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
                    </button>
                    <div className={`filter-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-dropdown-item ${filter === cat ? 'active' : ''}`}
                                onClick={() => handleFilterChange(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            {filteredWorks.length > 0 ? (
                <div className="projects-grid">
                    {filteredWorks.map((work) => (
                        <div 
                            key={work.id} 
                            className="project-card"
                            onClick={() => handleProjectClick(work.slug)}
                        >
                            <div className="project-image">
                                {work.image && (
                                    <img 
                                        src={work.image} 
                                        alt={work.title}
                                        className="project-background-img"
                                    />
                                )}
                                <div className="project-overlay">
                                    <span className="view-project">View Project →</span>
                                </div>
                            </div>
                            
                            <div className="project-content">
                                <div className="project-meta">
                                    <span className="project-category">{work.category}</span>
                                </div>
                                
                                <h3 className="project-title">{work.title}</h3>
                                
                                <p className="project-description">{work.description}</p>
                                
                                <div className="project-tags">
                                    {work.tags.map((tag, index) => (
                                        <span key={index} className="project-tag">
                                            {index === 0 ? '♥' : '👁'} {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-projects-message">
                    <h3>Coming Soon</h3>
                    <p>We're working on exciting {filter} projects. Stay tuned for updates!</p>
                    <button className="filter-btn" onClick={() => setFilter('All')}>
                        View All Projects
                    </button>
                </div>
            )}

            <ContactSection />
        </div>
    );
};

export default Works;