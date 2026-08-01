/**
 * Main Application Entry Point
 * Imports and initializes all modules
 */

import { initMobileMenu } from './menu.js';
import { initStickyHeader, initSmoothScroll, initBackToTop } from './scroll.js';

/**
 * Reveal sections as they scroll into view
 */
function initScrollReveal() {
  // Exclude .presentation (above-the-fold hero) — it must always be visible
  const revealEls = document.querySelectorAll(
    '.about-me, .skills-habilities, .education, .projects, .contact-cta'
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
}

/**
 * Initialize all application modules
 */
function init() {
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
  initScrollReveal();
  initBackToTop();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
