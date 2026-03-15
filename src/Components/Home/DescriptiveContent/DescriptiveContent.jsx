import React, { useEffect, useRef, useState } from 'react';
import './DescriptiveContent.scss';

const DescriptiveContent = () => {
    const contentRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, stop observing to prevent flickering
                    observer.disconnect();
                }
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
        "Creativity that builds powerful brands.",
        "Today’s businesses need more than just design.",
        "We combine strategy, storytelling and design",
        "to create digital experiences that people remember.",
        "Ideas that make brands stand out."
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
