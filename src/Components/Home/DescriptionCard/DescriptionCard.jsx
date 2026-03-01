import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import devImg from '../../../assets/images/Dev.png';
import socialMediaImg from '../../../assets/images/Socialmedia.png';
import brandingImg from '../../../assets/images/Logo.png';
import motionGraphicsImg from '../../../assets/images/Animation.png';
import AnimatedHeading from '../../AnimatedHeading/AnimatedHeading';
import './DescriptionCard.scss';

const DescriptionCard = () => {
    const navigate = useNavigate();
    const cardsRef = useRef([]);

    const handleCardClick = () => {
        navigate('/services');
    };

    useEffect(() => {
        const cards = cardsRef.current.filter(card => card !== null);
        if (cards.length === 0) return;

        // Remove all animations - set cards to normal visible state
        gsap.set(cards, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            clearProps: 'all'
        });

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <section className="description-card-section">
            <div className='description-card-header'>
                <AnimatedHeading text="What we do" tag="h2" className="description-card-title" />
            </div>
            <div className="glow-info-cards-container">
                <div
                    className='card-cover card-animate card-1'
                    onClick={handleCardClick}
                    ref={el => cardsRef.current[0] = el}
                >
                    <div className="card-img-container">
                        <img src={brandingImg} alt="branding" />
                    </div>
                    <div className="card-header">
                        <h2>Branding</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            Comprehensive branding solutions that define your identity. From logo design to complete brand guidelines, we create memorable visual identities.
                        </p>
                    </div>
                </div>
                <div
                    className='card-cover card-animate card-2'
                    onClick={handleCardClick}
                    ref={el => cardsRef.current[1] = el}
                >
                    <div className="card-img-container">
                        <img src={socialMediaImg} alt="social media" />
                    </div>
                    <div className="card-header">
                        <h2>Social Media Handling</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            Strategic social media management that grows your online presence. We create engaging content and manage your brand across all platforms.
                        </p>
                    </div>
                </div>
                <div
                    className='card-cover card-animate card-3'
                    onClick={handleCardClick}
                    ref={el => cardsRef.current[2] = el}
                >
                    <div className="card-img-container">
                        <img src={devImg} alt="dev" />
                    </div>
                    <div className="card-header">
                        <h2>Website Development</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            Professional website development services that create engaging and functional online experiences.
                        </p>
                    </div>
                </div>

                <div
                    className='card-cover card-animate card-4'
                    onClick={handleCardClick}
                    ref={el => cardsRef.current[3] = el}
                >
                    <div className="card-img-container">
                        <img src={motionGraphicsImg} alt="motion graphics" />
                    </div>
                    <div className="card-header">
                        <h2>Motion Graphics</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            Create compelling motion graphics that bring your brand to life. From animated logos to dynamic explainer videos, we deliver stunning visual storytelling.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescriptionCard;