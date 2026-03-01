import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalText.scss';

// Try to import SplitText, but handle if it's not available (premium plugin)
let SplitText = null;
try {
    // @ts-ignore
    const SplitTextModule = require('gsap/SplitText');
    SplitText = SplitTextModule.default || SplitTextModule.SplitText;
} catch (error) {
    // SplitText not available - component will work without character animations
    console.warn('SplitText plugin not available. Horizontal scroll will work without character animations.');
}

const HorizontalText = () => {
    const wrapperRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        // Register ScrollTrigger (always available)
        gsap.registerPlugin(ScrollTrigger);
        
        // Register SplitText if available
        if (SplitText) {
            try {
                gsap.registerPlugin(SplitText);
            } catch (error) {
                console.warn('Failed to register SplitText plugin');
            }
        }

        const wrapper = wrapperRef.current;
        const text = textRef.current;

        if (!wrapper || !text) return;

        // Find the ClientsReview section
        const clientsReviewSection = document.querySelector('.clients-review');
        
        let split = null;

        // Create SplitText instance if available
        if (SplitText && SplitText.create) {
            try {
                split = SplitText.create(text, { type: "chars, words" });
            } catch (error) {
                console.warn('Failed to create SplitText instance:', error);
            }
        }

        // Calculate start position: start later - when ClientsReview is mostly scrolled past
        const calculateStartPosition = () => {
            if (!clientsReviewSection) return "top top";
            
            const viewportHeight = window.innerHeight;
            const screenWidth = window.innerWidth;
            const clientsReviewRect = clientsReviewSection.getBoundingClientRect();
            const clientsReviewBottom = clientsReviewRect.bottom + window.pageYOffset;
            const wrapperRect = wrapper.getBoundingClientRect();
            const wrapperTop = wrapperRect.top + window.pageYOffset;
            
            // Determine screen size and adjust delay accordingly
            let extraOffset = 0;
            if (screenWidth <= 768) {
                // Small screens: add more delay (20% viewport)
                extraOffset = viewportHeight * 0.2;
            } else if (screenWidth <= 1024) {
                // Medium screens: add moderate delay (15% viewport)
                extraOffset = viewportHeight * 0.15;
            } else {
                // Large screens: use original delay (10% viewport)
                extraOffset = viewportHeight * 0.1;
            }
            
            // Start when ClientsReview's bottom is at 95% of viewport (only 5% visible)
            // Adding extra offset based on screen size to start later
            const targetScrollPos = clientsReviewBottom - (viewportHeight * 0.95) + extraOffset;
            
            // Calculate offset from wrapper's top
            const offset = targetScrollPos - wrapperTop;
            
            // Start when wrapper's top reaches the calculated position
            return offset > 0 ? `top+=${Math.round(offset)}px top` : `top top`;
        };

        let scrollTween = null;
        let timeoutId = null;
        let resizeHandler = null;

        // Function to initialize scroll animation
        const initializeAnimation = () => {
            const startPosition = calculateStartPosition();

            // Kill existing scrollTween if it exists
            if (scrollTween && scrollTween.scrollTrigger) {
                scrollTween.scrollTrigger.kill();
            }

            // Create horizontal scroll tween (works with or without SplitText)
            scrollTween = gsap.to(text, {
                xPercent: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    start: startPosition,
                    pin: true,
                    end: "+=5000px",
                    scrub: true
                }
            });

            // Animate each character only if SplitText is available
            if (split && split.chars && scrollTween) {
                split.chars.forEach((char) => {
                    gsap.from(char, {
                        yPercent: "random(-200, 200)",
                        rotation: "random(-20, 20)",
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: char,
                            containerAnimation: scrollTween,
                            start: "left 100%",
                            end: "left 30%",
                            scrub: 1
                        }
                    });
                });
            }
        };

        // Small delay to ensure accurate calculations
        timeoutId = setTimeout(() => {
            initializeAnimation();
        }, 100);

        // Handle window resize to recalculate start position
        resizeHandler = () => {
            if (scrollTween && scrollTween.scrollTrigger) {
                const newStartPosition = calculateStartPosition();
                scrollTween.scrollTrigger.vars.start = newStartPosition;
                ScrollTrigger.refresh();
            }
        };
        window.addEventListener('resize', resizeHandler);

        // Cleanup function
        return () => {
            // Clear timeout if component unmounts before it executes
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            
            // Remove resize listener
            if (resizeHandler) {
                window.removeEventListener('resize', resizeHandler);
            }
            
            // Kill all ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            
            // Revert SplitText if it was created
            if (split && split.revert) {
                try {
                    split.revert();
                } catch (error) {
                    console.warn('Error reverting SplitText:', error);
                }
            }
        };
    }, []);

    return (
        <div className="horizontal-text Horizontal" ref={wrapperRef}>
            <div className="container">
                <h3 className="Horizontal__text heading-xl" ref={textRef}>
                    Get Ready To Create Something Exraordinary With Us!
                </h3>
            </div>
        </div>
    );
};

export default HorizontalText;