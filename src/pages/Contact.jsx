import React from 'react';
import './Contact.scss';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
            </div>
            
            <div className="contact-container">
                <h1 className="contact-title">Get In Touch</h1>
                <p className="contact-subtitle">
                    Let's create something amazing together
                </p>
                
                <div className="contact-content">
                    <p>
                        Ready to start your next project? We'd love to hear from you.
                        Reach out and let's discuss how we can bring your vision to life.
                    </p>
                    <div className="contact-info">
                        <div className="info-item">📧 info@karanvisualmedia.com</div>
                        <div className="info-item">📞 +1 (555) 123-4567</div>
                        <div className="info-item">📍 Los Angeles, CA</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

