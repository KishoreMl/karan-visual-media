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
    const sectionRef = useRef(null);      // Section wrapper (for small screens)
    const cardsContainerRef = useRef(null); // Cards container (for large/medium screens)

    const handleCardClick = () => {
        navigate('/services');
    };

    useEffect(() => {
        const section = sectionRef.current;
        const cardsContainer = cardsContainerRef.current;
        if (!section || !cardsContainer) return;

        const cards = cardsRef.current.filter(card => card !== null);
        if (cards.length === 0) return;

        const screenWidth = window.innerWidth;

        // Determine screen type
        const isLargeScreen = screenWidth > 1024;      // 4 cards in row
        const isMediumScreen = screenWidth > 768 && screenWidth <= 1024;  // 2x2 grid
        const isSmallScreen = screenWidth <= 768;     // Vertical stack

        if (isLargeScreen || isMediumScreen) {
            // Large & Medium screens: Original behavior - pin only the cards container
            // Cards appear 1→2→3→4, then disappear 4→3→2→1

            // Adjust scroll distance based on screen size
            const scrollDistance = isLargeScreen ? '+=500%' : '+=400%';

            // Set initial state for all cards - completely hidden below
            gsap.set(cards, {
                y: 500,
            });

            // Create a timeline that animates cards sequentially based on scroll
            // Pin only the cards container (original behavior)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardsContainer,
                    start: 'top 40%',
                    end: scrollDistance,
                    scrub: 0.8,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    // markers: true,
                }
            });

            // Calculate timing
            const cardDuration = 1;
            const pauseBetween = 0.3;
            const holdDuration = 1;

            // PHASE 1: Cards APPEAR one by one (1→2→3→4)
            cards.forEach((card, index) => {
                const startPosition = index * (cardDuration + pauseBetween);

                tl.to(card, {
                    y: 0,
                    duration: cardDuration,
                    ease: 'power2.out'
                }, startPosition);
            });

            // Calculate when all cards are visible
            const allVisibleTime = (cards.length - 1) * (cardDuration + pauseBetween) + cardDuration;

            // PHASE 3: Cards DISAPPEAR one by one in REVERSE order (4→3→2→1)
            const exitStartTime = allVisibleTime + holdDuration;
            const reversedCards = [...cards].reverse();

            reversedCards.forEach((card, index) => {
                const exitPosition = exitStartTime + (index * (cardDuration + pauseBetween));

                tl.to(card, {
                    y: -80,
                    duration: cardDuration,
                    ease: 'power2.in'
                }, exitPosition);
            });

        } else if (isSmallScreen) {
            // Small screens (mobile): No animation - cards are visible by default
            // Just ensure cards are visible
            gsap.set(cards, {
                opacity: 1,
                y: 0,
                scale: 1
            });
        }

        // Cleanup - kill all ScrollTriggers related to this component
        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === section ||
                    trigger.vars.trigger === cardsContainer ||
                    cards.includes(trigger.vars.trigger)) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <section className="description-card-section" ref={sectionRef}>
            <div className='description-card-header'>
                <AnimatedHeading text="What we do" tag="h2" className="description-card-title" />
            </div>
            <div className="glow-info-cards-container" ref={cardsContainerRef}>
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
        </section>
    );
};

export default DescriptionCard;