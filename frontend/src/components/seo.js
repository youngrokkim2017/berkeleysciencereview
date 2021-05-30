import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import coverImage from "../images/coverImage.jpeg"

const Seo = ({ title, author, description, path, image }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          author
          description
          siteUrl
        }
      }
    }
  `);

  const defaults = data.site.siteMetadata;

  if (defaults.siteUrl === '' && typeof window !== 'undefined') {
    defaults.siteUrl = window.location.origin;
  }

  if (defaults.siteUrl === '') {
    console.error('Please set a siteUrl in your site metadata!');
    return null;
  }

  const metaTitle = title || defaults.title;
  const metaAuthor = author || defaults.author;
  const metaDescription = description || defaults.description;
  const url = new URL(path || '', defaults.siteUrl);
  const metaImage = image ? new URL(image, defaults.siteUrl) : new URL(coverImage, defaults.siteUrl);

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={metaDescription} />
      {metaImage && <meta name="image" content={metaImage} />}

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      {metaImage && <meta property="og:image" content={metaImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={metaAuthor} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}
    </Helmet>
  );
};

export default Seo;