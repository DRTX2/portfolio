// Configuración Base
const config = {
  duration: 0.8,
  ease: "power2.out",
  // Presets de animación reutilizables
  presets: {
    fadeInUp: { y: 30, opacity: 0 },
    fadeInLeft: { x: -30, opacity: 0 },
    fadeInRight: { x: 30, opacity: 0 },
    popIn: { scale: 0.8, opacity: 0, ease: "back.out(1.7)" },
  },
};

/**
 * Helper para crear animaciones con ScrollTrigger de forma más limpia
 * @param {string|Element} target - Elemento a animar
 * @param {Object} vars - Propiedades de animación GSAP (x, y, opacity, etc.)
 * @param {Object} triggerOptions - Opciones específicas del trigger (start, toggleActions)
 */
const animate = (target, vars, triggerOptions = {}) => {
  // Configuración por defecto del trigger
  const triggerDefaults = {
    trigger: target, // Por defecto el trigger es el mismo elemento
    start: "top 80%",
    toggleActions: "play none none reverse",
  };

  gsap.from(target, {
    ...vars,
    duration: vars.duration || config.duration,
    ease: vars.ease || config.ease,
    scrollTrigger: {
      ...triggerDefaults,
      ...triggerOptions,
      trigger: triggerOptions.trigger || target, // Priorizar el trigger pasado en opciones
    },
  });
};

/**
 * Inicialización de todas las animaciones
 */
const initAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- Header & Hero ---
  gsap.from(".main-menu", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  const heroTl = gsap.timeline({ delay: 0.3 });
  heroTl
    .from("#information h2", { x: -50, opacity: 0, duration: 1 })
    .from("#information p", { x: -50, opacity: 0, duration: 1 }, "-=0.8")
    .from("#information button", { y: 20, opacity: 0, ease: "back.out(1.7)" }, "-=0.6")
    // .from(".social-networks li", { 
    //   y: 20, opacity: 0, stagger: 0.15, duration: 0.6 
    // }, "-=0.4")
    .from(".my-icon", {
      scale: 0.8, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)"
    }, "-=1");

  // Parallax Imagen Hero (Opcional)
  gsap.to(".my-icon img", {
    y: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".presentation",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  // --- About Me ---
  animate(".about-me h2", { y: 50, opacity: 0, duration: 1 });
  animate(".about-me h3", { x: -30, opacity: 0, delay: 0.2 }, { start: "top 75%" });
  
  animate(".about-highlight", { 
    x: -30, opacity: 0, stagger: 0.15 
  }, { trigger: ".about-me", toggleActions: "play none none none" });

  animate(".expertise-areas", { y: 20, opacity: 0 }, { start: "top 85%", toggleActions: "play none none none" });

  animate(".expertise-tags .tag", { 
    y: 15, opacity: 0, duration: 0.5, stagger: 0.08 
  }, { trigger: ".expertise-areas", toggleActions: "play none none none" });

  animate(".about-me > p", { ...config.presets.fadeInUp }, { start: "top 85%" });
  animate(".contact-info", { ...config.presets.fadeInUp, duration: 1 }, { start: "top 85%" });

  // --- Skills ---
  animate(".skills-habilities h2", { ...config.presets.popIn, duration: 1 });

  gsap.utils.toArray(".skills-habilities article").forEach((article) => {
    animate(article, { ...config.presets.fadeInUp }, { trigger: article, start: "top 85%", toggleActions: "play none none none" });
    
    // Iconos internos - DISABLED to fix visibility issue
    // animate(article.querySelectorAll(".skill-mention > div"), {
    //   y: 20, opacity: 0, duration: 0.5, stagger: 0.08
    // }, { trigger: article, toggleActions: "play none none none" });
  });

  // --- Education ---
  animate(".education h2", { y: 50, opacity: 0, duration: 1 });
  animate(".education .card", { 
    y: 50, opacity: 0, stagger: 0.2 
  }, { trigger: ".education", start: "top 75%" });

  // --- Projects ---
  animate(".projects h2", { ...config.presets.popIn, scale: 0.9, duration: 1 });
  // DISABLED to fix visibility issues
  // animate(".projects .project", { 
  //   y: 60, opacity: 0, duration: 1, stagger: 0.2 
  // }, { trigger: ".projects", start: "top 70%" }); // Selector correjido .projects

  // --- Contact CTA ---
  // const ctaTrigger = { trigger: ".contact-cta", toggleActions: "play none none none" };
  // animate(".contact-cta h2", { y: 20, opacity: 0 }, ctaTrigger);
  // animate(".contact-cta .cta-subtitle", { y: 15, opacity: 0, duration: 0.6, delay: 0.1 }, { ...ctaTrigger, start: "top 75%" });
  
  // DISABLED to fix visibility issues
  // animate(".contact-cta .cta-button", { y: 15, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.2 }, { ...ctaTrigger, start: "top 70%" });
  // animate(".contact-cta .stat-item", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, { trigger: ".cta-stats", start: "top 85%", toggleActions: "play none none none" });

  // --- Animación Contadores (Stats) ---
  initCounters();

  // --- Hover Effects ---
  initHoverEffects();
};

/**
 * Animación de conteo numérico
 */
const initCounters = () => {
  document.querySelectorAll(".stat-number").forEach((stat) => {
    const rawText = stat.textContent;
    const isPercentage = rawText.includes("%");
    const isKFormat = rawText.includes("K");
    const numericValue = parseFloat(rawText.replace(/[^0-9.]/g, ""));

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
            let suffix = "+";
            if (isPercentage) suffix = "%+";
            if (isKFormat) suffix = "K+";
            stat.textContent = Math.round(current) + suffix; // Math.round para evitar decimales feos mientras anima
          },
        });
      },
    });
  });
};

/**
 * Efectos de Hover con GSAP
 */
const initHoverEffects = () => {
  // Botones
  document.querySelectorAll("button, .resume-button button").forEach((btn) => {
    btn.addEventListener("mouseenter", () => gsap.to(btn, { scale: 1.05, duration: 0.3 }));
    btn.addEventListener("mouseleave", () => gsap.to(btn, { scale: 1, duration: 0.3 }));
  });

  // Proyectos
  document.querySelectorAll(".project").forEach((project) => {
    project.addEventListener("mouseenter", () => 
      gsap.to(project, { y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.3)", duration: 0.3 })
    );
    project.addEventListener("mouseleave", () => 
      gsap.to(project, { y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", duration: 0.3 })
    );
  });

  // Redes sociales
  document.querySelectorAll(".social-networks li a").forEach((link) => {
    link.addEventListener("mouseenter", () => 
      gsap.to(link, { scale: 1.2, rotation: 5, duration: 0.3, ease: "back.out(1.7)" })
    );
    link.addEventListener("mouseleave", () => 
      gsap.to(link, { scale: 1, rotation: 0, duration: 0.3 })
    );
  });
};

// Iniciar animaciones
document.addEventListener("DOMContentLoaded", initAnimations);
