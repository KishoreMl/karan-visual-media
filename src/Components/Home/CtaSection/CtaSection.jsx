import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedHeading from '../../AnimatedHeading/AnimatedHeading';
import './CtaSection.scss';

const CtaSection = () => {
    return (
        <div className="contact-cta-section">
            <div className="cta-content">
                <AnimatedHeading text="Have a Project in Mind?" tag="h2" className="cta-title centered" />
                <p className="cta-description">
                    Let's collaborate and bring your vision to life. Reach out to us for a free consultation and discover how we can help your brand stand out.
                </p>
                <Link to="/contact" className="cta-button">
                    <span>Let's Talk</span>
                    <span className="button-arrow">→</span>
                </Link>
            </div>
        </div>
    );
};

export default CtaSection;

