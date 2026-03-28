import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import websiteImg from '../../../assets/images/website.png';
import socialMediaImg from '../../../assets/images/social_media_icon.png';
import brandingImg from '../../../assets/images/branding.png';
import motionGraphicsImg from '../../../assets/images/motion_graphics.png';
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
                <h2 className="description-card-title">WHAT</h2>
                <h4 className="description-card-sub-title">WE DO</h4>
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
                        We build brands that people remember. From strategy to visuals, we create identities that speak, connect and stand out everywhere.
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
                            Your brand deserves attention. We plan, create and manage content that engages, grows and converts daily.
                        </p>
                    </div>
                </div>
                <div
                    className='card-cover card-animate card-3'
                    onClick={handleCardClick}
                    ref={el => cardsRef.current[2] = el}
                >
                    <div className="card-img-container">
                        <img src={websiteImg} alt="dev" />
                    </div>
                    <div className="card-header">
                        <h2>Website Development</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            Your website is your digital home. We build fast, responsive and user-friendly sites designed to perform and scale.
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
                            Bring your ideas to life.We create impactful motion visuals that capture attention and tell your story.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescriptionCard;