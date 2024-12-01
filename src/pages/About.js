import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import './About.css';

function About() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('about.pageTitle')} | {t('siteName')}</title>
        <meta name="description" content={t('about.pageDescription')} />
      </Helmet>

      <div className="about-page-container">
        <header className="about-page-hero">
          <motion.div 
            className="about-page-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="about-page-label">{t('about.label')}</span>
            <h1 className="about-page-title">{t('about.title')}</h1>
            <p className="about-page-subtitle">{t('about.subtitle')}</p>
          </motion.div>
        </header>

        <section className="about-page-content">
          <motion.div 
            className="about-page-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="about-page-bio-text">
              <p>{t('about.bio.text1')}</p>
              <p>{t('about.bio.text2')}</p>
            </div>
          </motion.div>

          <motion.div 
            className="about-page-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="about-page-stat-card">
              <span className="about-page-stat-number">10+</span>
              <span className="about-page-stat-label">{t('about.stats.years')}</span>
            </div>
            <div className="about-page-stat-card">
              <span className="about-page-stat-number">50+</span>
              <span className="about-page-stat-label">{t('about.stats.works')}</span>
            </div>
            <div className="about-page-stat-card">
              <span className="about-page-stat-number">5</span>
              <span className="about-page-stat-label">{t('about.stats.books')}</span>
            </div>
          </motion.div>

          <motion.div 
            className="about-page-recognition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2>{t('about.recognition.title')}</h2>
            <div className="about-page-awards">
              {t('about.recognition.awards', { returnObjects: true }).map((award, index) => (
                <div key={index} className="about-page-award-item">
                  <span className="about-page-award-year">{award.year}</span>
                  <div className="about-page-award-details">
                    <h3>{award.title}</h3>
                    <p>{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default About; 