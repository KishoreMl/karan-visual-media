import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import devImg from '../../../assets/images/Dev.png';
import socialMediaImg from '../../../assets/images/Socialmedia.png';
import brandingImg from '../../../assets/images/Logo.png';
import motionGraphicsImg from '../../../assets/images/Animation.png';
import './DescriptionCard.scss';

const DescriptionCard = () => {
    const navigate = useNavigate();
    const cardsRef = useRef([]);
    const containerRef = useRef(null);

    const handleCardClick = () => {
        navigate('/services');
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Check if container displays 4 cards in full width (large screens)
        const checkIfFourCardsLayout = () => {
            const screenWidth = window.innerWidth;
            const computedStyle = window.getComputedStyle(container);
            const gridColumns = computedStyle.gridTemplateColumns;
            
            // Check if screen width is > 1024px (matches SCSS media query)
            // and verify grid has 4 columns
            if (screenWidth > 1024) {
                // Count the number of columns in grid-template-columns
                const columns = gridColumns.split(' ').filter(col => col.trim() !== '').length;
                return columns === 4;
            }
            return false;
        };

        const cards = cardsRef.current;
        
        // Only apply scroll animations if 4 cards are displayed
        if (!checkIfFourCardsLayout()) {
            // On smaller screens (1 or 2 cards), use simple visibility animation
            const observerOptions = {
                threshold: 0.05,
                rootMargin: '50px 0px 0px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('card-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            cards.forEach(card => {
                if (card) observer.observe(card);
            });

            return () => {
                cards.forEach(card => {
                    if (card) observer.unobserve(card);
                });
            };
        }

        // Large screen scroll-triggered animations - animate only once on enter
        // Only runs when 4 cards are displayed in full width
        const animatedCards = new Set(); // Track which cards have been animated
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                const cardIndex = Array.from(cards).indexOf(card);
                
                // Only animate if card hasn't been animated yet and is entering viewport
                if (entry.isIntersecting && !animatedCards.has(cardIndex)) {
                    // Add enter class to trigger animation
                    card.classList.add('card-enter');
                    // Mark as animated so it won't animate again
                    animatedCards.add(cardIndex);
                    // Stop observing this card
                    observer.unobserve(card);
                }
            });
        }, observerOptions);

        // Observe all cards
        cards.forEach(card => {
            if (card) observer.observe(card);
        });

        // Handle window resize - recheck layout
        const handleResize = () => {
            if (!checkIfFourCardsLayout()) {
                // Reset animations if layout changes
                cards.forEach(card => {
                    if (card) {
                        card.classList.remove('card-enter');
                        observer.unobserve(card);
                    }
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cards.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    return (
        <div className="glow-info-cards-container" ref={containerRef}>
            <div 
                className='card-cover card-animate card-1' 
                onClick={handleCardClick}
                ref={el => cardsRef.current[0] = el}
            >
                    <div className="card-img-container">
                        <img src={brandingImg} alt="branding" />
                    </div>
                    <div className="card-header">
                        <h2>Branding</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            Comprehensive branding solutions that define your identity. From logo design to complete brand guidelines, we create memorable visual identities.
                        </p>
                    </div>
            </div>  
            <div 
                className='card-cover card-animate card-2' 
                onClick={handleCardClick}
                ref={el => cardsRef.current[1] = el}
            >
                    <div className="card-img-container">
                        <img src={socialMediaImg} alt="social media" />
                    </div>
                    <div className="card-header">
                        <h2>Social Media Handling</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            Strategic social media management that grows your online presence. We create engaging content and manage your brand across all platforms.
                        </p>
                </div>
            </div>
            <div 
                className='card-cover card-animate card-3' 
                onClick={handleCardClick}
                ref={el => cardsRef.current[2] = el}
            >
                    <div className="card-img-container">
                        <img src={devImg} alt="dev" />
                    </div>
                    <div className="card-header">
                        <h2>Website Development</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            Professional website development services that create engaging and functional online experiences. 
                        </p>
                    </div>
            </div>

            <div 
                className='card-cover card-animate card-4' 
                onClick={handleCardClick}
                ref={el => cardsRef.current[3] = el}
            >
                    <div className="card-img-container">
                        <img src={motionGraphicsImg} alt="motion graphics" />
                    </div>
                    <div className="card-header">
                        <h2>Motion Graphics</h2>    
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            Create compelling motion graphics that bring your brand to life. From animated logos to dynamic explainer videos, we deliver stunning visual storytelling.
                        </p>
                    </div>
            </div>
        </div>
    );
};

export default DescriptionCard;