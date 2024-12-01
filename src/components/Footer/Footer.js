import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">{t('footer.sections.about.title')}</h3>
          <p className="footer-description">{t('footer.sections.about.description')}</p>
        </div>

        <div className="footer-section">
          <h3>{t('footer.sections.quickLinks.title')}</h3>
          <nav className="footer-links">
            <Link to="/">{t('footer.sections.quickLinks.home')}</Link>
            <Link to="/works">{t('footer.sections.quickLinks.works')}</Link>
            <Link to="/books">{t('footer.sections.quickLinks.books')}</Link>
            <Link to="/about">{t('footer.sections.quickLinks.about')}</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h3>{t('footer.sections.connect.title')}</h3>
          <div className="footer-social social-links">
            <a href="mailto:contact@example.com">
              {t('footer.sections.connect.email')}
            </a>
            <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
              {t('footer.sections.connect.twitter')}
            </a>
            <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">
              {t('footer.sections.connect.instagram')}
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>{t('footer.newsletter.title')}</h3>
          <p>{t('footer.newsletter.description')}</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder={t('footer.newsletter.placeholder')}
              aria-label={t('footer.newsletter.placeholder')}
            />
            <button type="submit">
              {t('footer.newsletter.button')}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          {t('footer.copyright.text')} {t('footer.copyright.rights')}
        </p>
      </div>
    </footer>
  );
}

export default Footer; 