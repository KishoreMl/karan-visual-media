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

    const lines = [
        "Design on the web isn't static anymore.",
        "Today's brands need energy, personality and meaning.",
        "We bring together strategy, design and storytelling",
        "to build digital experiences that grab attention,",
        "move fast and make people feel."
    ];

    return (
        <div className="descriptive-content" ref={contentRef}>
            <div className="text-content-section">
                <h2 className={`main-heading ${isVisible ? 'animate-lines' : ''}`}>
                    {lines.map((line, index) => (
                        <div 
                            key={index} 
                            className="line-wrapper"
                        >
                            <span 
                                className="text-line"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                {line}
                            </span>
                        </div>
                    ))}
                </h2>
            </div>
        </div>
    );
};

export default DescriptiveContent;
