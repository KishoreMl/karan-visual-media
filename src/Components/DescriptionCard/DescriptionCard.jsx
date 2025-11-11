import React from 'react';
import './DescriptionCard.scss';

const DescriptionCard = () => {
    return (
        <div className="glow-info-cards-container">
            <div className='card-cover'>
                <div className="glow-info-card">
                    <div className="card-header">
                        <h2>Card Header</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.
                            <br />
                            To fix this, we need to sanitize the input before using it in the HTTP response. One way to do this is to use the  library, which can escape any special characters.
                        </p>
                    </div>
                </div>
            </div>
            <div className='card-cover'>
                <div className="glow-info-card">
                    <div className="card-header">
                        <h2>Card Header</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.
                            <br />
                            To fix this, we need to sanitize the input before using it in the HTTP response. One way to do this is to use the  library, which can escape any special characters.
                        </p>
                    </div>
                </div>
            </div>
            <div className='card-cover'>
                <div className="glow-info-card">
                    <div className="card-header">
                        <h2>Card Header</h2>
                    </div>
                    <div className="description-content">
                        <p className="card-description">
                            The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.
                            <br />
                            To fix this, we need to sanitize the input before using it in the HTTP response. One way to do this is to use the  library, which can escape any special characters.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescriptionCard;