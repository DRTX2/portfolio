# Portfolio (Astro)

Static site deployed to GitHub Pages by `.github/workflows` on every push to `main` (base path `/portfolio/` in production, `/` in dev).

## Commands
- `pnpm dev --port 4321` → http://127.0.0.1:4321/
- `pnpm build` (must pass before pushing)

## Where things are
- Project data: `src/data/projects.ts` (English source). Translations: `src/i18n/en.json` / `es.json` under `projects.items.<slug>`; text is swapped client-side on the `languagechange` event (`data-i18n` legacy handlers, `data-t` generic helper in `src/scripts/i18n-text.js`).
- Project pages: `src/pages/projects/[slug].astro` (one per project, same data). The "Atalaya in action" diagram (`src/components/AtalayaFlow.astro`) is only on Atalaya's page.
- Motion: `public/animations.js` (reveals, hero, Lenis smooth scroll, contact handoff, Atalaya diagram player) + `src/styles/components/_motion.scss`. Everything has a reduced-motion path.
- Reviewer checklist and canonical texts: `docs/PORTFOLIO_CHECKLIST.md`.

## Traps already hit
- Build every internal link from `import.meta.env.BASE_URL`; a bare `/…` link works in dev and breaks on Pages.
- `html { scroll-behavior: smooth }` broke ScrollTrigger measurements; with motion on it is `auto` (Lenis smooths instead). Triggers are re-measured when the page height changes.
- The featured card image box is portrait (~0.73): covers are designed for that aspect.
- Icon CDNs: devicon is pinned to v2.17.0; simpleicons has no AWS logos.
- The Astro dev toolbar injects extra `h1`/`input` elements: scope browser checks to page selectors.
- No contact form (FormSubmit went down); contact is LinkedIn, GitHub and email.
