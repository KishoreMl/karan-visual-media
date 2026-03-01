import React, { useEffect, useRef } from 'react';
import DescriptionCard from './DescriptionCard/DescriptionCard';
import DescriptiveContent from './DescriptiveContent/DescriptiveContent';
import darkLogo from '../../assets/images/dark_theme_logo.png';
import lightLogo from '../../assets/images/light_theme_logo.png';
import ScaleUpScreen from './ScaleUpScreen/ScaleUpScreen';
import CtaSection from './CtaSection/CtaSection';
import ClientCarousel from './ClientCarousel/ClientCarousel';
import HorizontalText from './HorizontalText/HorizontalText';
import Poster from './PosterSection/Poster';
import LogoSection from './LogoSection/LogoSection';
import ClientsReview from './ClientReview/ClientsReview';
import './Home.scss';


const Home = ({ isDarkMode }) => {
    const logo = isDarkMode ? darkLogo : lightLogo;
    const animatedTextRef = useRef(null);

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

    return (
        <div className="content-container">

            {/* Hero Section */}
            <div className="hero-section">
                <img src={logo} alt="Creative Knacks" className="logo" />
                <p className="animated-text" ref={animatedTextRef}>
                    {" Where your ideas come to life".split('').map((char, index) => (
                        <span key={index} className="letter">
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </p>
            </div>

            {/* Poster Section */}
            <Poster />

            {/* Logo Content Section */}
            <LogoSection />

            {/* Services Description Card Section */}
            <DescriptionCard />

            {/* Descriptive Content Section */}
            <DescriptiveContent />

            {/* Clients Logo Carousel Section */}
             <ClientCarousel />

            {/* Scale Up Screen Section */}
            <ScaleUpScreen />

            {/* Clients Review Section */}
            <ClientsReview />

            {/* Text Carousel */}
            <HorizontalText />

            {/* Contact CTA Section */}
            <CtaSection />

        </div>
    );
};

export default Home;
