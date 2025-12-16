import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../../utils/emailConfig';
import AnimatedHeading from '../AnimatedHeading/AnimatedHeading';
import './Contact.scss';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

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
        setSubmitError(false);

        try {
            const templateParams = {
                client_name: formData.name,
                client_email: formData.email,
                client_phone: formData.phone,
                service: formData.service,
                description: formData.message,
                email: emailConfig.recipientEmail
            };

            // Send email
            await emailjs.send(emailConfig.serviceId, emailConfig.templateId, templateParams, emailConfig.publicKey);
            
            // Success
            setSubmitSuccess(true);
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: ''
            });

            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            console.error('Email sending failed:', error);
            setSubmitError(true);
            setTimeout(() => setSubmitError(false), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page">

            <div className="contact-header">
                <AnimatedHeading text="Get In Touch" tag="h1" className="contact-title centered" />
                <p className="contact-subtitle">
                    Let's discuss your project and bring your vision to life
                </p>
            </div>

            <div className="contact-form-section">
                <div className="contact-container">
                    <div className="contact-info">
                        <h2 className="info-heading">Let's Create Together</h2>
                        <p className="info-text">
                            Ready to elevate your brand? Fill out the form and our team will get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
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
                                <label htmlFor="service" className="form-label">
                                    Service <span className="optional">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="e.g., Branding, Animation, VFX, Web Development"
                                />
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

            {submitSuccess && (
                <div className="toast toast-success">
                    <span className="toast-icon">✓</span>
                    <p>Thank you! We'll get back to you soon.</p>
                </div>
            )}

            {submitError && (
                <div className="toast toast-error">
                    <span className="toast-icon">✕</span>
                    <p>Failed to send message. Please try again.</p>
                </div>
            )}
        </div>
    );
};

export default Contact;

