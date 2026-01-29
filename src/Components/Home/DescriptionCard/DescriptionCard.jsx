import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import devImg from '../../../assets/images/Dev.png';
import socialMediaImg from '../../../assets/images/Socialmedia.png';
import brandingImg from '../../../assets/images/Logo.png';
import motionGraphicsImg from '../../../assets/images/Animation.png';
import AnimatedHeading from '../../AnimatedHeading/AnimatedHeading';
import './DescriptionCard.scss';

gsap.registerPlugin(ScrollTrigger);

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

        const cards = cardsRef.current.filter(card => card !== null);
        if (cards.length === 0) return;

        // Check if large screen (4 cards layout)
        const isLargeScreen = window.innerWidth > 1024;

        if (isLargeScreen) {
            // Large screens: Sequential scroll-triggered animation
            // Cards appear 1→2→3→4, then disappear 4→3→2→1
            
            // Set initial state for all cards - completely hidden below
            gsap.set(cards, {
                opacity: 0,
                y: 100,
                scale: 0.85
            });

            // Create a timeline that animates cards sequentially based on scroll
            // Page stays pinned while cards pop up one by one, then exit in reverse
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top 40%', // Start when container is near center
                    end: '+=500%', // Total scroll distance for appear + hold + disappear
                    scrub: 0.8, // Smooth scrolling with slight lag
                    pin: true, // Pin the container while animating
                    pinSpacing: true, // Add spacing for the pinned duration
                    anticipatePin: 1,
                    // markers: true, // Uncomment for debugging
                }
            });

            // Calculate timing
            const cardDuration = 1; // Duration per card animation
            const pauseBetween = 0.3; // Pause between cards
            const holdDuration = 1; // Hold time when all cards are visible
            
            // PHASE 1: Cards APPEAR one by one (1→2→3→4)
            cards.forEach((card, index) => {
                const startPosition = index * (cardDuration + pauseBetween);
                
                tl.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: cardDuration,
                    ease: 'power2.out' // Pop effect
                }, startPosition);
            });

            // Calculate when all cards are visible
            const allVisibleTime = (cards.length - 1) * (cardDuration + pauseBetween) + cardDuration;
            
            // PHASE 2: Hold - all cards visible (brief pause)
            // Timeline naturally holds here
            
            // PHASE 3: Cards DISAPPEAR one by one in REVERSE order (4→3→2→1)
            const exitStartTime = allVisibleTime + holdDuration;
            
            // Reverse the cards array for exit animation
            const reversedCards = [...cards].reverse();
            
            reversedCards.forEach((card, index) => {
                const exitPosition = exitStartTime + (index * (cardDuration + pauseBetween));
                
                tl.to(card, {
                    opacity: 0,
                    y: -80, // Exit upward
                    scale: 0.9,
                    duration: cardDuration,
                    ease: 'power2.in' // Accelerate out
                }, exitPosition);
            });

        } else {
            // Small/medium screens: Individual card animations on scroll
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
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

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <>
        <div className='description-card-header'>
            <AnimatedHeading text="What we do" tag="h2" className="description-card-title" />
        </div>
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
    </>
    );
};

export default DescriptionCard;