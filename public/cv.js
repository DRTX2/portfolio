/**
 * Main Application Logic
 * Encapsulates UI interactions like the mobile menu, sticky header, and smooth scrolling.
 */
const App = {
  // Configuración centralizada
  config: {
    menuToggleId: "menu-toggle",
    menuSelector: ".right-title-menu",
    mainMenuSelector: ".main-menu",
    navLinksSelector: ".main-menu a, .btn-about-me",
    typingSelector: ".develop-areas",
    headerOffset: 80, // Altura del header para el scroll offset
  },

  /**
   * Inicializa toda la aplicación cuando el DOM está listo
   */
  init() {
    this.initMobileMenu();
    this.initStickyHeader();
    this.initSmoothScroll();
    this.initTypingEffect();
  },

  /**
   * Maneja el menú hamburguesa (toggle) y el cierre al hacer click en enlaces
   */
  initMobileMenu() {
    const menuToggle = document.getElementById(this.config.menuToggleId);
    const menu = document.querySelector(this.config.menuSelector);
    const menuLinks = document.querySelectorAll(`${this.config.menuSelector} a`);

    if (!menuToggle || !menu) return;

    // Toggle del menú
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    // Cerrar menú al navegar
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  },

  /**
   * Añade clase 'sticky' al header cuando se hace scroll
   */
  initStickyHeader() {
    const header = document.querySelector(this.config.mainMenuSelector);
    if (!header) return;

    document.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });
  },

  /**
   * Scroll suave con corrección de posición por el header fijo
   */
  initSmoothScroll() {
    const links = document.querySelectorAll(this.config.navLinksSelector);

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        // Solo interceptar enlaces internos (#)
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const section = document.querySelector(href);

          if (section) {
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - this.config.headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
  },

  /**
   * Inicializa el efecto de escritura (Typewriter)
   */
  initTypingEffect() {
    if (!document.querySelector(this.config.typingSelector)) return;

    new Typed(this.config.typingSelector, {
      strings: [
        "Web Development.",
        "Frontend Development.",
        "Backend Development.",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    });
  },
};

// Arrancar la aplicación
document.addEventListener("DOMContentLoaded", () => App.init());
