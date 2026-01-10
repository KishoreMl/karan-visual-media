import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import './WorkDetail.scss';

// Import NPS images
import npsImage1 from '../../assets/works/nps/nps (1).jpg';
import npsImage2 from '../../assets/works/nps/nps (2).jpg';
import npsImage3 from '../../assets/works/nps/nps (3).jpg';
import npsImage4 from '../../assets/works/nps/nps (4).jpg';
import npsImage5 from '../../assets/works/nps/nps (5).jpg';

//Import Art Board images
import artBoardImage1 from '../../assets/works/ad/Artboard 1-100.jpg';
import artBoardImage2 from '../../assets/works/ad/Artboard 2-100.jpg';
import artBoardImage3 from '../../assets/works/ad/Artboard 3-100.jpg';
import artBoardImage5 from '../../assets/works/ad/Artboard 5-100.jpg';
import artBoardImage6 from '../../assets/works/ad/Artboard 6-100.jpg';  
import artBoardImage7 from '../../assets/works/ad/Artboard 7-100.jpg';
import artBoardImage8 from '../../assets/works/ad/Artboard 8-100.jpg';

// Import Swadeshi videos
import swadeshiVideo1 from '../../assets/works/swadeshi/Swadeshi_Ai1.mp4';
import swadeshiVideo2 from '../../assets/works/swadeshi/Swadeshi_Ai2.mp4';
import swadeshiVideo3 from '../../assets/works/swadeshi/Swadeshi_Ai3.mp4';
import swadeshiImage from '../../assets/images/clients/swadeshi.jpg';

const WorkDetail = () => {
    const { workSlug } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const galleryRef = useRef(null);
    const videoRef = useRef(null);

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
            slug:'ad-photography',
            title: 'Ad Photography',
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
        },
        {
            id: 3,
            slug: 'swadeshi-glass-plywood',
            title: 'Swadeshi Glass & Plywood',
            category: 'BRAND DESIGN',
            year: '2025',
            description: 'Branding and design project for Swadeshi Glass & Plywood, featuring modern visual identity and brand guidelines.',
            fullDescription: `Swadeshi Glass & Plywood is a leading manufacturer that required a comprehensive brand refresh to align with their market positioning. Our team created a distinctive visual identity that captures their innovative spirit and commitment to quality.

The project involved detailed research into the target audience, market trends, and competitive landscape. We developed a comprehensive brand strategy that reflects Swadeshi's core values and unique positioning in the market.

Our deliverables included video content showcasing the brand identity, product presentations, and marketing materials. The cohesive design system ensures consistent brand presentation across all touchpoints.`,
            tags: ['Swadeshi Glass & Plywood', 'Branding', 'Video'],
            image: swadeshiImage,
            bgColor: '#1e40af',
            videoGallery: [
                swadeshiVideo1,
                swadeshiVideo2,
                swadeshiVideo3,
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
                    // Once animated, stop observing to prevent flickering
                    observer.unobserve(entry.target);
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
        // Pause video if playing
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = useCallback(() => {
        // Pause video if playing
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        const gallery = project.gallery || project.videoGallery || [];
        setCurrentImageIndex((prev) => 
            prev === 0 ? gallery.length - 1 : prev - 1
        );
    }, [project]);

    const goToNext = useCallback(() => {
        // Pause video if playing
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        const gallery = project.gallery || project.videoGallery || [];
        setCurrentImageIndex((prev) => 
            prev === gallery.length - 1 ? 0 : prev + 1
        );
    }, [project]);

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
    }, [lightboxOpen, goToNext, goToPrevious]);

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
                        {(project.gallery || project.videoGallery || []).map((item, index) => {
                            const isVideo = project.videoGallery && project.videoGallery.includes(item);
                            return (
                                <div 
                                    key={index} 
                                    className={`gallery-item animate-on-scroll gallery-item-${index + 1}`}
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="gallery-image-wrapper">
                                        {isVideo ? (
                                            <video 
                                                src={item} 
                                                className="gallery-video"
                                                muted
                                                loop
                                                playsInline
                                            />
                                        ) : (
                                            <img src={item} alt={`${project.title} - ${index + 1}`} />
                                        )}
                                        <div className="gallery-overlay">
                                            <span className="gallery-number">0{index + 1}</span>
                                            {isVideo && <span className="gallery-video-icon">▶</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                            {project.videoGallery ? (
                                <video 
                                    ref={videoRef}
                                    src={project.videoGallery[currentImageIndex]} 
                                    className="lightbox-video"
                                    controls
                                    autoPlay
                                    playsInline
                                />
                            ) : (
                                <img 
                                    src={project.gallery[currentImageIndex]} 
                                    alt={`${project.title} - ${currentImageIndex + 1}`}
                                />
                            )}
                            <div className="lightbox-counter">
                                {currentImageIndex + 1} / {(project.gallery || project.videoGallery || []).length}
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

