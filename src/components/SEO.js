import { Helmet } from 'react-helmet-async';

function SEO({ title, description, image }) {
  return (
    <Helmet>
      <title>{title} | Writer's Portfolio</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}

export default SEO; 