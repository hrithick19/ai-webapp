import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { contactApi } from '../services/api';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactApi.send(formData);
      setStatus('success');
      setFormData({ name: '', email: '', category: 'general', message: '' });
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact | Aharathi</title>
        <meta name="description" content="Get in touch for literary events, book signings, or general inquiries." />
      </Helmet>

      <div className="contact-container">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p className="subtitle">
            For literary events, book signings, or general inquiries
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-form-section">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Inquiry Type</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="event">Literary Event</option>
                  <option value="signing">Book Signing</option>
                  <option value="media">Media Request</option>
                  <option value="rights">Rights & Permissions</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="alert success">
                  Thank you for your message. I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="alert error">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>

          <div className="contact-info-section">
            <div className="contact-info-card">
              <h2>Literary Agent</h2>
              <div className="info-items">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <p>Agent Name</p>
                </div>
                <div className="info-item">
                  <span className="info-label">Agency</span>
                  <p>Agency Name</p>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <a href="mailto:agent@agency.com">agent@agency.com</a>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <h2>Publicity</h2>
              <div className="info-items">
                <div className="info-item">
                  <span className="info-label">Publisher</span>
                  <p>Publisher Name</p>
                </div>
                <div className="info-item">
                  <span className="info-label">Publicist</span>
                  <p>Publicist Name</p>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <a href="mailto:publicity@publisher.com">publicity@publisher.com</a>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Me</h3>
              <div className="social-grid">
                <a href="#" className="social-link">Goodreads</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;