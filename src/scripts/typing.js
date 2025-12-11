/**
 * Typing Animation Module
 * Initializes Typed.js for the hero section
 */

/**
 * Initializes the typing effect using Typed.js
 * Requires Typed.js to be loaded globally
 */
export function initTypingEffect() {
  const selector = '.develop-areas';
  
  if (!document.querySelector(selector)) return;
  
  // Check if Typed is available
  if (typeof Typed === 'undefined') {
    console.warn('Typed.js not loaded. Typing effect will not work.');
    return;
  }

  new Typed(selector, {
    strings: [
      'Web Development.',
      'Frontend Development.',
      'Backend Development.',
    ],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1000,
    startDelay: 500,
    loop: true,
  });
}
