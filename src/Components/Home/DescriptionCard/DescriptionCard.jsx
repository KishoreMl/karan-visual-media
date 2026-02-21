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

        // Animation only on large screens; no animation on tablet/mobile to avoid overlap
        const isLargeScreen = screenWidth > 1024;

        if (isLargeScreen) {
            // Large screens only: Scroll animation
            // Cards appear 1→2→3→4, then disappear 4→3→2→1

            // Adjust scroll distance - longer to allow one card per scroll action
            // 4 cards appear + hold + 4 cards disappear = ~10 scroll segments
            const scrollDistance = '+=1000%';

            // Set initial state for all cards - completely hidden below
            gsap.set(cards, {
                y: 500,
            });

            // Create a timeline that animates cards sequentially based on scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardsContainer,
                    start: 'top 40%',
                    end: scrollDistance,
                    scrub: 1,  // Smoother scrub for distinct card movements
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    // markers: true,
                }
            });

            // Calculate timing - each card gets its own dedicated scroll segment
            const cardDuration = 1;      // Duration for each card animation
            const gapBetween = 0.2;      // Small gap between cards (no overlap)
            const holdDuration = 1;      // Hold time when all cards are visible

            // PHASE 1: Cards APPEAR one by one (1→2→3→4) from below
            // Each card animates completely before the next one starts
            cards.forEach((card, index) => {
                const startPosition = index * (cardDuration + gapBetween);

                tl.to(card, {
                    y: 0,
                    duration: cardDuration,
                    ease: 'power2.out'
                }, startPosition);
            });

            // Calculate when all cards are visible
            const allVisibleTime = (cards.length - 1) * (cardDuration + gapBetween) + cardDuration;

            // PHASE 2: Cards DISAPPEAR one by one in REVERSE order (4→3→2→1) moving upward
            // Each card exits completely before the next one starts
            const exitStartTime = allVisibleTime + holdDuration;
            const reversedCards = [...cards].reverse();

            reversedCards.forEach((card, index) => {
                const exitPosition = exitStartTime + (index * (cardDuration + gapBetween));

                tl.to(card, {
                    y: -800,  // Move upward to fully disappear
                    duration: cardDuration,
                    ease: 'power2.in'
                }, exitPosition);
            });

        } else {
            // Small & medium screens: No animation – reset all transforms so cards stack normally (no overlap)
            gsap.set(cards, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                clearProps: 'transform,opacity'
            });
        }

        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                const cardsEls = cardsRef.current.filter(card => card !== null);
                gsap.set(cardsEls, { clearProps: 'all' });
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === section ||
                    trigger.vars.trigger === cardsContainer ||
                    (trigger.vars.trigger && cards.includes(trigger.vars.trigger))) {
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