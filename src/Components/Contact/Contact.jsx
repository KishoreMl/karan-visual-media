import React, { useState } from 'react';
import './Contact.scss';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Message validation (optional but add length check if provided)
        if (formData.message.trim() && formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setSubmitSuccess(true);
            setIsSubmitting(false);
            
            // Reset form after success
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                setSubmitSuccess(false);
            }, 3000);
        }, 1500);
    };

    return (
        <div className="contact-page">
            {/* Background Elements */}
            <div className="contact-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            {/* Header Section */}
            <div className="contact-header">
                <h1 className="contact-title">Get In Touch</h1>
                <p className="contact-subtitle">
                    Let's discuss your project and bring your vision to life
                </p>
            </div>

            {/* Contact Form Section */}
            <div className="contact-form-section">
                <div className="contact-container">
                    <div className="contact-info">
                        <h2 className="info-heading">Let's Create Together</h2>
                        <p className="info-text">
                            Ready to elevate your brand? Fill out the form and our team will get back to you within 24 hours.
                        </p>

                        <div className="contact-details">
                            <div className="detail-item">
                                <div className="detail-icon">📧</div>
                                <div className="detail-content">
                                    <h4>Email</h4>
                                    <p>creativeknacks@gmail.com</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">📞</div>
                                <div className="detail-content">
                                    <h4>Phone</h4>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">📍</div>
                                <div className="detail-content">
                                    <h4>Location</h4>
                                    <p>Coimbatore, Tamil Nadu,India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            {submitSuccess && (
                                <div className="success-message">
                                    <span className="success-icon">✓</span>
                                    <p>Thank you! We'll get back to you soon.</p>
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`form-input ${errors.name ? 'error' : ''}`}
                                    placeholder="Your full name"
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    Phone Number <span className="required">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`form-input ${errors.phone ? 'error' : ''}`}
                                    placeholder="+1 (555) 123-4567"
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    Message <span className="optional">(Optional)</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    placeholder="Tell us about your project..."
                                    rows="5"
                                ></textarea>
                                {errors.message && <span className="error-message">{errors.message}</span>}
                            </div>

                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                <span className="button-arrow">→</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

