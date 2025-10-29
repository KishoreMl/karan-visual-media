import React from 'react';
import './About.scss';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
            </div>
            
            <div className="about-container">
                <h1 className="about-title">About Us</h1>
                <p className="about-subtitle">
                    Creating visual stories that inspire and engage
                </p>
                
                <div className="about-content">
                    <p>
                        We are a passionate team of visual storytellers dedicated to bringing your ideas to life.
                        With years of experience in video production, photography, and animation, we deliver
                        exceptional results that exceed expectations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;

