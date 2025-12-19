import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import './WorkDetail.scss';

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
            slug: 'kouchure-branding',
            title: 'Kouchure Branding',
            category: 'BRAND DESIGN',
            year: '2024',
            description: 'Complete branding suite including logo design, brand guidelines, and marketing materials for tech startup launch.',
            fullDescription: `Kouchure is a premium clothing brand that wanted to establish a strong visual identity in the competitive fashion market. Our team worked closely with the client to develop a comprehensive branding package that reflects their commitment to quality and style.

The project involved extensive research into the target audience, competitor analysis, and trend forecasting. We created a distinctive logo that embodies elegance and modernity, along with a complete brand guidelines document ensuring consistency across all touchpoints.

The deliverables included logo variations, color palette specifications, typography guidelines, business cards, letterheads, and social media templates. The result is a cohesive brand identity that positions Kouchure as a leader in contemporary fashion.`,
            tags: ['Clothing', 'Branding'],
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&h=1080&fit=crop',
            bgColor: '#1a1a1a',
            gallery: [
                'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop'
            ]
        },
        {
            id: 2,
            slug: 'global-edu-crew',
            title: 'Global Edu Crew',
            category: 'EVENT COLLATERAL',
            year: '2025',
            description: 'Event collateral with logo variations and high-quality mockups for their conference event.',
            fullDescription: `Global Edu Crew is an innovative ed-tech platform organizing international conferences that bring together educators, technologists, and thought leaders from around the world.

For their flagship annual conference, we designed a comprehensive suite of event materials that captured the spirit of innovation and global collaboration. The visual identity needed to appeal to a diverse, international audience while maintaining professionalism.

Our deliverables included event logos with multiple variations for different applications, conference badges, banners, presentation templates, digital assets for social media promotion, and printed materials. The cohesive design system helped establish Global Edu Crew as a premier educational conference brand.`,
            tags: ['Ed Tech Platform', 'Event'],
            image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&h=1080&fit=crop',
            bgColor: '#c4b5a0',
            gallery: [
                'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop'
            ]
        },
        {
            id: 3,
            slug: 'blue-door-logo',
            title: 'Blue Door Logo',
            category: 'BRAND DESIGN',
            year: '2023',
            description: 'Comprehensive logo branding project including logo design, brand identity development, and mockups for Blue Door.',
            fullDescription: `Blue Door is a hospitality brand that needed a fresh visual identity to reflect their commitment to welcoming experiences and exceptional service.

The logo concept draws inspiration from the iconic blue doors found in Mediterranean architecture, symbolizing warmth, trust, and the promise of discovery. The design balances tradition with modern aesthetics, creating a memorable mark that works across various applications.

We developed multiple logo variations including primary, secondary, and icon versions, along with comprehensive brand guidelines. The project also included mockups for signage, stationery, and digital applications, ensuring Blue Door has all the tools needed for consistent brand presentation.`,
            tags: ['Blue Door', 'Branding'],
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
            bgColor: '#2d3748',
            gallery: [
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
            ]
        },
        {
            id: 4,
            slug: 'webvigo-branding-logo',
            title: 'Webvigo Branding & Logo',
            category: 'BRAND DESIGN',
            year: '2024',
            description: 'Branding and logo design for Webvigo, a tech company. Delivered a modern visual identity and logo system tailored for the technology sector.',
            fullDescription: `Webvigo is a cutting-edge technology company specializing in web development and digital solutions. They approached us to create a brand identity that would position them as innovators in the competitive tech landscape.

The logo design incorporates dynamic elements that suggest connectivity, progress, and digital transformation. The vibrant color palette was chosen to convey energy and creativity while maintaining professionalism required in the B2B tech space.

Our comprehensive branding package included the primary logo, responsive logo variations for different screen sizes, icon system, typography guidelines, and a complete visual identity system. We also created templates for presentations, social media, and marketing materials.`,
            tags: ['Logo', 'Logo Design'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop',
            bgColor: '#2563eb',
            gallery: [
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
            ]
        },
        {
            id: 5,
            slug: 'haruka-social-media',
            title: 'Haruka Social Media',
            category: 'SOCIAL MEDIA',
            year: '2025',
            description: 'Social media branding and content creation for Haruka, a lifestyle brand. Developed a cohesive visual identity and engaging social media assets.',
            fullDescription: `Haruka is a lifestyle brand that embodies modern Japanese aesthetics with a focus on mindful living. They needed a social media presence that would resonate with their audience while staying true to their brand values.

We developed a comprehensive social media strategy and visual identity that blends minimalist design with engaging content formats. The aesthetic draws from traditional Japanese design principles - clean lines, thoughtful use of white space, and a muted yet sophisticated color palette.

The deliverables included social media templates for Instagram posts, stories, and reels, along with a content calendar framework and visual guidelines. We also created highlight cover designs and profile assets that work cohesively across all platforms.`,
            tags: ['Haruka', 'Social Media'],
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop',
            bgColor: '#e5e7eb',
            gallery: [
                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop'
            ]
        },
        {
            id: 6,
            slug: 'goldman-steakhouse-social-media',
            title: 'Goldman Steakhouse Social Media',
            category: 'SOCIAL MEDIA',
            year: '2025',
            description: 'Social media branding and content creation for Goldman Steakhouse, a premium restaurant. Developed a cohesive visual identity and engaging social media assets.',
            fullDescription: `Goldman Steakhouse is a premium dining establishment known for its exceptional cuts and sophisticated atmosphere. They needed a social media presence that would capture the essence of fine dining while driving engagement and reservations.

Our approach focused on showcasing the artistry of their culinary team through stunning food photography templates, behind-the-scenes content formats, and elegant promotional designs. The visual language emphasizes rich, warm tones that evoke the restaurant's intimate ambiance.

We created a complete social media toolkit including post templates, story designs, menu highlight formats, and promotional assets for special events. The cohesive design system helps Goldman Steakhouse maintain brand consistency while keeping their social presence fresh and appetizing.`,
            tags: ['GMS', 'Social Media'],
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop',
            bgColor: '#d4a574',
            gallery: [
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop'
            ]
        }
    ];

    const project = projects.find(p => p.slug === workSlug);

    useEffect(() => {
        // Scroll to top when component mounts
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
                <div 
                    className="hero-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                >
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

