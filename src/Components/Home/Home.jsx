import React, { useEffect, useRef, useState } from 'react';
import DescriptionCard from './DescriptionCard/DescriptionCard';
import DescriptiveContent from './DescriptiveContent/DescriptiveContent';
import darkLogo from '../../assets/images/dark_theme_logo.png';
import lightLogo from '../../assets/images/light_theme_logo.png';
import ScaleUpScreen from './ScaleUpScreen/ScaleUpScreen';
import CtaSection from './CtaSection/CtaSection';
import LogoGridSection from './LogoGridSection/LogoGridSection';
import HorizontalText from './HorizontalText/HorixontalText';
import Poster from './PosterSection/Poster';
import './Home.scss';


const Home = ({ isDarkMode }) => {
    const logo = isDarkMode ? darkLogo : lightLogo;
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const logoRef = useRef(null);
    const [logoProgress, setLogoProgress] = useState(0);


    // Card Typing Animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px'
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);


    // i Logo Animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let startTime = null;
                    const duration = 700; 
                    const animate = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        setLogoProgress(progress);
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {

                            setLogoProgress(1);
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect(); 
                }
            },
            {
                threshold: 0.9, // Trigger when 100% of element is visible
                rootMargin: '0px'
            }
        );

        if (logoRef.current) {
            observer.observe(logoRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div className="content-container">

            {/* Hero Section */}
            <div className="header-section">
                <img src={logo} alt="Creative Knacks" className="logo" />
                <p className="animated-text">
                    {" Where your ideas come to life.".split(' ').map((word, index) => (
                        <span key={index} className="word">
                            {word}{'   '}
                        </span>
                    ))}
                </p>
            </div>

            <Poster />

            {/* Logo Content Section */}
            <div className="autofix-container">
                <div className="text-content">
                    <h1 className="main-title">Design it once. Design it right.</h1>
                    <p className="main-description">
                    Blending Design, Animation, and Technology to Elevate Brands.We Turn Brands into Visual Experiences.
                    </p>
                    <a href="/works" className="explore-link">Explore our works</a>
                </div>
                <div className="logo-content" ref={logoRef}>
                <div className="logo-icon">
                    <div 
                        className="logo-dot"
                        style={{ 
                            background: logoProgress >= 0.99 
                                ? 'linear-gradient(135deg, #FFA500 0%, #FFB627 100%)' 
                                : 'transparent'
                        }}
                    ></div>
                    <div className="logo-bar">
                        <div 
                            className="logo-bar-progress"
                            style={{ height: `${logoProgress * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            </div>

            {/* Services Card Section */}
            <DescriptionCard />

            {/* Descriptive Content Section */}
            <DescriptiveContent />

            {/* Scale Up Screen Section */}
            <ScaleUpScreen />

            {/* Clients Logo Grid Section */}
            <LogoGridSection />

            {/* Text Carousel */}
            {/* <TextCarousel /> */}
            <HorizontalText />

            {/* Contact CTA Section */}
            <CtaSection />

        </div>
    );
};

export default Home;
