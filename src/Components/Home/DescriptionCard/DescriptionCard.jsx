import React from 'react';
import { useNavigate } from 'react-router-dom';
import devImg from '../../../assets/images/Dev.png';
import socialMediaImg from '../../../assets/images/Socialmedia.png';
import brandingImg from '../../../assets/images/Branding.png';
import './DescriptionCard.scss';

const DescriptionCard = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/works');
    };

    return (
        <div className="glow-info-cards-container">
            <div className='card-cover' onClick={handleCardClick}>
                <div className="glow-info-card">
                    <div className="card-img-container">
                        <img src={brandingImg} alt="branding" />
                    </div>
                    <div className="card-header">
                        <h2>Branding</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.
                        </p>
                    </div>
                </div>
            </div>  
            <div className='card-cover' onClick={handleCardClick}>
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
            <div className='card-cover' onClick={handleCardClick}>
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