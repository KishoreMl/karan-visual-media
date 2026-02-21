import React, { useState, useEffect, useRef } from 'react';
import AnimatedHeading from '../../AnimatedHeading/AnimatedHeading';
import quotesImgLight from '../../../assets/images/Double_Quotes_light.png';
import quotesImgDark from '../../../assets/images/Double_Quotes_Dark.png';
import './ClientsReview.scss';

const ClientsReview = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const animatedTextRef = useRef(null);

    const testimonials = [
        {
            text: "I’m incredibly impressed with the video editing work! The attention to detail, smooth transitions, and creative touch truly brought the video to life. It exceeded my expectations, and I’m grateful for such a thoughtful gift. Highly recommend their services for anyone looking for professional and creative video editing!",
            name: "Rahul"
        },
        {
            text: "I am totally satisfied with the service and creative work of creative knacks, Thankyou, Excellent work.",
            name: "Rpm vidhyalya school"
        },
        {
            text:"Consistent, professional, and receptive to feedback. I've noticed clear progress in his work over time. A dependable choice for editing and social media handling",
            name:"Nutrieros health studio"
        }
    ];

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const currentTestimonial = testimonials[currentIndex];

    // Animated text hover effect
    useEffect(() => {
        const animatedText = animatedTextRef.current;
        if (!animatedText) return;

        const letters = animatedText.querySelectorAll('.letter');
        
        const handleMouseEnter = (e) => {
            const currentLetter = e.target;
            const index = Array.from(letters).indexOf(currentLetter);
            
            // Add hover class to current letter
            currentLetter.classList.add('hover-bold');
            
            // Add hover class to previous letter if it exists
            if (index > 0 && letters[index - 1]) {
                letters[index - 1].classList.add('hover-bold');
            }
            
            // Add hover class to next letter if it exists
            if (index < letters.length - 1 && letters[index + 1]) {
                letters[index + 1].classList.add('hover-bold');
            }
        };
        
        const handleMouseLeave = (e) => {
            const currentLetter = e.target;
            const index = Array.from(letters).indexOf(currentLetter);
            
            // Remove hover class from current letter
            currentLetter.classList.remove('hover-bold');
            
            // Remove hover class from previous letter if it exists
            if (index > 0 && letters[index - 1]) {
                letters[index - 1].classList.remove('hover-bold');
            }
            
            // Remove hover class from next letter if it exists
            if (index < letters.length - 1 && letters[index + 1]) {
                letters[index + 1].classList.remove('hover-bold');
            }
        };
        
        letters.forEach(letter => {
            letter.addEventListener('mouseenter', handleMouseEnter);
            letter.addEventListener('mouseleave', handleMouseLeave);
        });
        
        return () => {
            letters.forEach(letter => {
                letter.removeEventListener('mouseenter', handleMouseEnter);
                letter.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [currentIndex]); // Re-run when testimonial changes

    return (
        <div className="clients-review">
            <AnimatedHeading text="Our Clients thoughts" tag="h2" className="review-title" />
            <div className="review-container">
                <div className="quote-mark">
                    <img src={quotesImgLight} alt="quotes" className="quote-light" />
                    <img src={quotesImgDark} alt="quotes" className="quote-dark" />
                </div>
                <div className="review-content-wrapper">
                    <button className="nav-arrow nav-arrow-left" onClick={goToPrevious}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <div className="review-text-container">
                        <p className="review-text animated-text" ref={animatedTextRef}>
                            {currentTestimonial.text.split(/(\s+)/).map((word, wordIndex) => {
                                if (word.trim() === '') {
                                    // This is a space/whitespace
                                    return <span key={wordIndex} className="word space"> </span>;
                                }
                                return (
                                    <span key={wordIndex} className="word">
                                        {word.split('').map((char, charIndex) => (
                                            <span key={charIndex} className="letter">
                                                {char}
                                            </span>
                                        ))}
                                    </span>
                                );
                            })}
                        </p>
                        <p className="review-name">{currentTestimonial.name}</p>
                    </div>
                    <button className="nav-arrow nav-arrow-right" onClick={goToNext}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default ClientsReview;