import React, { useEffect, useRef, useState } from 'react';
import './ScaleUpScreen.scss';

const ScaleUpScreen = () => {
    const containerRef = useRef(null);
    const doorRef = useRef(null);
    const [scaleProgress, setScaleProgress] = useState(0);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrolled = window.pageYOffset;
            
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const elementBottom = elementTop + elementHeight;
            let progress = 0;
            
            if (elementTop < windowHeight && elementBottom > 0) {
                const visibleHeight = Math.min(windowHeight - elementTop, elementHeight);
                const visibilityRatio = visibleHeight / elementHeight;
                
                // Start animation when 70% is visible
                if (visibilityRatio >= 0.7) {
                    // After 90% is visible, we need more scroll to complete the animation
                    // Track how far past the trigger point we've scrolled
                    const elementTopWhenTriggered = windowHeight - (elementHeight * 0.7);
                    const scrollBeyondTrigger = elementTopWhenTriggered - elementTop;
                    
                    // Spread animation over a distance equal to the window height
                    // This makes it scale slowly as user continues scrolling
                    progress = Math.max(0, Math.min(1, scrollBeyondTrigger / (windowHeight * 0.3)));
                }
            }
            setScaleProgress(progress);
            
            // Calculate rotation based on scroll position
            // Rotates 360 degrees for every 1000px scrolled
            const rotationAngle = (scrolled * 0.36) % 360;
            setRotation(rotationAngle);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const doorWidth = doorRef.current?.offsetWidth || 128; // fallback to 8rem = 128px
    const doorHeight = doorRef.current?.offsetHeight || 320; // fallback to 20rem = 320px
    
    const scaleX = doorWidth > 0 ? (viewportWidth / doorWidth) * 1.01 : 1;
    const scaleY = doorHeight > 0 ? (viewportHeight / doorHeight) * 1.01 : 1;
    
    const currentScaleX = 1 + (scaleX - 1) * scaleProgress;
    const currentScaleY = 1 + (scaleY - 1) * scaleProgress;

    return (
        <div className="space-container" ref={containerRef}>
            <div 
                className="scale-screen" 
                ref={doorRef}
                style={{
                    transform: `translate(-50%, -50%) scale(${currentScaleX}, ${currentScaleY})`,
                    borderRadius: `${8 * (1 - scaleProgress)}px`,
                }}
            >
            </div>

            <div 
                className="plus-symbol"
                style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="mi-outline mi-add" viewBox="0 0 24 24">
                    <path d="M19 11h-6V5c0-.55-.45-1-1-1s-1 .45-1 1v6H5c-.55 0-1 .45-1 1s.45 1 1 1h6v6c0 .55.45 1 1 1s1-.45 1-1v-6h6c.55 0 1-.45 1-1s-.45-1-1-1"/>
                </svg>
            </div>

            <div 
                className="frame frame-top-left"
                style={{ opacity: scaleProgress }}
            ></div>
            <div 
                className="frame frame-top-right"
                style={{ opacity: scaleProgress }}
            ></div>
            <div 
                className="frame frame-bottom-left"
                style={{ opacity: scaleProgress }}
            ></div>
            <div 
                className="frame frame-bottom-right"
                style={{ opacity: scaleProgress }}
            ></div>

            <div 
                className="screen-text screen-header"
                style={{ opacity: scaleProgress }}
            >
                CREATIVE
            </div>
            <div 
                className="screen-text screen-footer"
                style={{ opacity: scaleProgress }}
            >
                SOLUTIONS
            </div>
        </div>
    );
};

export default ScaleUpScreen;
