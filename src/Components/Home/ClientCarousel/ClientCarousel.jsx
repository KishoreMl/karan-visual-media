import React from 'react';
import AnimatedHeading from '../../AnimatedHeading/AnimatedHeading';
import './ClientCarousel.scss';

// Import carousel logos
import client_logo_7 from "../../../assets/images/clients/nutrieros.jpg";
import client_logo_1 from "../../../assets/images/clients/bigidea.jpg";
import client_logo_4 from "../../../assets/images/clients/eagle.jpg";
import client_logo_5 from "../../../assets/images/clients/tamil_catering.jpg";
import client_logo_2 from "../../../assets/images/clients/yuva_bharathi.jpg";
import client_logo_6 from "../../../assets/images/clients/meinigar.png";
import client_logo_3 from "../../../assets/images/clients/swadeshi.jpg";

const ClientCarousel = () => {
    const logos = [
        { src: client_logo_1, alt: "Big Idea" },
        { src: client_logo_2, alt: "Yuva Bharathi" },
        { src: client_logo_3, alt: "Swadeshi" },
        { src: client_logo_4, alt: "Eagle" },
        { src: client_logo_5, alt: "Tamil Catering" },
        { src: client_logo_6, alt: "Meinigar" },
        { src: client_logo_7, alt: "Nutrieros" }
    ];

    // Duplicate logos for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos];

    return (
        <div className="logo-grid-section">
            <AnimatedHeading text="Our Clients" tag="h2" className="logo-grid-title" />
            <div className="logo-carousel-wrapper">
                <div className="logo-carousel-track">
                    {duplicatedLogos.map((logo, index) => (
                        <div key={index} className="logo-carousel-item">
                            <img src={logo.src} alt={logo.alt} className="carousel-logo-image" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientCarousel;

