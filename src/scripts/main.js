/**
 * Main Application Entry Point
 * Imports and initializes all modules
 */

import { initMobileMenu } from './menu.js';
import { initStickyHeader, initSmoothScroll } from './scroll.js';

/**
 * Initialize all application modules
 */
function init() {
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
