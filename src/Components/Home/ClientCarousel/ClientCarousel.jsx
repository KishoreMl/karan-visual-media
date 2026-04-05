import React from 'react';
import AnimatedHeading from '../../AnimatedHeading/AnimatedHeading';
import './ClientCarousel.scss';

// Import carousel logos
import client_logo_7 from "../../../assets/client-logos/nutrieros.jpg";
import client_logo_1 from "../../../assets/client-logos/big-idea.jpg";
import client_logo_4 from "../../../assets/client-logos/eagle.jpg";
import client_logo_5 from "../../../assets/client-logos/tamil-catering.jpg";
import client_logo_2 from "../../../assets/client-logos/yuva-bharathi.jpg";
import client_logo_6 from "../../../assets/client-logos/meinigar.jpg";
import client_logo_3 from "../../../assets/client-logos/swadeshi.jpg";
import client_logo_8 from "../../../assets/client-logos/fss.png";
import client_logo_9 from "../../../assets/client-logos/st.png";
import client_logo_10 from "../../../assets/client-logos/thum-tea.jpg";

const ClientCarousel = () => {
    const logos = [
        { src: client_logo_1, alt: "Big Idea" },
        { src: client_logo_2, alt: "Yuva Bharathi" },
        { src: client_logo_3, alt: "Swadeshi" },
        { src: client_logo_4, alt: "Eagle" },
        { src: client_logo_5, alt: "Tamil Catering" },
        { src: client_logo_6, alt: "Meinigar" },
        { src: client_logo_7, alt: "Nutrieros" },
        { src: client_logo_8, alt: "FSS" },
        { src: client_logo_9, alt: "ST" },
        { src: client_logo_10, alt: "Thum Tea" }
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

