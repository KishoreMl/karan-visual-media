import React, { useEffect, useState } from 'react';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import './Services.scss';

// Import service GIFs
import brandingGif from '../../assets/images/Services/brand.gif';
import socialMediaGif from '../../assets/images/Services/social media.gif';
import motionGraphicsGif from '../../assets/images/Services/gif-of-motion-graphics.gif';
import digitalMarketingGif from '../../assets/images/Services/digital marketing.gif';
import visualEffectsGif from '../../assets/images/Services/visual effects.gif';
import animation3dGif from '../../assets/images/Services/3d_animation.gif';
import interiorExteriorGif from '../../assets/images/Services/3d interior and exterior.gif';
import webDevGif from '../../assets/images/Services/web_design.gif';

const Services = () => {
    const [visibleSections, setVisibleSections] = useState({});
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Longer delay to ensure page has scrolled to top and elements are ready
        const timer = setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const index = parseInt(entry.target.dataset.index);
                        if (entry.isIntersecting) {
                            setVisibleSections(prev => ({ ...prev, [index]: true }));
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.2,
                    rootMargin: '0px 0px -150px 0px'
                }
            );

            // Find all service rows and observe them
            const rows = document.querySelectorAll('.service-row');
            rows.forEach(row => observer.observe(row));

            // Store observer for cleanup
            window._serviceObserver = observer;
        }, 300);

        return () => {
            clearTimeout(timer);
            if (window._serviceObserver) {
                window._serviceObserver.disconnect();
            }
        };
    }, []);

    const isVisible = (index) => visibleSections[index] === true;

    const scrollToService = (serviceId) => {
        const element = document.getElementById(`service-${serviceId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsDropdownOpen(false);
        setSelectedService(serviceId);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const servicesData = [
        {
            id: 1,
            title: "Branding & Design",
            description: "Comprehensive branding solutions that define your identity. From logo design to complete brand guidelines, we create memorable visual identities.",
            features: ["Logo Design", "Brand Identity", "Style Guides", "Marketing Collateral"],
            gif: brandingGif
        },
        {
            id: 2,
            title: "Social Media Handling",
            description: "Strategic social media management that grows your online presence. We create engaging content and manage your brand across all platforms.",
            features: ["Content Creation", "Community Management", "Reels Editing", "Analytics & Reporting"],
            gif: socialMediaGif
        },
        {
            id: 3,
            title: "Motion Graphics",
            description: "Create compelling motion graphics that bring your brand to life. From animated logos to dynamic explainer videos, we deliver stunning visual storytelling.",
            features: ["Animated Logos", "Explainer Videos", "Title Sequences", "Brand Animation"],
            gif: motionGraphicsGif
        },
        {
            id: 4,
            title: "Digital Marketing",
            description: "Data-driven digital marketing campaigns that deliver measurable results. Reach your target audience and maximize your ROI.",
            features: ["SEO Optimization", "PPC Campaigns", "Email Marketing", "Content Strategy"],
            gif: digitalMarketingGif
        },
        {
            id: 5,
            title: "Visual Effects",
            description: "Industry-leading VFX services that seamlessly blend reality with imagination. Enhance your footage with stunning visual effects and compositing.",
            features: ["Compositing", "CGI Integration", "Color Grading", "Post-Production VFX"],
            gif: visualEffectsGif
        },
        {
            id: 6,
            title: "3D Animation",
            description: "Professional 3D animation services that transform concepts into photorealistic visual experiences. Perfect for product showcases and immersive storytelling.",
            features: ["Product Animation", "Character Animation", "3D Modeling", "Rendering"],
            gif: animation3dGif
        },
        {
            id: 7,
            title: "3D Interior & Exterior Walkthrough Animation",
            description: "Photorealistic architectural visualizations that bring spaces to life. Perfect for real estate, architecture, and interior design projects.",
            features: ["3D Walkthroughs", "Architectural Visualization", "Interior Rendering", "Virtual Tours"],
            gif: interiorExteriorGif
        },
        {
            id: 8,
            title: "Website Development",
            description: "Professional website development services that create engaging and functional online experiences. From simple landing pages to complex web applications, we build websites that perform and convert.",
            features: ["Website Design", "Website Development", "Website Maintenance", "Website Hosting"],
            gif: webDevGif
        }
    ];

    return (
        <div className="services-page">
            {/* Scroll Progress Indicator */}
            <div className="scroll-progress-bar">
                <div className="progress-fill" style={{ width: `${scrollProgress}%` }}></div>
            </div>

            {/* Header Section */}
            <div className="services-header-section">
                <div className="services-header">
                    <AnimatedHeading text="Our Services" tag="h1" className="services-title centered" />
                    
                    {/* Services Navigation Menu */}
                    <div className="services-nav-menu">
                        {/* Desktop View - Horizontal Menu */}
                        <div className="services-nav-desktop">
                            {servicesData.map((service) => (
                                <button
                                    key={service.id}
                                    className="service-nav-item"
                                    onClick={() => scrollToService(service.id)}
                                >
                                    {service.title}
                                </button>
                            ))}
                        </div>

                        {/* Mobile View - Dropdown Menu */}
                        <div className="services-nav-mobile">
                            <button 
                                className="services-dropdown-toggle"
                                onClick={toggleDropdown}
                            >
                                {selectedService 
                                    ? servicesData.find(s => s.id === selectedService)?.title 
                                    : 'Select a Service'}
                                <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
                            </button>
                            <div className={`services-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                                {servicesData.map((service) => (
                                    <button
                                        key={service.id}
                                        className={`service-dropdown-item ${selectedService === service.id ? 'active' : ''}`}
                                        onClick={() => scrollToService(service.id)}
                                    >
                                        {service.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="scroll-indicator">
                        <span className="scroll-text">Scroll to explore</span>
                        <div className="scroll-arrow">↓</div>
                    </div>
                </div>
            </div>

            {/* Services Scroll Container */}
            <div className="services-scroll-container">
                {servicesData.map((service, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div 
                            key={service.id}
                            id={`service-${service.id}`}
                            data-index={index}
                            className={`service-row ${isEven ? 'gif-left' : 'gif-right'} ${isVisible(index) ? 'visible' : ''}`}
                        >
                            {/* GIF/Image Section */}
                            <div className="gif-section">
                                <div className="section-content">
                                    <h2 className="section-title">{service.title}</h2>
                                    <div className="gif-container">
                                        <div className="gif-wrapper">
                                            <img 
                                                src={service.gif} 
                                                alt={`${service.title} preview`}
                                                className="service-gif"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="content-section">
                                <div className="section-content">
                                    <div className="content-wrapper">
                                        <h3 className="content-heading">{service.title}</h3>
                                        <p className="content-description">{service.description}</p>
                                        
                                        <div className="content-features">
                                            <h4 className="features-title">Key Features</h4>
                                            <div className="features-grid">
                                                {service.features.map((feature, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        className="feature-card"
                                                    >
                                                        <span className="feature-icon">✓</span>
                                                        <span className="feature-text">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;
