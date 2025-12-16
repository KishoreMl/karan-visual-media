import React, { useEffect, useRef, useState } from 'react';
import './DescriptiveContent.scss';

const DescriptiveContent = () => {
    const contentRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.2,
                rootMargin: '0px'
            }
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    const fullText = "Design on the web isn't static anymore. Today's brands need energy, personality and meaning. We bring together strategy, design and storytelling to build digital experiences that grab attention, move fast and make people feel.";
    
    const characters = fullText.split('');

    return (
        <div className="descriptive-content" ref={contentRef}>
            <div className="text-content-section">
                <h2 className={`main-heading ${isVisible ? 'visible' : ''}`}>
                    {characters.map((char, index) => (
                        char === ' ' ? (
                            <span key={index} className="space">&nbsp;</span>
                        ) : (
                            <span key={index} className="letter-wrapper">
                                <span 
                                    className="letter"
                                    style={{ animationDelay: `${index * 0.015}s` }}
                                >
                                    {char}
                                </span>
                            </span>
                        )
                    ))}
                </h2>
            </div>
        </div>
    );
};

export default DescriptiveContent;
