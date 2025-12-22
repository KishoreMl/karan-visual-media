import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import './Works.scss';

// Import NPS image
import npsImage5 from '../../assets/images/Works/nps/nps (5).jpg';
import artBoardImage from '../../assets/images/Works/ad/Artboard 1-100.jpg';
const Works = () => {
    const [filter, setFilter] = useState('ALL');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const projects = [
        {
            id: 1,
            slug: 'nps-project',
            title: 'NPS Project',
            category: 'BRAND DESIGN',
            year: '2024',
            description: 'Comprehensive branding and design project for NPS, featuring modern visual identity and brand guidelines.',
            tags: ['NPS', 'Branding'],
            image: npsImage5,
            bgColor: '#1e40af'
        },
        {
            id:2,
            slug:'Art Board',
            title: 'Art Board',
            category: 'BRAND DESIGN',
            year: '2025',
            description: 'Art board with logo variations and high-quality mockups for their conference event.',
            tags: ['Art Board', 'Branding'],
            image: artBoardImage,
            bgColor: '#c4b5a0'
        }
    ];

    const handleProjectClick = (slug) => {
        navigate(`/works/${slug}`);
    };

    const categories = ['All', 'Branding & Design', 'Motion Graphics', '3D Animation', '3D Interior & Exterior Walkthrough Animation', 'Website Development'];

    const filteredProjects = filter === 'ALL' 
        ? projects 
        : projects.filter(project => project.category === filter);

    return (
        <div className="works-container">
            <div className="works-header">
                <AnimatedHeading text="Our Works" tag="h1" className="works-title centered" />
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons">
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

            {/* Projects Grid */}
            <div className="projects-grid">
                {filteredProjects.map((project) => (
                    <div 
                        key={project.id} 
                        className="project-card"
                        onClick={() => handleProjectClick(project.slug)}
                    >
                        <div className="project-image">
                            {project.image && (
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="project-background-img"
                                />
                            )}
                            <div className="project-overlay">
                                <span className="view-project">View Project →</span>
                            </div>
                        </div>
                        
                        <div className="project-content">
                            <div className="project-meta">
                                <span className="project-category">{project.category}</span>
                            </div>
                            
                            <h3 className="project-title">{project.title}</h3>
                            
                            <p className="project-description">{project.description}</p>
                            
                            <div className="project-tags">
                                {project.tags.map((tag, index) => (
                                    <span key={index} className="project-tag">
                                        {index === 0 ? '♥' : '👁'} {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Works;