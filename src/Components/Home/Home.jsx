import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    const animatedTextRef = useRef(null);


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

    // Animated text hover effect
    useEffect(() => {
        const animatedText = animatedTextRef.current;
        if (!animatedText) return;

        const letters = animatedText.querySelectorAll('.letter');
        
        const handleMouseEnter = (e) => {
            const currentLetter = e.target;
            const index = Array.from(letters).indexOf(currentLetter);
            
            // Add hover class to current letter
            currentLetter.classList.add('hover-bold');
            
            // Add hover class to previous letter if it exists
            if (index > 0 && letters[index - 1]) {
                letters[index - 1].classList.add('hover-bold');
            }
            
            // Add hover class to next letter if it exists
            if (index < letters.length - 1 && letters[index + 1]) {
                letters[index + 1].classList.add('hover-bold');
            }
        };
        
        const handleMouseLeave = (e) => {
            const currentLetter = e.target;
            const index = Array.from(letters).indexOf(currentLetter);
            
            // Remove hover class from current letter
            currentLetter.classList.remove('hover-bold');
            
            // Remove hover class from previous letter if it exists
            if (index > 0 && letters[index - 1]) {
                letters[index - 1].classList.remove('hover-bold');
            }
            
            // Remove hover class from next letter if it exists
            if (index < letters.length - 1 && letters[index + 1]) {
                letters[index + 1].classList.remove('hover-bold');
            }
        };
        
        letters.forEach(letter => {
            letter.addEventListener('mouseenter', handleMouseEnter);
            letter.addEventListener('mouseleave', handleMouseLeave);
        });
        
        return () => {
            letters.forEach(letter => {
                letter.removeEventListener('mouseenter', handleMouseEnter);
                letter.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // Logo Animation - based on scroll progress with pinning
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const logoContentElement = logoRef.current;
        if (!logoContentElement) return;

        // Set initial progress
        setLogoProgress(0);

        // Create scroll trigger for logo progress with pinning
        ScrollTrigger.create({
            trigger: logoContentElement,
            start: 'top top',
            end: '+=100vh', // Pin for 100vh of scroll to complete animation
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                // Calculate progress based on scroll position (0 to 1)
                const progress = self.progress;
                setLogoProgress(progress);
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === logoContentElement) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <div className="content-container">

            {/* Hero Section */}
            <div className="hero-section">
                <img src={logo} alt="Creative Knacks" className="logo" />
                <p className="animated-text" ref={animatedTextRef}>
                    {" Where your ideas come to life.".split('').map((char, index) => (
                        <span key={index} className="letter">
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </p>
            </div>

            {/* Poster Section */}
            <Poster />

            {/* Logo Content Section */}
            <div className="logo-container">
                <div className="text-content">
                    <h1 className="main-title">Design it once. Design it right.</h1>
                    <p className="main-description">
                    Blending Design, Animation, and Technology to Elevate Brands.We Turn Brands into Visual Experiences.
                    </p>
                    <a href="/works" className="explore-link">Explore our works</a>
                </div>
                <div className="logo-content" ref={logoRef}>
                <div className="logo-icon">
                    <div className="logo-dot-wrapper">
                        <svg className="logo-dot-svg" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                                className="logo-dot-bg"
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="rgba(255, 165, 0, 0.2)"
                                strokeWidth="4"
                            />
                            {/* Progress circle - hides when complete */}
                            <circle
                                className="logo-dot-progress"
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="var(--primary-yellow, #FFA500)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={283}
                                strokeDashoffset={283 - (logoProgress * 283)}
                                transform="rotate(-90 50 50)"
                                style={{ 
                                    opacity: logoProgress >= 1 ? 0 : 1,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            {/* Filled circle (appears only after progress completes) */}
                            <circle
                                className="logo-dot-fill"
                                cx="50"
                                cy="50"
                                r="45"
                                fill={logoProgress >= 1 ? 'url(#logoGradient)' : 'transparent'}
                                style={{ 
                                    opacity: logoProgress >= 1 ? 1 : 0,
                                    transition: 'opacity 0.5s ease 0.2s'
                                }}
                            />
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFA500" />
                                    <stop offset="100%" stopColor="#FFB627" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
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
