/**
 * Mobile Menu Module
 * Handles hamburger menu toggle and navigation
 */

export function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('.right-title-menu');
  const menuLinks = document.querySelectorAll('.right-title-menu a');

  if (!menuToggle || !menu) return;

  // Toggle menu
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}
