import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'OneHaat — Your Trusted Store, Now at Your Doorstep';
const DEFAULT_DESCRIPTION =
  'OneHaat connects you to verified neighborhood grocery stores, authentic spice mills, and daily haats in Bengaluru with zero dark-store markup and 9 min 59 sec delivery.';
const DEFAULT_CANONICAL = 'https://[YOURDOMAIN.com]/';
const DEFAULT_OG_IMAGE = 'https://[YOURDOMAIN.com]/logo.png';

/**
 * Reusable SEO component for managing document head metadata,
 * Open Graph, Twitter Cards, canonical URLs, and structured data.
 */
export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical = DEFAULT_CANONICAL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  structuredData,
}) => {
  useEffect(() => {
    // 1. Update document title
    if (title) {
      document.title = title;
    }

    // Helper to update or create meta tags
    const updateMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // 4. Open Graph Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'OneHaat');
    updateMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN');

    // 5. Twitter Card Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 6. Optional runtime JSON-LD structured data injection
    if (structuredData) {
      let script = document.getElementById('runtime-jsonld') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = 'runtime-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, canonical, ogImage, ogType, noindex, structuredData]);

  return null;
};

export default SEO;
