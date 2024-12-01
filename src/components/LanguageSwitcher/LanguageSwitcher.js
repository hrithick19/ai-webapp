import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ta' ? 'en' : 'ta';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      className="language-switcher"
      onClick={toggleLanguage}
    >
      {i18n.language === 'ta' ? 'English' : 'தமிழ்'}
    </button>
  );
}

export default LanguageSwitcher; 