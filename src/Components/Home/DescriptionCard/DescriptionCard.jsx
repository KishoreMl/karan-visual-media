import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import devImg from '../../../assets/images/Dev.png';
import socialMediaImg from '../../../assets/images/Socialmedia.png';
import brandingImg from '../../../assets/images/Branding.png';
import './DescriptionCard.scss';

const DescriptionCard = () => {
    const navigate = useNavigate();
    const cardsRef = useRef([]);

    const handleCardClick = () => {
        navigate('/works');
    };

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-visible');
                } else {
                    entry.target.classList.remove('card-visible');
                }
            });
        }, observerOptions);

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => {
            cardsRef.current.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    return (
        <div className="glow-info-cards-container">
            <div 
                className='card-cover card-animate card-1' 
                onClick={handleCardClick}
                ref={el => cardsRef.current[0] = el}
            >
                <div className="glow-info-card">
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
            </div>  
            <div 
                className='card-cover card-animate card-2' 
                onClick={handleCardClick}
                ref={el => cardsRef.current[1] = el}
            >
                <div className="glow-info-card">
                    <div className="card-img-container">
                        <img src={socialMediaImg} alt="social media" />
                    </div>
                    <div className="card-header">
                        <h2>Social Media Handling</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.
                        </p>
                    </div>
                </div>
            </div>
            <div 
                className='card-cover card-animate card-3' 
                onClick={handleCardClick}
                ref={el => cardsRef.current[2] = el}
            >
                <div className="glow-info-card">
                    <div className="card-img-container">
                        <img src={devImg} alt="dev" />
                    </div>
                    <div className="card-header">
                        <h2>Website Development</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescriptionCard;