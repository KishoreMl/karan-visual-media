import React from 'react';
import './DescriptionCard.scss';

const DescriptionCard = () => {
    return (
        <>
        <div className="autofix-container">
            {/* Left Side - Text Content */}
            <div className="text-content">
                <h1 className="main-title">Apply fixes in seconds.</h1>
                <p className="main-description">
                    Spend less time fixing vulnerabilities and more time building features with Copilot Autofix.
                </p>
                <a href="https://github.com/features/security" className="explore-link">Explore GitHub Advanced Security &gt;</a>
            </div>

            {/* Right Side - Glowing Card */}
            {/* <div className="glow-info-card">
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
            </div> */}
        </div>

        <div className="glow-info-cards-container">
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
        </>
    );
};

export default DescriptionCard;