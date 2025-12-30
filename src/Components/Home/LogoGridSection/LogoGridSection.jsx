import React from 'react';
import AnimatedHeading from '../../AnimatedHeading/AnimatedHeading';
import './LogoGridSection.scss';

// Import carousel logos
import client_logo_1 from "../../../assets/images/logos/nutrieros.jpg";
import client_logo_2 from "../../../assets/images/logos/big_idea.jpg";
import client_logo_3 from "../../../assets/images/logos/eagle.jpg";
import client_logo_4 from "../../../assets/images/logos/tamil_catering.jpg";
import client_logo_5 from "../../../assets/images/logos/yuva_bharathi.jpg";
import client_logo_6 from "../../../assets/images/logos/meinigar.png";
import client_logo_7 from "../../../assets/images/logos/swadeshi.jpg";

const LogoGridSection = () => {
    return (
        <div className="logo-grid-section">
            <AnimatedHeading text="Our Clients" tag="h2" className="logo-grid-title" />
            <div className="logo-grid-container">
                <div className="logo-grid-item">
                    <img src={client_logo_1} alt="Nutrieros" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_2} alt="Big Idea" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_3} alt="Eagle" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_4} alt="Tamil Catering" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_5} alt="Yuva Bharathi" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_6} alt="Yuva Bharathi" className="grid-logo-image" />
                </div>
                <div className="logo-grid-item">
                    <img src={client_logo_7} alt="Yuva Bharathi" className="grid-logo-image" />
                </div>

            </div>
        </div>
    );
};

export default LogoGridSection;

