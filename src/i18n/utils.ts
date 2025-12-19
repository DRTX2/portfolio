import en from './en.json';
import es from './es.json';

export const languages = {
  en: 'English',
  es: 'Español'
};

export const defaultLang = 'en';

export const translations = {
  en,
  es
};

export function useTranslations(lang: keyof typeof translations = defaultLang) {
  return translations[lang] || translations[defaultLang];
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLang;
}
