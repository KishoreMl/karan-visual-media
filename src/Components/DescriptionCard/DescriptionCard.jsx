import React from 'react';
import './DescriptionCard.scss';

const DescriptionCard = () => {
    return (
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
            <div className="autofix-card">
                {/* Vulnerability Description Section */}
                <div className="vulnerability-section">
                    <div className="section-header">
                        <div className="github-icon">🐙</div>
                        <span className="repo-name">github-advanced-security</span>
                        <span className="bot-badge">bot</span>
                    </div>
                    
                    <div className="vulnerability-content">
                        <p className="vulnerability-text">
                            The vulnerability in the code is due to the fact that user-provided input is directly used in HTTP response without any sanitization. This can lead to a cross-site scripting (XSS) attack if the user input contains malicious scripts.
                        </p>
                        <p className="fix-description">
                            To fix this, we need to sanitize the input before using it in the HTTP response. One way to do this is to use the <strong>escape-html</strong> library, which can escape any special characters.
                        </p>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default DescriptionCard;