import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { workApi } from '../services/api';
import { formatCategory, formatDate } from '../utils/formatters';
import './ArticlePage.css';

function ArticlePage() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await workApi.getById(id);
        setWork(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching work:', err);
        setError('Failed to load the content');
        setLoading(false);
      }
    };

    fetchWork();
  }, [id]);

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading... | Your Site Name</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="article-page-loading-container">
          <div className="article-page-loading-spinner"></div>
          <p>Loading content...</p>
        </div>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <Helmet>
          <title>Error | Your Site Name</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="article-page-error-container">
          <div className="article-page-error-icon">!</div>
          <p>{error}</p>
          <Link to="/works" className="article-page-error-back-link">Return to Works</Link>
        </div>
      </>
    );
  }

  if (!work) return (
    <>
      <Helmet>
        <title>Content Not Found | Your Site Name</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="article-page-error-container">Content not found</div>
    </>
  );

  const imageAspectRatio = imageDimensions 
    ? imageDimensions.width / imageDimensions.height 
    : null;

  // Create clean excerpt for meta description
  const metaDescription = work.excerpt?.slice(0, 155) || work.title;
  const canonicalUrl = `${window.location.origin}/works/${id}`;
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": work.title,
    "description": metaDescription,
    "image": work.featured_image ? `${window.location.origin}${work.featured_image}` : undefined,
    "datePublished": work.publication_date,
    "dateModified": work.updated_at,
    "author": {
      "@type": "Person",
      "name": "Your Name"
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${work.title} | Your Site Name`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={work.title} />
        <meta property="og:description" content={metaDescription} />
        {work.featured_image && (
          <meta property="og:image" content={`${window.location.origin}${work.featured_image}`} />
        )}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={work.title} />
        <meta name="twitter:description" content={metaDescription} />
        {work.featured_image && (
          <meta name="twitter:image" content={`${window.location.origin}${work.featured_image}`} />
        )}

        {/* Article specific meta tags */}
        <meta property="article:published_time" content={work.publication_date} />
        <meta property="article:modified_time" content={work.updated_at} />
        <meta property="article:section" content={formatCategory(work.category)} />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      </Helmet>

      <article className="article-page-container" itemScope itemType="https://schema.org/Article">
        <nav className="article-page-nav">
          <Link to="/works" className="article-page-back-link">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5m7 7l-7-7 7-7" />
            </svg>
            <span>Back to Works</span>
          </Link>
        </nav>

        <div className="article-page-work">
          <header className="article-page-header">
            <div className="article-page-meta">
              {work.category && (
                <span className="article-page-category-badge" itemProp="articleSection">
                  {formatCategory(work.category)}
                </span>
              )}
              <time 
                dateTime={work.publication_date} 
                itemProp="datePublished"
              >
                {formatDate(work.publication_date)}
              </time>
              {work.reading_time && (
                <span className="article-page-reading-time">
                  {work.reading_time} min read
                </span>
              )}
            </div>
            
            <h1 className="article-page-title" itemProp="headline">{work.title}</h1>
            {work.subtitle && (
              <h2 className="article-page-subtitle" itemProp="alternativeHeadline">
                {work.subtitle}
              </h2>
            )}
          </header>

          <div className="article-page-body">
            {work.featured_image && (
              <figure 
                className={`article-page-image ${imageLoaded ? 'loaded' : ''}`}
                style={imageAspectRatio ? {
                  '--aspect-ratio': imageAspectRatio
                } : undefined}
                itemProp="image"
              >
                <img 
                  src={work.featured_image} 
                  alt={work.title}
                  loading="lazy"
                  onLoad={handleImageLoad}
                />
              </figure>
            )}

            <div 
              className="article-page-content"
              dangerouslySetInnerHTML={{ __html: work.description }}
              itemProp="articleBody"
            />
          </div>
        </div>
      </article>
    </>
  );
}

export default ArticlePage; 