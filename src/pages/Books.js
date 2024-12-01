import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { bookApi } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import './Books.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [featuredBook, setFeaturedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await bookApi.getAll();
        const allBooks = response.data;
        
        if (allBooks.length > 0) {
          setFeaturedBook(allBooks[0]);
          setBooks(allBooks.slice(1));
        }
      } catch (err) {
        setError(t('errors.failedToLoad'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [t]);

  if (isLoading) {
    return (
      <div className="books-page-loading-state">
        <div className="books-page-loading-spinner" />
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="books-page-error-state">
        <div className="books-page-error-icon">!</div>
        <h3>{error}</h3>
        <button onClick={() => window.location.reload()} className="books-page-retry-button">
          {t('tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('books.pageTitle')} | {t('siteName')}</title>
        <meta name="description" content={t('books.pageDescription')} />
      </Helmet>

      <div className="books-page-container">
        <header className="books-page-hero">
          <div className="books-page-hero-content">
            <h1 className="books-page-hero-title">
              {t('books.heroTitle')} <span className="accent">{t('books.heroTitleAccent')}</span>
            </h1>
            <p className="books-page-hero-subtitle">
              {t('books.heroSubtitle')}
            </p>
          </div>
        </header>

        {featuredBook && (
          <section className="books-page-featured">
            <div className="books-page-featured-label">{t('books.latestRelease')}</div>
            <article className="books-page-featured-card">
              <div className="books-page-featured-cover">
                <img 
                  src={featuredBook.image} 
                  alt={featuredBook.title} 
                  loading="lazy"
                />
              </div>
              <div className="books-page-featured-content">
                <h2 className="books-page-featured-title">
                  {language === 'en' ? featuredBook.title_en || featuredBook.title : featuredBook.title}
                </h2>
                {featuredBook.subtitle && (
                  <p className="books-page-featured-subtitle">
                    {language === 'en' ? featuredBook.subtitle_en || featuredBook.subtitle : featuredBook.subtitle}
                  </p>
                )}
                <p className="books-page-featured-description">
                  {language === 'en' ? featuredBook.description_en || featuredBook.description : featuredBook.description}
                </p>
                <div className="books-page-featured-meta">
                  <span className="books-page-featured-price">
                    ₹{featuredBook.price}
                  </span>
                  <span className="books-page-featured-author">{featuredBook.author}</span>
                </div>
                <div className="books-page-featured-stores">
                  {featuredBook.store_links && featuredBook.store_links.map((storeLink) => (
                    <a
                      key={storeLink.store.id}
                      href={storeLink.purchase_url}
                      className="books-page-store-link featured"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="store-link-content">
                        {storeLink.store.logo && (
                          <img 
                            src={storeLink.store.logo} 
                            alt={storeLink.store.name} 
                            className="books-page-store-logo" 
                          />
                        )}
                        <span className="store-name">
                          {t('books.buyOn')} {storeLink.store.name}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          </section>
        )}

        <section className="books-page-collection">
          <h2 className="books-page-collection-title">{t('books.moreBooks')}</h2>
          <div className="books-page-grid">
            {books.map((book) => (
              <article key={book.id} className="books-page-card">
                <div className="books-page-card-cover">
                  <img src={book.image} alt={book.title} loading="lazy" />
                </div>
                <div className="books-page-card-content">
                  <h3 className="books-page-card-title">
                    {language === 'en' ? book.title_en || book.title : book.title}
                  </h3>
                  {book.subtitle && (
                    <p className="books-page-card-subtitle">
                      {language === 'en' ? book.subtitle_en || book.subtitle : book.subtitle}
                    </p>
                  )}
                  <div className="books-page-card-meta">
                    <span className="books-page-card-price">₹{book.price}</span>
                    <span className="books-page-card-author">{book.author}</span>
                  </div>
                  <div className="books-page-card-stores">
                    {book.store_links && book.store_links.map((storeLink) => (
                      <a
                        key={storeLink.store.id}
                        href={storeLink.purchase_url}
                        className="books-page-store-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="store-link-content">
                          {storeLink.store.logo && (
                            <img 
                              src={storeLink.store.logo} 
                              alt={storeLink.store.name} 
                              className="books-page-store-logo" 
                            />
                          )}
                          <span className="store-name">
                            {t('books.buyOn')} {storeLink.store.name}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Books;