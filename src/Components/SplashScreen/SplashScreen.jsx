import React, { useEffect, useState } from 'react';
import './SplashScreen.scss';

const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Prevent body scroll while splash screen is visible
        document.body.style.overflow = 'hidden';

        // Animation duration in milliseconds - slower and smoother
        const duration = 2500;
        const startTime = Date.now();
        let animationFrameId = null;

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            
            setProgress(newProgress);

            if (newProgress < 100) {
                animationFrameId = requestAnimationFrame(updateProgress);
            } else {
                // Wait a bit before hiding
                setTimeout(() => {
                    setIsVisible(false);
                    document.body.style.overflow = 'auto';
                    if (onComplete) {
                        onComplete();
                    }
                }, 500);
            }
        };

        animationFrameId = requestAnimationFrame(updateProgress);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            document.body.style.overflow = 'auto';
        };
    }, [onComplete]);

    if (!isVisible) {
        return null;
    }

    const progressNumber = Math.round(progress);

    return (
        <div className={`splash-screen ${!isVisible ? 'fade-out' : ''}`}>
            <div className="splash-content">
             
             <div className="logo-container">
                <div className="logo-circle"></div>
                <div className="logo-bar">
                    <div 
                        className="logo-bar-progress"
                        style={{
                            height: `${progressNumber}%`
                        }}
                    ></div>
                </div>
             </div>

            {/* Loading Number in Bottom Left */}
            <div className="loading-number">
                <span className="number-digit number-tens">
                    {Math.floor(progressNumber / 10)}
                </span>
                <span className="number-digit number-ones">
                    {progressNumber % 10}
                </span>
            </div>
        </div>
    </div>
    );
};

export default SplashScreen;
