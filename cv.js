document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.querySelector(".right-title-menu");

  menuToggle.addEventListener("click", (e) => {
    menu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Cerrar menú al hacer click en un enlace (móvil)
  const menuLinks = document.querySelectorAll(".right-title-menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
});

document.addEventListener("scroll", () => {
  const menu = document.querySelector(".main-menu");
  if (window.scrollY > 50) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
});

function scrollNav() {
  const navLinks = document.querySelectorAll(".main-menu a, .btn-about-me");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      
      // Solo prevenir default si es un anchor link (#)
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const section = document.querySelector(href);

        if (section) {
          const headerOffset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}
scrollNav();

const options = {
  strings: [
    "Web Development.",
    "Frontend Development.",
    "Backend Development.",
  ],
  typeSpeed: 50, // Velocidad de escritura (ms por carácter)
  backSpeed: 25, // Velocidad de borrado (ms por carácter)
  backDelay: 1000, // Tiempo antes de empezar a borrar
  startDelay: 500, // Tiempo antes de empezar a escribir
  loop: true, // Si debe reiniciar el ciclo después de terminar
};

const typed = new Typed(".develop-areas", options);

