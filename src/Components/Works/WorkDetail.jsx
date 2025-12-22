import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import './WorkDetail.scss';

// Import NPS images
import npsImage1 from '../../assets/images/Works/nps/nps (1).jpg';
import npsImage2 from '../../assets/images/Works/nps/nps (2).jpg';
import npsImage3 from '../../assets/images/Works/nps/nps (3).jpg';
import npsImage4 from '../../assets/images/Works/nps/nps (4).jpg';
import npsImage5 from '../../assets/images/Works/nps/nps (5).jpg';

//Import Art Board images
import artBoardImage1 from '../../assets/images/Works/ad/Artboard 1-100.jpg';
import artBoardImage2 from '../../assets/images/Works/ad/Artboard 2-100.jpg';
import artBoardImage3 from '../../assets/images/Works/ad/Artboard 3-100.jpg';
import artBoardImage5 from '../../assets/images/Works/ad/Artboard 5-100.jpg';
import artBoardImage6 from '../../assets/images/Works/ad/Artboard 6-100.jpg';  
import artBoardImage7 from '../../assets/images/Works/ad/Artboard 7-100.jpg';
import artBoardImage8 from '../../assets/images/Works/ad/Artboard 8-100.jpg';
    

const WorkDetail = () => {
    const { workSlug } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const galleryRef = useRef(null);

    const projects = [
       
        {
            id: 1,
            slug: 'nps-project',
            title: 'NPS Project',
            category: 'BRAND DESIGN',
            year: '2024',
            description: 'Comprehensive branding and design project for NPS, featuring modern visual identity and brand guidelines.',
            fullDescription: `NPS is a forward-thinking organization that required a complete brand refresh to align with their evolving vision and market positioning. Our team worked to create a distinctive visual identity that captures their innovative spirit.

The project involved detailed research into the target audience, market trends, and competitive landscape. We developed a comprehensive brand strategy that reflects NPS's core values and unique positioning in the market.

Our deliverables included logo design, brand guidelines, marketing collateral, and digital assets. The cohesive design system ensures consistent brand presentation across all touchpoints, from print materials to digital platforms.`,
            tags: ['NPS', 'Branding', 'Design'],
            image: npsImage5,
            bgColor: '#1e40af',
            gallery: [
                npsImage5,
                npsImage1,
                npsImage2,
                npsImage3,
                npsImage4,
               
            ]
        },
        {
            id:2,
            slug:'Art Board',
            title: 'Art Board',
            category: 'BRAND DESIGN',
            year: '2025',
            description: 'Art board with logo variations and high-quality mockups for their conference event.',
            fullDescription: `Art board with logo variations and high-quality mockups for their conference event.`,
            tags: ['Art Board', 'Branding'],
            image: artBoardImage1,
            bgColor: '#c4b5a0',
            gallery: [
                artBoardImage1,
                artBoardImage2,
                artBoardImage3,
                artBoardImage5,
                artBoardImage6,
                artBoardImage7,
                artBoardImage8,
            ]
        }
    ];

    const project = projects.find(p => p.slug === workSlug);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        setIsLoaded(true);
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    // Remove class when element leaves viewport so it can animate again
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.animate-on-scroll');
        animatableElements.forEach(el => observer.observe(el));

        return () => {
            animatableElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    // Lightbox functions
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? project.gallery.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => 
            prev === project.gallery.length - 1 ? 0 : prev + 1
        );
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen]);

    if (!project) {
        return (
            <div className="work-detail-not-found">
                <h1>Project Not Found</h1>
                <p>The project you're looking for doesn't exist.</p>
                <button onClick={() => navigate('/works')} className="back-button">
                    ← Back to Works
                </button>
            </div>
        );
    }

    return (
        <div className={`work-detail-container ${isLoaded ? 'loaded' : ''}`}>
            {/* Hero Section */}
            <section className="work-hero" ref={heroRef}>
                <div className="hero-image">
                    {project.image && (
                        <img 
                            src={project.image} 
                            alt={project.title}
                            className="hero-background-img"
                        />
                    )}
                    {/* Back to Works Button */}
                    <button 
                        className="back-to-works-hero"
                        onClick={() => navigate('/works')}
                    >
                        <span className="back-arrow">←</span>
                        <span className="back-text">Back to Works</span>
                    </button>
                    
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <span className="hero-category animate-on-scroll">{project.category}</span>
                            <h1 className="hero-title animate-on-scroll">{project.title}</h1>
                            <div className="hero-meta animate-on-scroll">
                                <div className="hero-tags">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="hero-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="work-content" ref={contentRef}>
                <div className="content-wrapper">
                    <div className="content-header animate-on-scroll">
                        <AnimatedHeading text="About the Project" tag="h2" className="section-title" />
                        <div className="title-accent"></div>
                    </div>
                    
                    <div className="content-body animate-on-scroll">
                        {project.fullDescription.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="content-paragraph">{paragraph}</p>
                        ))}
                    </div>

                    <div className="project-info-cards animate-on-scroll">
                        <div className="info-card">
                            <span className="info-label">Category</span>
                            <span className="info-value">{project.category}</span>
                        </div>
                        <div className="info-card">
                            <span className="info-label">Client</span>
                            <span className="info-value">{project.title.split(' ')[0]}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="work-gallery" ref={galleryRef}>
                <div className="gallery-wrapper">
                    <div className="gallery-header animate-on-scroll">
                        <AnimatedHeading text="Project Gallery" tag="h2" className="section-title centered" />
                        <div className="title-accent"></div>
                    </div>
                    
                    <div className="gallery-grid">
                        {project.gallery.map((img, index) => (
                            <div 
                                key={index} 
                                className={`gallery-item animate-on-scroll gallery-item-${index + 1}`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                                onClick={() => openLightbox(index)}
                            >
                                <div className="gallery-image-wrapper">
                                    <img src={img} alt={`${project.title} - Image ${index + 1}`} />
                                    <div className="gallery-overlay">
                                        <span className="gallery-number">0{index + 1}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Back Navigation */}
            <section className="work-navigation animate-on-scroll">
                <button onClick={() => navigate('/works')} className="back-to-works">
                    <span className="back-arrow">←</span>
                    <span className="back-text">Back to Works</span>
                </button>
            </section>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>
                            ✕
                        </button>
                        
                        <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>
                            ‹
                        </button>
                        
                        <div className="lightbox-image-container">
                            <img 
                                src={project.gallery[currentImageIndex]} 
                                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                            />
                            <div className="lightbox-counter">
                                {currentImageIndex + 1} / {project.gallery.length}
                            </div>
                        </div>
                        
                        <button className="lightbox-nav lightbox-next" onClick={goToNext}>
                            ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkDetail;

