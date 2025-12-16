import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import './Works.scss';

const Works = () => {
    const [filter, setFilter] = useState('ALL');
    const navigate = useNavigate();

    const projects = [
        {
            id: 1,
            slug: 'kouchure-branding',
            title: 'Kouchure Branding',
            category: 'BRAND DESIGN',
            year: '2024',
            description: 'Complete branding suite including logo design, brand guidelines, and marketing materials for tech startup launch.',
            tags: ['Clothing', 'Branding'],
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=400&fit=crop',
            bgColor: '#1a1a1a'
        },
        {
            id: 2,
            slug: 'global-edu-crew',
            title: 'Global Edu Crew',
            category: 'EVENT COLLATERAL',
            year: '2025',
            description: 'Event collateral with logo variations and high-quality mockups for their conference event.',
            tags: ['Ed Tech Platform', 'Event'],
            image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&h=400&fit=crop',
            bgColor: '#c4b5a0'
        },
        {
            id: 3,
            slug: 'blue-door-logo',
            title: 'Blue Door Logo',
            category: 'BRAND DESIGN',
            year: '2023',
            description: 'Comprehensive logo branding project including logo design, brand identity development, and mockups for Blue Door.',
            tags: ['Blue Door', 'Branding'],
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop',
            bgColor: '#2d3748'
        },
        {
            id: 4,
            slug: 'webvigo-branding-logo',
            title: 'Webvigo Branding & Logo',
            category: 'BRAND DESIGN',
            year: '2024',
            description: 'Branding and logo design for Webvigo, a tech company. Delivered a modern visual identity and logo system tailored for the technology sector.',
            tags: ['Logo', 'Logo Design'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop',
            bgColor: '#2563eb'
        },
        {
            id: 5,
            slug: 'haruka-social-media',
            title: 'Haruka Social Media',
            category: 'SOCIAL MEDIA',
            year: '2025',
            description: 'Social media branding and content creation for Haruka, a lifestyle brand. Developed a cohesive visual identity and engaging social media assets.',
            tags: ['Haruka', 'Social Media'],
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=400&fit=crop',
            bgColor: '#e5e7eb'
        },
        {
            id: 6,
            slug: 'goldman-steakhouse-social-media',
            title: 'Goldman Steakhouse Social Media',
            category: 'SOCIAL MEDIA',
            year: '2025',
            description: 'Social media branding and content creation for Goldman Steakhouse, a premium restaurant. Developed a cohesive visual identity and engaging social media assets.',
            tags: ['GMS', 'Social Media'],
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=400&fit=crop',
            bgColor: '#d4a574'
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
                        <div 
                            className="project-image"
                            style={{ 
                                backgroundImage: `url(${project.image})`,
                                backgroundColor: project.bgColor 
                            }}
                        >
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