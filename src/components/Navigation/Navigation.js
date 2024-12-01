import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  
  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-wrapper">
            <span className="logo-text">
              {language === 'ta' ? 'அகராதி' : 'Aharathi'}
            </span>
            <span className="logo-tagline">
              {language === 'ta' ? 'இலக்கிய வெளி' : 'Literary Space'}
            </span>
          </div>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/works" 
            className={`nav-link ${location.pathname === '/works' ? 'active' : ''}`}
          >
            {t('navigation.works')}
          </Link>
          <Link 
            to="/books" 
            className={`nav-link ${location.pathname === '/books' ? 'active' : ''}`}
          >
            {t('navigation.books')}
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            {t('navigation.about')}
          </Link>
          <button 
            onClick={toggleLanguage}
            className="nav-lang-toggle"
            aria-label={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
          >
            {language === 'en' ? 'தமிழ்' : 'English'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation; 