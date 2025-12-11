// Registrar ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ============================================
// ANIMACIÓN DEL HEADER AL CARGAR LA PÁGINA
// ============================================
gsap.from(".main-menu", {
  y: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// ============================================
// ANIMACIÓN DE LA SECCIÓN PRESENTATION
// ============================================
gsap.from("#information h2", {
  opacity: 0,
  x: -50,
  duration: 1,
  delay: 0.3,
  ease: "power2.out",
});

gsap.from("#information p", {
  opacity: 0,
  x: -50,
  duration: 1,
  delay: 0.5,
  ease: "power2.out",
});

gsap.from("#information button", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  delay: 0.7,
  ease: "back.out(1.7)",
});

gsap.from(".social-networks li", {
  opacity: 0,
  y: 20,
  duration: 0.6,
  stagger: 0.15,
  delay: 0.9,
  ease: "power2.out",
});

gsap.from(".my-icon", {
  opacity: 0,
  scale: 0.8,
  duration: 1.2,
  delay: 0.5,
  ease: "elastic.out(1, 0.5)",
});

// ============================================
// ANIMACIÓN ABOUT ME CON SCROLL TRIGGER
// ============================================
gsap.from(".about-me h2", {
  scrollTrigger: {
    trigger: ".about-me",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out",
});

gsap.from(".about-me h3", {
  scrollTrigger: {
    trigger: ".about-me",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
  delay: 0.2,
});

gsap.from(".about-highlight", {
  scrollTrigger: {
    trigger: ".about-me",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  x: -30,
  duration: 0.6,
  stagger: 0.15,
  ease: "power2.out",
});

gsap.from(".expertise-areas", {
  scrollTrigger: {
    trigger: ".expertise-areas",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 20,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".expertise-tags .tag", {
  scrollTrigger: {
    trigger: ".expertise-areas",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 15,
  duration: 0.5,
  stagger: 0.08,
  ease: "power2.out",
});

gsap.from(".about-me > p", {
  scrollTrigger: {
    trigger: ".about-me > p",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".contact-info", {
  scrollTrigger: {
    trigger: ".contact-info",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 30,
  duration: 1,
  ease: "power2.out",
});

// ============================================
// ANIMACIÓN SKILLS CON SCROLL TRIGGER
// ============================================
gsap.from(".skills-habilities h2", {
  scrollTrigger: {
    trigger: ".skills-habilities",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  scale: 0.8,
  duration: 1,
  ease: "back.out(1.7)",
});

// Animar cada categoría de skills (Backend, Frontend, Database)
gsap.utils.toArray(".skills-habilities article").forEach((article, index) => {
  gsap.from(article, {
    scrollTrigger: {
      trigger: article,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
  });

  // Animar los iconos de skills individualmente
  gsap.from(article.querySelectorAll(".skill-mention > div"), {
    scrollTrigger: {
      trigger: article,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.08,
    ease: "power2.out",
  });
});

// ============================================
// ANIMACIÓN EDUCATION CON SCROLL TRIGGER
// ============================================
gsap.from(".education h2", {
  scrollTrigger: {
    trigger: ".education",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out",
});

gsap.from(".education .card", {
  scrollTrigger: {
    trigger: ".education",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
});

// ============================================
// ANIMACIÓN PROJECTS CON SCROLL TRIGGER
// ============================================
gsap.from(".projects h2", {
  scrollTrigger: {
    trigger: ".projects",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  scale: 0.9,
  duration: 1,
  ease: "back.out(1.7)",
});

gsap.from(".projects .project", {
  scrollTrigger: {
    trigger: ".projects",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 60,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out",
});

// ============================================
// EFECTOS HOVER CON GSAP (OPCIONAL)
// ============================================

// Efecto hover en botones
document.querySelectorAll("button, .resume-button button").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Efecto hover en tarjetas de proyectos
document.querySelectorAll(".project").forEach((project) => {
  project.addEventListener("mouseenter", () => {
    gsap.to(project, {
      y: -10,
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  project.addEventListener("mouseleave", () => {
    gsap.to(project, {
      y: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Efecto hover en iconos de redes sociales
document.querySelectorAll(".social-networks li a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      scale: 1.2,
      rotation: 5,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// ============================================
// ANIMACIÓN PARALLAX PARA LA IMAGEN (OPCIONAL)
// ============================================
gsap.to(".my-icon img", {
  scrollTrigger: {
    trigger: ".presentation",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
  y: 100,
  ease: "none",
});

// ============================================
// ANIMACIÓN CONTACT CTA CON SCROLL TRIGGER
// ============================================
gsap.from(".contact-cta h2", {
  scrollTrigger: {
    trigger: ".contact-cta",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 20,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".contact-cta .cta-subtitle", {
  scrollTrigger: {
    trigger: ".contact-cta",
    start: "top 75%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 15,
  duration: 0.6,
  delay: 0.1,
});

gsap.from(".contact-cta .cta-button", {
  scrollTrigger: {
    trigger: ".contact-cta",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 15,
  duration: 0.5,
  stagger: 0.1,
  delay: 0.2,
  ease: "power2.out",
});

gsap.from(".contact-cta .stat-item", {
  scrollTrigger: {
    trigger: ".cta-stats",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.08,
  ease: "power2.out",
});

// Animación de contador para las estadísticas
document.querySelectorAll(".stat-number").forEach((stat) => {
  const target = stat.textContent;
  const isPercentage = target.includes("%");
  const isKFormat = target.includes("K");
  const numericValue = parseFloat(target.replace(/[^0-9.]/g, ""));

  ScrollTrigger.create({
    trigger: stat,
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.from(stat, {
        textContent: 0,
        duration: 2,
        ease: "power1.inOut",
        snap: { textContent: 1 },
        onUpdate: function () {
          const current = parseFloat(this.targets()[0].textContent);
          if (isPercentage) {
            stat.textContent = Math.round(current) + "%+";
          } else if (isKFormat) {
            stat.textContent = current.toFixed(0) + "K+";
          } else {
            stat.textContent = Math.round(current) + "+";
          }
        },
      });
    },
  });
});
