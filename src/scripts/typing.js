/**
 * Typing Animation Module
 * Initializes Typed.js for the hero section
 */

/**
 * Initializes the typing effect using Typed.js
 * Requires Typed.js to be loaded globally
 */
export let typedInstance = null;

export function initTypingEffect(customStrings = null) {
  const selector = '.develop-areas';
  
  if (!document.querySelector(selector)) return;
  
  // Check if Typed is available
  if (typeof Typed === 'undefined') {
    console.warn('Typed.js not loaded. Typing effect will not work.');
    return;
  }

  // Destroy previous instance if exists
  if (typedInstance) {
    typedInstance.destroy();
    typedInstance = null;
  }

  const strings = customStrings || [
    'Web Development.',
    'Frontend Development.',
    'Backend Development.',
  ];

  typedInstance = new Typed(selector, {
    strings: strings,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1000,
    startDelay: 500,
    loop: true,
  });
}
