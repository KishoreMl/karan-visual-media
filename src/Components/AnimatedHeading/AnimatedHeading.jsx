import React, { useEffect, useRef, useState } from 'react';
import './AnimatedHeading.scss';

const AnimatedHeading = ({ text, tag = 'h1', className = '', delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const headingRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        if (headingRef.current) {
            observer.observe(headingRef.current);
        }

        return () => {
            if (headingRef.current) {
                observer.unobserve(headingRef.current);
            }
        };
    }, []);

    const words = text.split(' ');
    const Tag = tag;

    return (
        <Tag 
            ref={headingRef} 
            className={`animated-heading ${className} ${isVisible ? 'visible' : ''}`}
        >
            {words.map((word, index) => (
                <span 
                    key={index} 
                    className="word-wrapper"
                >
                    <span 
                        className="word"
                        style={{ 
                            animationDelay: `${delay + index * 0.15}s`
                        }}
                    >
                        {word}
                    </span>
                    {index < words.length - 1 && <span className="space">&nbsp;</span>}
                </span>
            ))}
        </Tag>
    );
};

export default AnimatedHeading;
