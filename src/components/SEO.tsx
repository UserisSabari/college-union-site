import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = "Official website of the 2026-27 College Union of Government Engineering College Sreekrishnapuram Palakkad (GEC Palakkad, also known as GEC Sreekrishnapuram, GEC SKP, GECPKD, GECP). Explore announcements, events, and initiatives, or share feedback. College website: gecskp.ac.in.",
  ogImage = "https://collegeunion.gecskp.ac.in/assets/og-image.jpg",
  canonicalUrl,
  type = "website",
}) => {
  const { pathname } = useLocation();
  const baseTitle = "College Union 2026-27 | GEC Palakkad";
  const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} — Official Website`;
  const siteUrl = "https://collegeunion.gecskp.ac.in";
  const href = canonicalUrl || `${siteUrl}${pathname}`;

  return (
    <Helmet>
      {/* General Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="College Union, GEC Palakkad, Government Engineering College Sreekrishnapuram Palakkad, GEC Sreekrishnapuram, GEC SKP, GECPKD, GECP, Union 2026-27, college union website, gecskp.ac.in, collegeunion.gecskp.ac.in" />
      <link rel="canonical" href={href} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={href} />
      <meta property="og:site_name" content="GEC Palakkad College Union" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
