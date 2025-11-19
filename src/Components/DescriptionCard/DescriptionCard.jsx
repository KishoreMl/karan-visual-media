import React from 'react';
import devImage from '../../assets/images/Dev.png';
import './DescriptionCard.scss';

const DescriptionCard = () => {
    return (
        <div className="glow-info-cards-container">
            <div className='card-cover'>
                <div className="glow-info-card">
                    <div className="card-img-container">
                        <img src={devImage} alt="dev" />
                    </div>
                    <div className="card-header">
                        <h2>Card Header</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.
                        </p>
                    </div>
                </div>
            </div>
            <div className='card-cover'>
                <div className="glow-info-card">
                    <div className="card-img-container">
                        <img src={devImage} alt="dev" />
                    </div>
                    <div className="card-header">
                        <h2>Card Header</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.
                        </p>
                    </div>
                </div>
            </div>
            <div className='card-cover'>
                <div className="glow-info-card">
                    <div className="card-img-container">
                        <img src={devImage} alt="dev" />
                    </div>
                    <div className="card-header">
                        <h2>Card Header</h2>
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