import React, { useEffect, useRef, useState } from 'react';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import CtaSection from '../Home/CtaSection/CtaSection';
import authorImage from '../../assets/karan.jpeg';
import './AboutUs.scss';

const AboutUs = () => {
    const [visibleSections, setVisibleSections] = useState([]);
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observerOptions = { threshold: 0.15, rootMargin: '0px' };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                const sectionIndex = parseInt(entry.target.dataset.section);
                if (entry.isIntersecting) {
                    setVisibleSections(prev =>
                        prev.includes(sectionIndex) ? prev : [...prev, sectionIndex]
                    );
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentSections = sectionsRef.current;
        currentSections.forEach((section) => { if (section) observer.observe(section); });

        return () => {
            currentSections.forEach((section) => { if (section) observer.unobserve(section); });
        };
    }, []);

    const addToRefs = (el, index) => {
        if (el && !sectionsRef.current.includes(el)) sectionsRef.current[index] = el;
    };

    return (
        <div className="about-page">

            {/* Hero — heading + text left | photo + author info right */}
            <div
                ref={(el) => addToRefs(el, 1)}
                data-section={1}
                className={`about-section hero-split ${visibleSections.includes(1) ? 'visible' : ''}`}
            >
                <div className="hero-left">
                    <AnimatedHeading text="ABOUT OUR STUDIO" tag="h1" className="about-title" />
                    <p className="intro-text">
                        At Creative Knacks, we don't just create designs — we build experiences that define brands.
                    </p>
                    <p className="intro-subtext">
                        We are a creative agency driven by strategy, storytelling, and innovation. In a world where attention is everything, we help brands stand out with powerful visuals, meaningful content, and smart digital solutions.
                    </p>
                    <h2 className="studio-story-heading">Studio Story</h2>
                    <p className="intro-subtext">
                        Our studio was built on a simple belief — creativity should solve real problems.
                    </p>
                    <p className="intro-subtext">
                        We work closely with startups, founders, and growing businesses to transform ideas into meaningful brands. Every project we take is driven by strategy, thoughtful design, and a deep understanding of the audience.
                    </p>
                    <p className="intro-subtext">
                        Our process is collaborative, focused, and built to create brands that are not just beautiful, but impactful and scalable.
                    </p>
                </div>

                <div className="hero-right">
                    <div className="author-image">
                        <img src={authorImage} alt="Karan C" />
                    </div>
                    <div className="author-info">
                        <h3 className="author-name">Kiruba Karan</h3>
                        <p className="author-title">Founder &amp; Creative Director</p>
                    </div>
                </div>
            </div>

            {/* Craft Statement */}
            <div
                ref={(el) => addToRefs(el, 5)}
                data-section={5}
                className={`about-section ${visibleSections.includes(5) ? 'visible' : ''}`}
            >
                <div className="section-content craft-statement">
                    <p className="craft-text">
                        Every project we take is crafted with attention to detail, creativity, and a deep understanding of the brand.
                    </p>
                </div>
            </div>

            {/* Vision & Mission */}
            <div
                ref={(el) => addToRefs(el, 6)}
                data-section={6}
                className={`about-section vision-mission-grid ${visibleSections.includes(6) ? 'visible' : ''}`}
            >
                <div className="vm-card vision-card">
                    <h2 className="vm-heading">Our Vision</h2>
                    <p className="vm-text">
                        To become a leading creative force that shapes the future of brands through innovation, creativity, and digital excellence.
                    </p>
                    <p className="vm-text">
                        We aim to inspire businesses to think beyond the ordinary and create a strong digital presence that truly represents who they are.
                    </p>
                </div>
                <div className="vm-card mission-card">
                    <h2 className="vm-heading">Our Mission</h2>
                    <ul className="mission-list">
                        <li>To deliver high-quality creative solutions with real impact</li>
                        <li>To help brands grow through strategic design and storytelling</li>
                        <li>To build long-term relationships with clients based on trust and results</li>
                        <li>To constantly evolve with trends, technology, and creativity</li>
                    </ul>
                </div>
            </div>

            {/* Why Creative Knacks */}
            <div
                ref={(el) => addToRefs(el, 7)}
                data-section={7}
                className={`about-section ${visibleSections.includes(7) ? 'visible' : ''}`}
            >
                <div className="section-content why-ck-section">
                    <h2 className="section-heading">Why Creative Knacks?</h2>
                    <p className="section-text">
                        Because we believe creativity is not just about how things look — it's about how they work, how they feel, and how they influence.
                    </p>
                    <div className="trend-statements">
                        <p className="trend-line">We don't follow trends.</p>
                        <p className="trend-line accent">We create them.</p>
                    </div>
                </div>
            </div>

            {/* Taglines */}
            <div
                ref={(el) => addToRefs(el, 8)}
                data-section={8}
                className={`about-section ${visibleSections.includes(8) ? 'visible' : ''}`}
            >
                <div className="taglines-section">
                    <blockquote className="tagline">"Creativity that builds powerful brands."</blockquote>
                    <blockquote className="tagline highlight">"Ideas into Impact."</blockquote>
                </div>
            </div>

            {/* Contact CTA Section */}
            <CtaSection />
        </div>
    );
};

export default AboutUs;
