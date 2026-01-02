import React, { useEffect, useRef } from 'react';
import AnimatedHeading from '../../AnimatedHeading/AnimatedHeading';
import './ClientLogoSection.scss';

// Import carousel logos
import client_logo_1 from "../../../assets/images/clients/nutrieros.jpg";
import client_logo_2 from "../../../assets/images/clients/bigidea.jpg";
import client_logo_3 from "../../../assets/images/clients/eagle.jpg";
import client_logo_4 from "../../../assets/images/clients/tamil_catering.jpg";
import client_logo_5 from "../../../assets/images/clients/yuva_bharathi.jpg";
import client_logo_6 from "../../../assets/images/clients/meinigar.png";
import client_logo_7 from "../../../assets/images/clients/swadeshi.jpg";

const LogoGridSection = () => {
    const containerRef = useRef(null);
    const lastScrollYRef = useRef(window.scrollY);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            const currentScrollY = window.scrollY;
            const isScrollingDown = currentScrollY > lastScrollYRef.current;
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Only animate when scrolling down
                    if (isScrollingDown) {
                        entry.target.classList.add('animate-in');
                        // Stop observing once animated to ensure it only animates once
                        observer.unobserve(entry.target);
                    }
                }
            });
            
            // Update scroll position after checking direction
            lastScrollYRef.current = currentScrollY;
        }, observerOptions);

        // Observe all logo-grid-item elements
        const logoItems = container.querySelectorAll('.logo-grid-item');
        logoItems.forEach((item, index) => {
            // Add staggered delay via inline style
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });

        return () => {
            logoItems.forEach(item => observer.unobserve(item));
        };
    }, []);

    return (
        <div className="logo-grid-section">
            <AnimatedHeading text="Our Clients" tag="h2" className="logo-grid-title" />
            <div className="logo-grid-container" ref={containerRef}>
                <div className="logo-grid-item">
                    <img src={client_logo_1} alt="Nutrieros" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_2} alt="Big Idea" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_3} alt="Eagle" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_4} alt="Tamil Catering" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_5} alt="Yuva Bharathi" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_6} alt="Yuva Bharathi" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_7} alt="Yuva Bharathi" className="grid-logo-image" />
                </div>

            </div>
        </div>
    );
};

export default LogoGridSection;

