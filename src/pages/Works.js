import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { workApi } from '../services/api';
import { getCategoryIcon } from '../utils/categoryIcons';
import { formatCategory, formatDate } from '../utils/formatters';
import { useLanguage } from '../contexts/LanguageContext';
import './Works.css';

function Works() {
  const [works, setWorks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredWork, setFeaturedWork] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setIsLoading(true);
        const response = await workApi.getAll();
        const allWorks = response.data;
        
        const featured = allWorks.find(work => work.is_featured);
        if (featured) {
          setFeaturedWork(featured);
          setWorks(allWorks.filter(work => work.id !== featured.id));
        } else {
          setWorks(allWorks);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching works:', err);
        setError(t('errors.failedToLoad'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorks();
  }, [t]);

  const filteredWorks = selectedCategory === 'all' 
    ? works 
    : works.filter(work => work.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="works-loading-state">
        <div className="works-loading-spinner" />
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="works-error-state">
        <div className="works-error-icon">!</div>
        <h3>{error}</h3>
        <button onClick={() => window.location.reload()} className="works-retry-button">
          {t('tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('works.pageTitle')} | {t('siteName')}</title>
        <meta name="description" content={t('works.pageDescription')} />
      </Helmet>

      <div className="works-page">
        <header className="works-hero">
          <div className="works-hero-content">
            <h1 className="works-hero-title">
              {t('works.heroTitle')} <span className="accent">{t('works.heroTitleAccent')}</span>
            </h1>
            <p className="works-hero-subtitle">{t('works.heroSubtitle')}</p>
          </div>
        </header>

        {featuredWork && (
          <section className="works-featured">
            <div className="works-featured-label">{t('works.featuredWork')}</div>
            <article className="works-featured-card">
              {featuredWork.featured_image && (
                <div className="works-featured-image">
                  <img 
                    src={featuredWork.featured_image} 
                    alt={featuredWork.title} 
                    loading="lazy"
                  />
                </div>
              )}
              <div className="works-featured-content">
                <div className="works-featured-meta">
                  <span className="works-featured-category">
                    {t(`works.categories.${featuredWork.category}`)}
                  </span>
                  <time dateTime={featuredWork.publication_date}>
                    {formatDate(featuredWork.publication_date)}
                  </time>
                </div>
                <h2 className="works-featured-title">{featuredWork.title}</h2>
                {featuredWork.subtitle && (
                  <p className="works-featured-subtitle">{featuredWork.subtitle}</p>
                )}
                <p className="works-featured-excerpt">{featuredWork.excerpt}</p>
                <Link 
                  to={`/works/${featuredWork.id}`}
                  className="works-featured-link"
                >
                  {t('works.readFullArticle')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
          </section>
        )}

        <section className="works-main">
          <div className="works-filters">
            <div className="works-filters-header">
              <h2 className="works-filters-title">{t('works.browseByCategory')}</h2>
            </div>
            <div className="works-filters-buttons">
              <button 
                className={`works-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                {t('works.categories.all')}
              </button>
              {['POEM', 'SHORT_STORY', 'ESSAY'].map((category) => (
                <button
                  key={category}
                  className={`works-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {t(`works.categories.${category}`)}
                  <span className="works-filter-count">
                    {works.filter(work => work.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {filteredWorks.length === 0 ? (
            <div className="works-empty">
              <div className="works-empty-icon">
                {getCategoryIcon(selectedCategory)}
              </div>
              <h3>{t('works.noWorksFound')}</h3>
              <p>
                {selectedCategory === 'all' 
                  ? t('works.noWorksInCategory')
                  : t('works.noWorksInCategory', { category: t(`works.categories.${selectedCategory}`) })
                }
              </p>
              {selectedCategory !== 'all' && (
                <button 
                  className="works-empty-button"
                  onClick={() => setSelectedCategory('all')}
                >
                  {t('works.viewAllWorks')}
                </button>
              )}
            </div>
          ) : (
            <div className="works-grid">
              {filteredWorks.map((work) => (
                <article key={work.id} className="works-card">
                  <Link to={`/works/${work.id}`} className="works-card-link">
                    <div className="works-card-image">
                      {work.featured_image ? (
                        <img src={work.featured_image} alt={work.title} loading="lazy" />
                      ) : (
                        <div className="works-card-placeholder">
                          {getCategoryIcon(work.category)}
                        </div>
                      )}
                    </div>
                    <div className="works-card-content">
                      <div className="works-card-meta">
                        <span className="works-card-category">
                          {t(`works.categories.${work.category}`)}
                        </span>
                        {work.reading_time && (
                          <span className="works-card-reading-time">
                            {work.reading_time} {t('common.minuteRead')}
                          </span>
                        )}
                      </div>
                      <h3 className="works-card-title">{work.title}</h3>
                      <p className="works-card-excerpt">{work.excerpt}</p>
                      <div className="works-card-footer">
                        <time dateTime={work.publication_date}>
                          {formatDate(work.publication_date)}
                        </time>
                        <span className="works-card-read-more">
                          {t('works.readMore')}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14m-6-6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Works;