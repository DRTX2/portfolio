/**
 * Main Application Entry Point
 * Imports and initializes all modules
 */

import { initMobileMenu } from './menu.js';
import { initStickyHeader, initSmoothScroll } from './scroll.js';
import { initTypingEffect } from './typing.js';

/**
 * Initialize all application modules
 */
function init() {
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
  initTypingEffect();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
