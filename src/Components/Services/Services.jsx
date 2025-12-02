import React, { useEffect, useRef, useState } from 'react';
import './Services.scss';

const Services = () => {
    const sectionsRef = useRef([]);
    const [visibleSections, setVisibleSections] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '50px 0px -100px 0px'
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                const sectionIndex = parseInt(entry.target.dataset.index);
                
                if (entry.isIntersecting) {
                    // Add section with a slight delay for sequential effect
                    setTimeout(() => {
                        setVisibleSections(prev => {
                            if (!prev.includes(sectionIndex)) {
                                return [...prev, sectionIndex].sort((a, b) => a - b);
                            }
                            return prev;
                        });
                    }, 50);
                } else {
                    // Remove section when it goes out of view
                    setVisibleSections(prev => prev.filter(index => index !== sectionIndex));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentSections = sectionsRef.current;

        currentSections.forEach((section) => {
            if (section) observer.observe(section);
        });

        // Scroll progress tracking
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

    const servicesData = [

        {
            id: 1,
            title: "Branding & Design",
            description: "Comprehensive branding solutions that define your identity. From logo design to complete brand guidelines, we create memorable visual identities.",
            features: ["Logo Design", "Brand Identity", "Style Guides", "Marketing Collateral"]
        },
        {
            id: 2,
            title: "3D Animation",
            description: "Professional 3D animation services that transform concepts into photorealistic visual experiences. Perfect for product showcases and immersive storytelling.",
            features: ["Product Animation", "Character Animation", "3D Modeling", "Rendering"]
        },
        {
            id: 3,
            title: "Visual Effects",
            description: "Industry-leading VFX services that seamlessly blend reality with imagination. Enhance your footage with stunning visual effects and compositing.",
            features: ["Compositing", "CGI Integration", "Color Grading", "Post-Production VFX"]
        },
        {
            id: 4,
            title: "Motion Graphics",
            description: "Create compelling motion graphics that bring your brand to life. From animated logos to dynamic explainer videos, we deliver stunning visual storytelling.",
            features: ["Animated Logos", "Explainer Videos", "Title Sequences", "Brand Animation"]
        },
        {
            id: 5,
            title: "Social Media Handling",
            description: "Strategic social media management that grows your online presence. We create engaging content and manage your brand across all platforms.",
            features: ["Content Creation", "Community Management", "Strategy Planning", "Analytics & Reporting"]
        },
        {
            id: 6,
            title: "Digital Marketing",
            description: "Data-driven digital marketing campaigns that deliver measurable results. Reach your target audience and maximize your ROI.",
            features: ["SEO Optimization", "PPC Campaigns", "Email Marketing", "Content Strategy"]
        },
        {
            id: 7,
            title: "Website Development",
            description: "Modern, responsive websites that deliver exceptional user experiences. From design to deployment, we build digital solutions that perform.",
            features: ["Responsive Design", "Custom Development", "E-commerce Solutions", "CMS Integration"]
        },
        {
            id: 8,
            title: "3D Interior & Exterior Walkthrough Animation",
            description: "Photorealistic architectural visualizations that bring spaces to life. Perfect for real estate, architecture, and interior design projects.",
            features: ["3D Walkthroughs", "Architectural Visualization", "Interior Rendering", "Virtual Tours"]
        }
    ];

    return (
        <div className="services-page">
            {/* Scroll Progress Indicator */}
            <div className="scroll-progress-bar">
                <div className="progress-fill" style={{ width: `${scrollProgress}%` }}></div>
            </div>

            {/* Background Elements */}
            <div className="services-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            {/* Header Section */}
            <div className="services-header-section">
                <div className="services-header">
                    <h1 className="services-title">Our Services</h1>
                    <p className="services-subtitle">
                        Comprehensive visual media solutions tailored to elevate your brand
                    </p>
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
                                ref={(el) => addToRefs(el, gifIndex)}
                                data-index={gifIndex}
                                className={`scroll-section gif-section ${visibleSections.includes(gifIndex) ? 'visible' : ''}`}
                                style={{ 
                                    transitionDelay: visibleSections.includes(gifIndex) 
                                        ? `${visibleSections.indexOf(gifIndex) * 0.1}s` 
                                        : '0s' 
                                }}
                            >
                                <div className="section-content">
                                    <h2 className="section-title">{service.title}</h2>
                                    <div className="gif-container">
                                        <div className="gif-placeholder">
                                            <div className="gif-overlay">
                                                <span className="gif-icon">▶</span>
                                            </div>
                                            <div className="gif-shimmer"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div 
                                ref={(el) => addToRefs(el, contentIndex)}
                                data-index={contentIndex}
                                className={`scroll-section content-section ${visibleSections.includes(contentIndex) ? 'visible' : ''}`}
                                style={{ 
                                    transitionDelay: visibleSections.includes(contentIndex) 
                                        ? `${visibleSections.indexOf(contentIndex) * 0.1}s` 
                                        : '0s' 
                                }}
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
                                                        style={{ transitionDelay: `${0.35 + idx * 0.05}s` }}
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

            {/* Bottom CTA Section */}
            <div className="services-cta-section">
                <div className="services-cta">
                    <h2>Ready to bring your vision to life?</h2>
                    <p className="cta-description">Let's create something extraordinary together</p>
                    <button className="cta-primary-button">
                        <span>Get Started Today</span>
                        <span className="cta-button-icon">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Services;
