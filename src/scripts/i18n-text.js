/**
 * Generic translations for newer markup: [data-t] sets textContent, [data-t-placeholder] sets
 * placeholder. Older components keep their own data-i18n handlers; data-t never collides with them.
 */
import en from '../i18n/en.json';
import es from '../i18n/es.json';

const dict = { en, es };
const lookup = (lang, key) => key.split('.').reduce((v, k) => v?.[k], dict[lang]) ?? key.split('.').reduce((v, k) => v?.[k], en);

export function applyTextTranslations() {
  let lang = 'en';
  try { lang = localStorage.getItem('lang') || 'en'; } catch {}
  document.querySelectorAll('[data-t]').forEach((el) => {
    const v = lookup(lang, el.dataset.t);
    if (typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('[data-t-placeholder]').forEach((el) => {
    const v = lookup(lang, el.dataset.tPlaceholder);
    if (typeof v === 'string') el.placeholder = v;
  });
}

export function initTextTranslations() {
  applyTextTranslations();
  window.addEventListener('languagechange', applyTextTranslations);
}
