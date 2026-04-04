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

        let split = null;

        // Create SplitText instance if available
        if (SplitText && SplitText.create) {
            try {
                split = SplitText.create(text, { type: "chars, words" });
            } catch (error) {
                console.warn('Failed to create SplitText instance:', error);
            }
        }

        let scrollTween = null;
        let timeoutId = null;
        let resizeHandler = null;

        // Function to initialize scroll animation
        const initializeAnimation = () => {
            // Kill existing scrollTween if it exists
            if (scrollTween && scrollTween.scrollTrigger) {
                scrollTween.scrollTrigger.kill();
            }

            // refreshPriority: -1 ensures this trigger refreshes AFTER the Poster's
            // pin spacer is set up, so GSAP calculates the correct start scroll position
            scrollTween = gsap.to(text, {
                xPercent: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    pin: true,
                    end: "+=5000px",
                    scrub: true,
                    refreshPriority: -1
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
                            scrub: 1,
                            refreshPriority: -1
                        }
                    });
                });
            }
        };

        // Longer delay ensures the Poster section's pin spacer is fully injected
        // into the DOM before we calculate HorizontalText's scroll start position
        timeoutId = setTimeout(() => {
            initializeAnimation();
            ScrollTrigger.refresh();
        }, 400);

        // Handle window resize
        resizeHandler = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', resizeHandler);

        // Cleanup function
        return () => {
            // Clear timeout if component unmounts before it executes
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (resizeHandler) {
                window.removeEventListener('resize', resizeHandler);
            }

            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            
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