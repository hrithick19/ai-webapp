import { motion } from 'framer-motion';
import './Hero.css';
import { useLanguage } from '../../contexts/LanguageContext';
import { getContent } from '../../config/content';

function Hero() {
  const { t } = useLanguage();
  const content = getContent();

  return (
    <section className="hero-section">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1>
            <span className="greeting">{t('home.hero.greeting')}</span>
            <br />
            {t('home.hero.title')}
          </h1>
          <p className="hero-subtitle">
            {t('home.hero.subtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          className="hero-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a href={content.hero.ctaLink} className="primary-button">
            {t('home.hero.cta')}
            <span className="button-icon">→</span>
          </a>
          <a href="/about" className="outline-button">
            {t('navigation.about')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;