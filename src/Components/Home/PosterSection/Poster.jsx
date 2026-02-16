import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoSrc from '../../../assets/works/Thum tea/butterfly.mp4';
import './Poster.scss';

const Poster = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const backgroundRef = useRef(null);
    const yellowOverlayRef = useRef(null);
    const videoRef = useRef(null);
    const contentTextRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const text = textRef.current;
        const background = backgroundRef.current;
        const yellowOverlay = yellowOverlayRef.current;
        const video = videoRef.current;
        const contentText = contentTextRef.current;

        if (!section || !text || !background || !yellowOverlay || !video || !contentText) return;

        // Function to check if screen is large or extra large (1024px and above)
        const checkLargeScreen = () => window.innerWidth >= 1024;
        const isLargeScreen = checkLargeScreen();

        const backgroundVideo = background.querySelector('video');
        
        // Set initial states
        gsap.set(background, { y: 0 });
        if (backgroundVideo) {
            gsap.set(backgroundVideo, { y: 0 });
        }
        gsap.set(text, { scale: 1, z: 0, opacity: 1 });
        // Yellow overlay starts from top (hidden)
        gsap.set(yellowOverlay, { 
            clipPath: 'inset(0% 0 100% 0)',
            backgroundColor: 'var(--primary-yellow, #F9A825)'
        });
        
        // Set initial state for video - ensure it stays at normal size on small/medium screens
        gsap.set(video, {
            scale: 1,
            x: 0,
            y: 0,
            transformOrigin: 'center center'
        });
        
        // Set initial state for content text (hidden below, transparent) - only visible on large screens
        if (isLargeScreen) {
            gsap.set(contentText, {
                y: 100,
                opacity: 0
            });
        } else {
            // Hide content text on small/medium screens
            gsap.set(contentText, {
                opacity: 0,
                display: 'none'
            });
        }

        // Calculate total scroll distance
        // First phase: yellow overlay reveal (100vh)
        // Second phase: video scale down and move (200vh) - only for large screens (increased for slower animation)
        const totalScrollDistance = isLargeScreen ? '+=1500vh' : '+=100vh';

        // Create a timeline for all animations with pinning
        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: totalScrollDistance,
                scrub: 1,
                pin: true,
                pinSpacing: true
            }
        });

        // Phase 1: Yellow overlay animates from top to bottom (0-100vh)
        mainTimeline.to(yellowOverlay, {
            clipPath: 'inset(0% 0 0% 0)',
            ease: 'none',
            duration: 1
        });

        // Phase 2: Video scales down and moves to top left, yellow overlay becomes transparent, text fades out (only for large screens)
        if (isLargeScreen) {
            // Yellow overlay background becomes transparent
            mainTimeline.to(yellowOverlay, {
                background: '#000000',
                ease: 'power2.inOut',
                duration: 0.5
            }, '>');
            
            // Text becomes transparent
            mainTimeline.to(text, {
                opacity: 0,
                ease: 'power2.inOut',
                duration: 0.5
            }, '>');
            
            // Scale down with transform origin at top left, which keeps top left corner fixed (slower animation)
            mainTimeline.to(video, {
                top:'10%',
                scale: 0.2,
                transformOrigin: 'top left',
                ease: 'power2.inOut',
                duration: 2.0
            }, '>');
            
            // Content text slides up from below and fades in - starts when video is halfway scaled down
            mainTimeline.to(contentText, {
                y: 0,
                opacity: 1,
                ease: 'power2.out',
                duration: 0.3
            }, '>-=1'); // Start 1 second after the video scaling starts (halfway through the 2.0s duration)
        }

        // Parallax effect: background moves up (negative Y) when scrolling
        gsap.to(background, {
            y: '-20%',
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: totalScrollDistance,
                scrub: 1
            }
        });

        // Text scales down and moves back in Z-axis when scrolling
        gsap.to(text, {
            scale: 0.8,
            z: -800,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: totalScrollDistance,
                scrub: 1
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="poster-section" ref={sectionRef}>
            <div className="poster-background" ref={backgroundRef}>
                
            </div>
            <div className="yellow-overlay" ref={yellowOverlayRef}>
                <video 
                    ref={videoRef}
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="poster-video"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </div>
            <h1 className="next-project-text" ref={textRef}>INNOVATION</h1>
            <div className="content-text" ref={contentTextRef}>
                <h2 className="content-heading">Design on the web isn't static anymore. Today's brands need energy, personality and meaning. We bring together strategy, design and storytelling to build digital experiences that grab attention. Design on the web isn't static anymore. Today's brands need energy, personality and meaning.</h2>
            </div>
        </div>
    );
};

export default Poster;