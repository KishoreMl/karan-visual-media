import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { COMPANY_EMAIL } from '../../utils/constants';
import { emailConfig } from '../../utils/emailConfig';
import './Contact.scss';

const Contact = () => {
    const [formData, setFormData] = useState({
        client_name: '',
        client_email: '',
        client_phone: '',
        service: '',
        description: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess] = useState(false);

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
        const data = formData();

        if (!validateForm()) {
            return;
        }
        setIsSubmitting(true);

        try {
            const templateParams = {
                client_name: data.client_name,
                client_email: data.client_email,
                client_phone: data.client_phone,
                service: data.service,
                description: data.description,
                email: COMPANY_EMAIL
            };

            // Send email
            await emailjs.send(emailConfig.serviceId, emailConfig.templateId, templateParams, emailConfig.publicKey);
            
            // Success
            // props.onToast?.('Success!', 'success', 'Thank you! We have received your request and will contact you soon.');
            
            // Reset form
            setFormData({
                client_name: '',
                client_email: '',
                client_phone: '',
                service: '',
                description: ''
            });
        } catch (error) {
            console.error('Email sending failed:', error);
            // props.onToast?.('Error', 'error', 'Failed to send your request. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <div className="contact-page">

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

