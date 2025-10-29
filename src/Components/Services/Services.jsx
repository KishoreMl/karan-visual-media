import React from 'react';
import './Services.scss';

const Services = () => {
    // Mock data for services
    const servicesData = [
        {
            id: 1,
            title: "Video Production",
            description: "Professional video production services from concept to final cut. We create engaging stories that captivate your audience.",
            icon: "🎬",
            features: ["4K Resolution", "Color Grading", "Motion Graphics", "Sound Design"],
            price: "Starting at $2,500",
            bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: 2,
            title: "Photography",
            description: "Stunning photography that captures the essence of your brand. From corporate events to product shoots.",
            icon: "📸",
            features: ["High-Res Images", "Photo Editing", "Studio Setup", "On-Location"],
            price: "Starting at $800",
            bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            id: 3,
            title: "Animation Services",
            description: "Bring your ideas to life with captivating 2D and 3D animations. Perfect for explainer videos and brand stories.",
            icon: "✨",
            features: ["2D Animation", "3D Modeling", "Character Design", "VFX"],
            price: "Starting at $3,200",
            bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        },
        {
            id: 4,
            title: "Content Strategy",
            description: "Data-driven content strategies that boost engagement and drive results. Let's tell your story effectively.",
            icon: "📊",
            features: ["SEO Optimization", "Content Planning", "Analytics", "Brand Voice"],
            price: "Starting at $1,500",
            bgGradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        },
        {
            id: 5,
            title: "Live Streaming",
            description: "Professional live streaming services for events, webinars, and broadcasts with multi-camera setups.",
            icon: "📡",
            features: ["HD Streaming", "Multi-Camera", "Real-time Editing", "Platform Integration"],
            price: "Starting at $1,800",
            bgGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
        },
        {
            id: 6,
            title: "Post Production",
            description: "Expert post-production services including editing, color correction, sound mixing, and visual effects.",
            icon: "🎨",
            features: ["Advanced Editing", "Color Correction", "Audio Mixing", "VFX Integration"],
            price: "Starting at $2,000",
            bgGradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
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

            {/* Stacked Cards Container - Notebook Style */}
            <div className="cards-stack-container">
                {servicesData.map((service, index) => (
                    <div 
                        key={service.id}
                        className="service-card-stack"
                        style={{ 
                            '--card-gradient': service.bgGradient, 
                            '--card-index': index,
                            '--total-cards': servicesData.length
                        }}
                    >
                        <div className="card-glow"></div>
                        <div className="card-content">
                            <div className="card-header">
                                <div className="card-icon">{service.icon}</div>
                                <div className="card-number">0{index + 1}</div>
                            </div>
                            
                            <h2 className="card-title">{service.title}</h2>
                            <p className="card-description">{service.description}</p>
                            
                            <div className="card-features">
                                {service.features.map((feature, idx) => (
                                    <span key={idx} className="feature-tag">
                                        <span className="feature-dot">•</span>
                                        {feature}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="card-footer">
                                <div className="card-price">
                                    <span className="price-label">Investment</span>
                                    <span className="price-value">{service.price}</span>
                                </div>
                                <button className="card-button">
                                    Learn More
                                    <span className="button-arrow">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA Section */}
            <div className="services-cta">
                <h3>Ready to bring your vision to life?</h3>
                <p className="cta-subtitle">Let's create something extraordinary together</p>
                <button className="cta-button">
                    Get Started Today
                    <span className="cta-arrow">→</span>
                </button>
            </div>
        </div>
    );
};

export default Services;
