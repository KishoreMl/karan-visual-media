import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import posterBackground from '../../../assets/images/Poster.png';
import './Poster.scss';

const Poster = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const backgroundRef = useRef(null);
    const yellowOverlayRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const text = textRef.current;
        const background = backgroundRef.current;
        const yellowOverlay = yellowOverlayRef.current;

        if (!section || !text || !background || !yellowOverlay) return;

        const backgroundImg = background.querySelector('img');
        
        // Set initial states
        gsap.set(background, { y: 0 });
        if (backgroundImg) {
            gsap.set(backgroundImg, { y: 0 });
        }
        gsap.set(text, { scale: 1, z: 0 });
        // Yellow overlay starts from top (hidden)
        gsap.set(yellowOverlay, { clipPath: 'inset(0% 0 100% 0)' });

        // Create a timeline for the yellow overlay animation with pinning
        const yellowOverlayTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=100vh', // Pin for 100vh of scroll
                scrub: 1,
                pin: true,
                pinSpacing: true
            }
        });

        // Yellow overlay animates from top to bottom - this is the main animation
        yellowOverlayTimeline.to(yellowOverlay, {
            clipPath: 'inset(0% 0 0% 0)',
            ease: 'none',
            duration: 1
        });

        // Parallax effect: background moves up (negative Y) when scrolling
        gsap.to(background, {
            y: '-20%',
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=100vh',
                scrub: 1
            }
        });

        // Text scales down and moves back in Z-axis when scrolling
        gsap.to(text, {
            scale: 0.8,
            z: -800,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=100vh',
                scrub: 1
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="poster-section" ref={sectionRef}>
            <div className="poster-background" ref={backgroundRef}>
                
            </div>
            <div className="yellow-overlay" ref={yellowOverlayRef}>
            <img 
                    src={posterBackground} 
                    alt="Poster background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </div>
            <h1 className="next-project-text" ref={textRef}>INNOVATION</h1>
        </div>
    );
};

export default Poster;