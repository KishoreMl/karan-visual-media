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
            // Each card appears one by one as you scroll
            
            // Set initial state for all cards - start from below with slight scale
            gsap.set(cards, {
                opacity: 0,
                y: 80,
                scale: 0.9
            });

            // Create a timeline that animates cards sequentially based on scroll
            // Page stays pinned while cards pop up one by one
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top center', // Start when container reaches center of viewport
                    end: '+=400vh', // Pin for 400vh of scroll (100vh per card)
                    scrub: true, // Directly tied to scroll - only animates when scrolling
                    pin: true, // Pin the container while animating
                    pinSpacing: true, // Add spacing for the pinned duration
                    anticipatePin: 1,
                    // markers: true, // Uncomment for debugging
                }
            });

            // Animate each card one by one - each card completes before the next starts
            cards.forEach((card, index) => {
                // Each card animation starts only after previous one is complete
                tl.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 2, // Each card takes a long scroll distance
                    ease: 'none' // Linear - directly maps to scroll position
                }, index === 0 ? 0 : '>'); // First card starts at 0, others start after previous ends
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