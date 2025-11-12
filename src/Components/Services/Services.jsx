import React, { useEffect, useRef, useState } from 'react';
import './Services.scss';

const Services = () => {
    const cardsRef = useRef([]);
    const [visibleCards, setVisibleCards] = useState([]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                const cardIndex = parseInt(entry.target.dataset.index);
                if (entry.isIntersecting) {
                    setVisibleCards(prev => {
                        if (!prev.includes(cardIndex)) {
                            return [...prev, cardIndex];
                        }
                        return prev;
                    });
                } else {
                    setVisibleCards(prev => prev.filter(index => index !== cardIndex));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentCards = cardsRef.current;

        currentCards.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            currentCards.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    const addToRefs = (el, index) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current[index] = el;
        }
    };
    const servicesData = [
        {
            id: 1,
            title: "Motion Graphics",
            description: "Create compelling motion graphics that bring your brand to life. From animated logos to dynamic explainer videos, we deliver stunning visual storytelling.",
            features: ["Animated Logos", "Explainer Videos", "Title Sequences", "Brand Animation"]
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
            title: "Branding & Design",
            description: "Comprehensive branding solutions that define your identity. From logo design to complete brand guidelines, we create memorable visual identities.",
            features: ["Logo Design", "Brand Identity", "Style Guides", "Marketing Collateral"]
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
            {/* Background Elements */}
            <div className="services-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            {/* Header Section */}
            <div className="services-header">
                <h1 className="services-title">Our Services</h1>
                <p className="services-subtitle">
                    Comprehensive visual media solutions tailored to elevate your brand
                </p>
            </div>

            {/* Horizontal Scroll Cards Container */}
            <div className="services-scroll-wrapper">
                <div className="services-horizontal-container">
                    {servicesData.map((service, index) => (
                        <div 
                            key={service.id}
                            ref={(el) => addToRefs(el, index)}
                            data-index={index}
                            className={`service-card ${visibleCards.includes(index) ? 'visible' : ''}`}
                            style={{ '--card-index': index }}
                        >
                            <div className="card-background-glow"></div>
                            
                            <div className="card-inner">
                                <h3 className="card-title">{service.title}</h3>
                                
                                <p className="card-description">{service.description}</p>
                                
                                <div className="card-features">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="feature-item">
                                            <span className="feature-bullet">•</span>
                                            <span className="feature-text">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="services-cta">
                <h2>Ready to bring your vision to life?</h2>
                <p className="cta-description">Let's create something extraordinary together</p>
                <button className="cta-primary-button">
                    <span>Get Started Today</span>
                    <span className="cta-button-icon">→</span>
                </button>
            </div>
        </div>
    );
};

export default Services;
