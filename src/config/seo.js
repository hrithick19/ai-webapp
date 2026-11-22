export const SITE_NAME = 'Aharathi';
export const SITE_URL = 'https://aharathi.in';

// Tamil remains on the existing unprefixed URLs; English uses the /en prefix.
export const DEFAULT_LANGUAGE = 'ta';
export const LANGUAGE_PREFIXES = Object.freeze({
  ta: '',
  en: '/en',
});

export const localizedPath = (language, pathname = '/') => {
  const prefix = LANGUAGE_PREFIXES[language] ?? LANGUAGE_PREFIXES[DEFAULT_LANGUAGE];
  const path = pathname === '/'
    ? ''
    : `/${pathname.replace(/^\/+|\/+$/g, '')}`;

  return `${prefix}${path}` || '/';
};

export const workPath = (language, slug) =>
  `${localizedPath(language, '/works')}/${encodeURIComponent(slug)}`;

export const bookPath = (language, slug) =>
  `${localizedPath(language, '/books')}/${encodeURIComponent(slug)}`;
