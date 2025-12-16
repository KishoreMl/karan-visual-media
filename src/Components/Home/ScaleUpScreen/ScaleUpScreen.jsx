import React, { useEffect, useRef, useState } from 'react';
import './ScaleUpScreen.scss';

const ScaleUpScreen = () => {
    const containerRef = useRef(null);
    const doorRef = useRef(null);
    const [scaleProgress, setScaleProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
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
                className="door-container" 
                ref={doorRef}
                style={{
                    transform: `translate(-50%, -50%) scale(${currentScaleX}, ${currentScaleY})`,
                    borderRadius: `${8 * (1 - scaleProgress)}px`,
                }}
            >
            </div>
            <div className="door-header">CREATIVE</div>
            <div className="door-footer">SOLUTIONS</div>
        </div>
    );
};

export default ScaleUpScreen;
