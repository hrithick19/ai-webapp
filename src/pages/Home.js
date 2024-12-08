import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { homeApi } from '../services/api';
import { formatDate } from '../utils/formatters';
import Hero from '../components/home/Hero';
import './Home.css';

function Home() {
  const { t, language } = useLanguage();
  const [featuredWorks, setFeaturedWorks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const [worksResponse, booksResponse] = await Promise.all([
          homeApi.getFeaturedWorks(),
          homeApi.getLatestBooks()
        ]);
        
        setFeaturedWorks(worksResponse.data);
        setLatestBooks(booksResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError(t('errors.failedToLoad'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, [t]);

  // Prepare structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Aharathi",
    "url": "https://aharathi.com",
    "description": t('home.description'),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aharathi.in?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>அகராதி | Aharathi</title>
        <meta name="description" content={t('home.description')} />
        <meta name="keywords" content="Aharathi, அகராதி, Tamil literature, featured works, latest books" />
        <meta name="author" content="Aharathi, அகராதி" />
        <link rel="canonical" href="https://aharathi.in/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Hero />
      
      {/* Featured Works Section */}
      <section className="featured-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t('home.featured.sectionLabel')}</span>
          <h2>{t('home.featured.title')}</h2>
          <p>{t('home.featured.description')}</p>
        </motion.div>

        {isLoading ? (
          <div className="featured-loading">
            <div className="featured-loading-spinner" />
            <p>{t('loading')}</p>
          </div>
        ) : error ? (
          <div className="featured-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              {t('tryAgain')}
            </button>
          </div>
        ) : (
          <div className="featured-grid">
            {featuredWorks.map((work, index) => (
              <motion.article 
                key={work.id}
                className="featured-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <span className="category-tag">
                  {t(`works.categories.${work.category}`)}
                </span>
                <h3>{work.title}</h3>
                <p>{work.excerpt}</p>
                <div className="card-meta">
                  <span>{formatDate(work.publication_date, language)}</span>
                  <span className="meta-divider">•</span>
                  <span>{work.reading_time} {t('common.minuteRead')}</span>
                </div>
                <a href={`/works/${work.id}`} className="read-more">
                  {t('home.featured.readMore')} <span>→</span>
                </a>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Latest Books Section */}
      <section className="books-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">{t('home.latestBooks.sectionLabel')}</span>
          <h2>{t('home.latestBooks.title')}</h2>
          <p>{t('home.latestBooks.description')}</p>
        </motion.div>

        <div className="books-grid">
          {latestBooks.map((book, index) => (
            <motion.div 
              key={book.id}
              className="book-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="book-cover-wrapper">
                <img src={book.image} alt={book.title} className="book-cover" />
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <div className="book-meta">
                  <span>{book.releaseDate}</span>
                  <span className="meta-divider">•</span>
                  <span>{book.pages} {t('home.latestBooks.pages')}</span>
                </div>
                <a href={`/books/${book.id}`} className="read-more">
                  {t('home.latestBooks.viewDetails')} <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;