import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationTA from './locales/ta/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  ta: {
    translation: translationTA
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ta', // Tamil as fallback
    lng: 'ta', // Tamil as default
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 