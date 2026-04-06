import { useEffect } from 'react';

const BASE_URL = 'https://georankers.co';

const HOMEPAGE_DEFAULTS = {
  title: 'GeoRankers - AI Search Intelligence Platform for B2B SaaS Companies',
  description:
    'GeoRankers is the definitive AI search optimization platform that helps B2B SaaS companies track, optimize, and build brand authority to get visible in AI search across ChatGPT, Gemini, Perplexity, and Claude.',
  canonical: `${BASE_URL}/`,
  ogTitle: 'GeoRankers - AI Search Intelligence Platform',
  ogDescription:
    'The definitive AI search optimization platform for B2B SaaS companies. Track and optimize your brand visibility across ChatGPT, Gemini, Perplexity, and Claude.',
  ogUrl: `${BASE_URL}/`,
};

export interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  schemaId?: string;
  schema?: object;
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    const [attrName, attrValue] = selector
      .replace(/[\[\]'"]/g, ' ')
      .trim()
      .split(/\s+/);
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, value: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', value);
}

function injectSchema(id: string, schema: object) {
  let el = document.querySelector(`script[type="application/ld+json"]#${id}`);
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('id', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema, null, 2);
}

function removeSchema(id: string) {
  const el = document.querySelector(`script[type="application/ld+json"]#${id}`);
  if (el) el.remove();
}

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    const {
      title,
      description,
      canonical,
      ogTitle,
      ogDescription,
      ogUrl,
      schemaId,
      schema,
    } = config;

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setLink('canonical', canonical);
    setMeta('meta[property="og:title"]', 'content', ogTitle ?? title);
    setMeta('meta[property="og:description"]', 'content', ogDescription ?? description);
    setMeta('meta[property="og:url"]', 'content', ogUrl ?? canonical);
    setMeta('meta[property="twitter:url"]', 'content', ogUrl ?? canonical);
    setMeta('meta[property="twitter:title"]', 'content', ogTitle ?? title);
    setMeta('meta[property="twitter:description"]', 'content', ogDescription ?? description);

    if (schemaId && schema) {
      injectSchema(schemaId, schema);
    }

    return () => {
      // Restore homepage defaults when leaving the page
      document.title = HOMEPAGE_DEFAULTS.title;
      setMeta('meta[name="description"]', 'content', HOMEPAGE_DEFAULTS.description);
      setLink('canonical', HOMEPAGE_DEFAULTS.canonical);
      setMeta('meta[property="og:title"]', 'content', HOMEPAGE_DEFAULTS.ogTitle);
      setMeta('meta[property="og:description"]', 'content', HOMEPAGE_DEFAULTS.ogDescription);
      setMeta('meta[property="og:url"]', 'content', HOMEPAGE_DEFAULTS.ogUrl);
      setMeta('meta[property="twitter:url"]', 'content', HOMEPAGE_DEFAULTS.ogUrl);
      setMeta('meta[property="twitter:title"]', 'content', HOMEPAGE_DEFAULTS.ogTitle);
      setMeta('meta[property="twitter:description"]', 'content', HOMEPAGE_DEFAULTS.ogDescription);
      if (schemaId) {
        removeSchema(schemaId);
      }
    };
  }, []);
}
