import React, { useEffect, useRef, useState } from 'react';
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
    const sectionsRef = useRef([]);
    const [visibleSections, setVisibleSections] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '100px 0px 0px 0px'
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                const sectionIndex = parseInt(entry.target.dataset.index);
                
                if (entry.isIntersecting) {
                    setVisibleSections(prev => {
                        if (!prev.includes(sectionIndex)) {
                            return [...prev, sectionIndex].sort((a, b) => a - b);
                        }
                        return prev;
                    });
                    // Once visible, stop observing to prevent flickering
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentSections = sectionsRef.current;

        currentSections.forEach((section) => {
            if (section) observer.observe(section);
        });

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            currentSections.forEach((section) => {
                if (section) observer.unobserve(section);
            });
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const addToRefs = (el, index) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current[index] = el;
        }
    };

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
                    const gifIndex = index * 2;
                    const contentIndex = index * 2 + 1;
                    
                    return (
                        <React.Fragment key={service.id}>
                            {/* GIF/Image Section */}
                            <div 
                                id={`service-${service.id}`}
                                ref={(el) => addToRefs(el, gifIndex)}
                                data-index={gifIndex}
                                className={`scroll-section gif-section ${visibleSections.includes(gifIndex) ? 'visible' : ''}`}
                            >
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
                            <div 
                                ref={(el) => addToRefs(el, contentIndex)}
                                data-index={contentIndex}
                                className={`scroll-section content-section ${visibleSections.includes(contentIndex) ? 'visible' : ''}`}
                            >
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
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;
