import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LogoSection.scss';

const LogoSection = () => {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const [logoProgress, setLogoProgress] = useState(0);

    // Logo Animation - based on scroll progress with pinning
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const containerElement = containerRef.current;
        const logoContentElement = logoRef.current;
        if (!containerElement || !logoContentElement) return;

        // Set initial progress
        setLogoProgress(0);

        // Function to determine scroll trigger start based on screen size
        const getScrollStart = () => {
            const isMediumOrSmall = window.innerWidth <= 768;
            // For medium/small screens, start only when logo is fully visible (bottom of element reaches bottom of viewport)
            // For larger screens, keep the original behavior (start 500px before element enters)
            return isMediumOrSmall ? 'bottom bottom' : 'top bottom-=500px';
        };

        let scrollTrigger = null;
        let currentBreakpoint = window.innerWidth <= 768;

        // Function to create or recreate scroll trigger
        const createScrollTrigger = () => {
            // Kill existing trigger if it exists
            if (scrollTrigger) {
                scrollTrigger.kill();
            }

            // Create scroll trigger for logo progress with pinning - pin the entire container
            scrollTrigger = ScrollTrigger.create({
                trigger: containerElement,
                start: getScrollStart(),
                end: '+=700vh', // Pin for 700vh of scroll to complete animation (slower)
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    // Calculate progress based on scroll position (0 to 1)
                    const progress = self.progress;
                    setLogoProgress(progress);
                }
            });
        };

        // Create initial scroll trigger
        createScrollTrigger();

        // Handle window resize to recreate scroll trigger when crossing breakpoint
        const handleResize = () => {
            const newBreakpoint = window.innerWidth <= 768;
            // Only recreate if breakpoint changed
            if (newBreakpoint !== currentBreakpoint) {
                currentBreakpoint = newBreakpoint;
                createScrollTrigger();
            } else {
                // Just refresh if breakpoint didn't change
                ScrollTrigger.refresh();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (scrollTrigger) {
                scrollTrigger.kill();
            }
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === containerElement) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <div className="logo-container" ref={containerRef}>
            <div className="text-content">
                <h1 className="main-title">
                    <span className="title-bold">DESIGN</span>{' '}
                    <span className="title-light">IT</span>{' '}
                    <span className="title-light">ONCE</span>{' '}
                    <br />
                    <span className="title-light">DESIGN</span>{' '}
                    <span className="title-light">IT</span>{' '}
                    <span className="title-bold">RIGHT</span>
                </h1>
                <p className="main-description">
                    Blending Design, Animation, and Technology to Elevate Brands.We Turn Brands into Visual Experiences.
                </p>
                <a href="/works" className="explore-link">EXPLORE OUR WORKS</a>
            </div>
            <div className="logo-content" ref={logoRef}>
                <div className="logo-icon">
                    <div className="logo-dot-wrapper">
                        <svg className="logo-dot-svg" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                                className="logo-dot-bg"
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="rgba(255, 165, 0, 0.2)"
                                strokeWidth="4"
                            />
                            {/* Progress circle - hides when complete */}
                            <circle
                                className="logo-dot-progress"
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="var(--primary-yellow, #FFA500)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={283}
                                strokeDashoffset={283 - (logoProgress * 283)}
                                transform="rotate(-90 50 50)"
                                style={{ 
                                    opacity: logoProgress >= 1 ? 0 : 1,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            {/* Filled circle (appears only after progress completes) */}
                            <circle
                                className="logo-dot-fill"
                                cx="50"
                                cy="50"
                                r="45"
                                fill={logoProgress >= 1 ? 'url(#logoGradient)' : 'transparent'}
                                style={{ 
                                    opacity: logoProgress >= 1 ? 1 : 0,
                                    transition: 'opacity 0.5s ease 0.2s'
                                }}
                            />
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFA500" />
                                    <stop offset="100%" stopColor="#FFB627" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="logo-bar">
                        <div 
                            className="logo-bar-progress"
                            style={{ height: `${logoProgress * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoSection;

