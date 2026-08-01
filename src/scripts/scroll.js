/**
 * Scroll Module
 * Handles smooth scrolling and sticky header
 */

const HEADER_OFFSET = 80;

/**
 * Makes header sticky on scroll
 */
export function initStickyHeader() {
  const header = document.querySelector('.main-menu');
  if (!header) return;

  document.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
}

/**
 * Enables smooth scrolling for anchor links
 */
export function initSmoothScroll() {
  const links = document.querySelectorAll('.main-menu a, .btn-about-me, .back-to-top');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Only intercept internal anchor links
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(href);

        if (section) {
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });
}

/**
 * Shows/hides the back-to-top button based on scroll position
 */
export function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  document.addEventListener('scroll', () => {
    // Show after scrolling down 100vh
    if (window.scrollY > window.innerHeight) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
}
