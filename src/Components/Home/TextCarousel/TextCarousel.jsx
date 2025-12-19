import React from 'react';
import './TextCarousel.scss';

const TextCarousel = () => {
    const items = ['Animation', 'Branding', 'Design', 'Marketing', 'Visual Effects', 'Development'];

    return (
        <div className="text-carousel-section">
            <div className="carousel-track-wrapper">
                <div className="carousel-track">
                    {items.map((item, index) => (
                        <React.Fragment key={`first-${index}`}>
                            <span className="carousel-item">{item}</span>
                            <span className="carousel-dot">●</span>
                        </React.Fragment>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {items.map((item, index) => (
                        <React.Fragment key={`second-${index}`}>
                            <span className="carousel-item">{item}</span>
                            <span className="carousel-dot">●</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TextCarousel;

