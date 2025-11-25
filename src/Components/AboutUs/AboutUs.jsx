import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.scss';

const AboutUs = () => {
    const navigate = useNavigate();
    const [visibleSections, setVisibleSections] = useState([]);
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px'
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                const sectionIndex = parseInt(entry.target.dataset.section);
                if (entry.isIntersecting) {
                    setVisibleSections(prev => {
                        if (!prev.includes(sectionIndex)) {
                            return [...prev, sectionIndex];
                        }
                        return prev;
                    });
                } else {
                    setVisibleSections(prev => prev.filter(index => index !== sectionIndex));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentSections = sectionsRef.current;

        currentSections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            currentSections.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const addToRefs = (el, index) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current[index] = el;
        }
    };

    return (
        <div className="about-page">
            <div className="about-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="about-header">
                <h1 className="about-title">About Us</h1>
            </div>

            <div 
                ref={(el) => addToRefs(el, 1)}
                data-section={1}
                className={`about-section ${visibleSections.includes(1) ? 'visible' : ''}`}
            >
                <div className="section-content">
                    <p className="intro-text">
                        A creative studio built on purpose and the belief that great brands start with great ideas.
                    </p>
                </div>
            </div>

            {/* Studio Story Section */}
            <div 
                ref={(el) => addToRefs(el, 2)}
                data-section={2}
                className={`about-section ${visibleSections.includes(2) ? 'visible' : ''}`}
            >
                <div className="section-content">
                    <h2 className="section-heading">Studio Story</h2>
                    <p className="section-text">
                        We were built on a simple belief that great design isn't just something you see, it's something you feel. 
                        We work closely with founders, startups and global teams to build brands that are bold in thinking and 
                        refined in execution. Our process is hands-on and collaborative, combining clear strategy with creative 
                        instinct to create work that's thoughtful, lasting and truly you.
                    </p>
                </div>
            </div>

            {/* Vision Section */}
            <div 
                ref={(el) => addToRefs(el, 3)}
                data-section={3}
                className={`about-section ${visibleSections.includes(3) ? 'visible' : ''}`}
            >
                <div className="section-content highlight-box">
                    <h3 className="highlight-title">Where creativity meets technology</h3>
                    <p className="section-text">
                        At Karan Visual Media, we create brand experiences that are timeless, scalable and built to connect. 
                        Through thoughtful design systems, we help founders bring their ideas to life with clarity, emotion and intention.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div 
                ref={(el) => addToRefs(el, 4)}
                data-section={4}
                className={`about-section ${visibleSections.includes(4) ? 'visible' : ''}`}
            >
                <div className="section-content">
                    <p className="section-text">
                        We believe great design should move with meaning. Our vision is to build brands that lead. 
                        By bringing together strategy, motion and craft, we aim to shape the next wave of iconic identities 
                        that push culture and business forward.
                    </p>
                </div>
            </div>

            {/* CTA Section */}
            <div 
                ref={(el) => addToRefs(el, 5)}
                data-section={5}
                className={`about-cta ${visibleSections.includes(5) ? 'visible' : ''}`}
            >
                <h2>Ready to create something extraordinary?</h2>
                <p className="cta-description">Let's bring your vision to life</p>
                <button className="cta-button" onClick={() => navigate('/contact')}>
                    <span>Get In Touch</span>
                    <span className="cta-arrow">→</span>
                </button>
            </div>
        </div>
    );
};

export default AboutUs;

