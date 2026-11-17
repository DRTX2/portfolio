/**
 * Main Application Entry Point
 * Imports and initializes all modules
 */

import { initMobileMenu } from './menu.js';
import { initStickyHeader, initSmoothScroll, initBackToTop } from './scroll.js';
import { initTextTranslations } from './i18n-text.js';

/**
 * Initialize all application modules
 */
function init() {
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
  initBackToTop();
  initTextTranslations();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
