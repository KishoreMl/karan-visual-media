import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import './HorizontalText.scss';

const HorizontalText = () => {
    const wrapperRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, SplitText);

        const wrapper = wrapperRef.current;
        const text = textRef.current;

        if (!wrapper || !text) return;

        // Create SplitText instance
        const split = SplitText.create(text, { type: "chars, words" });

        // Create horizontal scroll tween
        const scrollTween = gsap.to(text, {
            xPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                pin: true,
                end: "+=5000px",
                scrub: true
            }
        });

        // Animate each character
        split.chars.forEach((char) => {
            gsap.from(char, {
                yPercent: "random(-200, 200)",
                rotation: "random(-20, 20)",
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: char,
                    containerAnimation: scrollTween,
                    start: "left 100%",
                    end: "left 30%",
                    scrub: 1
                }
            });
        });

        // Cleanup function
        return () => {
            // Kill all ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            
            // Revert SplitText
            if (split) {
                split.revert();
            }
        };
    }, []);

    return (
        <div className="horizontal-text Horizontal" ref={wrapperRef}>
            <div className="container">
                <h3 className="Horizontal__text heading-xl" ref={textRef}>
                    Animation ● Branding ● Design ● Marketing ● Visual Effects ● Development
                </h3>
            </div>
        </div>
    );
};

export default HorizontalText;