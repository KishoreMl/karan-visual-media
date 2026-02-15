import React, { useState } from 'react';
import AnimatedHeading from '../../AnimatedHeading/AnimatedHeading';
import quotesImgLight from '../../../assets/images/Double_Quotes_light.png';
import quotesImgDark from '../../../assets/images/Double_Quotes_Dark.png';
import './ClientsReview.scss';

const ClientsReview = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            text: "I’m incredibly impressed with the video editing work! The attention to detail, smooth transitions, and creative touch truly brought the video to life. It exceeded my expectations, and I’m grateful for such a thoughtful gift. Highly recommend their services for anyone looking for professional and creative video editing!",
            name: "Rahul"
        },
        {
            text: "I am totally satisfied with the service and creative work of karan visual media, Thankyou, Excellent work.",
            name: "Rpm vidhyalya school"
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
                    <p className="review-text">{currentTestimonial.text}</p>
                    <button className="nav-arrow nav-arrow-right" onClick={goToNext}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <p className="review-name">{currentTestimonial.name}</p>
            </div>
        </div>
    );
};

export default ClientsReview;