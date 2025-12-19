# Internationalization (i18n) Guide

This portfolio supports both English and Spanish. The language switching system uses localStorage to persist the user's language preference.

## How It Works

### Language Files

Translation files are stored in `src/i18n/`:
- `en.json` - English translations
- `es.json` - Spanish translations
- `utils.ts` - Helper functions for i18n

### Components with i18n

Components use the `data-i18n` attribute to mark translatable content:

```astro
<span data-i18n="hero.greeting">{t.hero.greeting}</span>
```

### Language Switcher

The `LanguageSwitcher` component is included in the header and allows users to toggle between English and Spanish. The selection is persisted in localStorage.

### Adding New Translations

1. Add the translation key to both `en.json` and `es.json`
2. Use `data-i18n` attribute in your component
3. Add client-side script to update on language change:

```astro
<script>
  import en from '../i18n/en.json';
  import es from '../i18n/es.json';

  const translations: any = { en, es };

  function updateContent() {
    const lang = localStorage.getItem('lang') || 'en';
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = getTranslation(key, lang);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', updateContent);
  window.addEventListener('languagechange', updateContent);
</script>
```

### Components Updated

The following components have been updated with i18n support:
- ✅ Header (navigation menu)
- ✅ Hero (greeting, role, CTA button)
- ⏳ About (pending)
- ⏳ Skills (pending)
- ⏳ Education (pending)
- ⏳ Projects (pending)
- ⏳ Contact CTA (pending)
- ⏳ Footer (pending)

## Next Steps

To complete the i18n implementation:

1. Update remaining components (About, Skills, Education, Projects, Contact CTA, Footer)
2. Add specific translations for project descriptions in `projects.ts`
3. Test all components in both languages
4. Consider adding URL-based routing (`/en/` and `/es/`) if needed

## Translation Structure

```json
{
  "hero": {
    "greeting": "Hi There, I'm",
    "name": "David Manjarres",
    "role": "I am into Backend Development",
    "cta": "About Me"
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "skills": "Skills",
    "education": "Education",
    "projects": "Projects"
  }
}
```
