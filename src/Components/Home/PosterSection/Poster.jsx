import React, { useEffect, useRef, useState } from 'react';
import './Poster.scss';

const Poster = () => {
    const containerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let rafId = null;
        
        const handleScroll = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            
            rafId = requestAnimationFrame(() => {
                if (!containerRef.current) return;

                const rect = containerRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const elementTop = rect.top;
                
                let progress = 0;
                
                // Animation happens over 2 viewport heights of scrolling
                const animationDistance = windowHeight * 2;
                
                // Start animation when element top reaches viewport top
                if (elementTop <= windowHeight && elementTop >= -animationDistance) {
                    // Calculate scroll progress through the animation
                    const scrolled = windowHeight - elementTop;
                    progress = Math.max(0, Math.min(1, scrolled / animationDistance));
                } else if (elementTop < windowHeight - animationDistance) {
                    // Animation completed
                    progress = 1;
                }
                
                setScrollProgress(progress);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, []);

    // Calculate blob position based on scroll progress
    // Phase 1 (0-0.4): Move from top to center (vertically)
    // Phase 2 (0.4-0.7): Move from center to left (horizontally)
    // Phase 3 (0.7-1): Move back to center and scale up
    const getBlobPosition = () => {
        // Easing function for smooth animation
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const easedProgress = easeInOutCubic(scrollProgress);
        
        if (easedProgress <= 0.4) {
            // Phase 1: Top to center (vertical movement)
            const phase1Progress = easedProgress / 0.4; // 0 to 1
            const startTop = -15; // Start above viewport (%)
            const centerTop = 50; // Center vertically (%)
            
            return {
                top: `${startTop + (centerTop - startTop) * phase1Progress}%`,
                left: '50%',
                translateX: '-50%',
                translateY: '-50%',
                opacity: phase1Progress,
                scale: 0.3 + phase1Progress * 0.7, // Scale from 0.3 to 1
            };
        } else if (easedProgress <= 0.7) {
            // Phase 2: Center to left (horizontal movement)
            const phase2Progress = (easedProgress - 0.4) / 0.3; // 0 to 1
            const centerTop = 50;
            const centerLeft = 50;
            const endLeft = 10; // Left side (%)
            
            // Interpolate translateX from -50% to 0% as we move left
            const translateXPercent = -50 * (1 - phase2Progress);
            
            return {
                top: `${centerTop}%`,
                left: `${centerLeft + (endLeft - centerLeft) * phase2Progress}%`,
                translateX: `${translateXPercent}%`,
                translateY: '-50%',
                opacity: 1,
                scale: 1,
            };
        } else {
            // Phase 3: Move back to center and scale up
            const phase3Progress = (easedProgress - 0.7) / 0.3; // 0 to 1
            const centerTop = 50;
            const startLeft = 10;
            const centerLeft = 50;
            
            // Interpolate translateX from 0% back to -50% as we move back to center
            const translateXPercent = -50 * phase3Progress;
            
            // Scale up from 1 to 1.5
            const scale = 1 + phase3Progress * 0.5;
            
            return {
                top: `${centerTop}%`,
                left: `${startLeft + (centerLeft - startLeft) * phase3Progress}%`,
                translateX: `${translateXPercent}%`,
                translateY: '-50%',
                opacity: 1,
                scale: scale,
            };
        }
    };

    const blobPosition = getBlobPosition();

    return (
        <div className="poster-section" ref={containerRef}>
            <div className="poster-container">
                {/* Black blob with scroll-based animation */}
                <div className="poster-top-section">
                    <div 
                        className="poster-blob"
                        style={{
                            top: blobPosition.top,
                            left: blobPosition.left,
                            opacity: blobPosition.opacity,
                            transform: `translate(${blobPosition.translateX}, ${blobPosition.translateY}) scale(${blobPosition.scale}) rotate(-5deg)`,
                        }}
                    >
                        {/* <div className="poster-blob-text">
                            <span className="poster-text-large">Small</span>
                            <span className="poster-text-medium">Habits</span>
                        </div> */}
                    </div>
                </div>
            
                {/* Bottom left - "That Secretly Change Your Life" */}
                {/* <div className="poster-bottom-section">
                    <div className="poster-text-line">That</div>
                    <div className="poster-text-line">Secretly</div>
                    <div className="poster-text-line poster-text-highlight">Change</div>
                    <div className="poster-text-line poster-text-highlight">Your Life</div>
                </div> */}
            </div>
        </div>
    );
};

export default Poster;