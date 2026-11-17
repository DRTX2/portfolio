/**
 * Page motion.
 *  - scroll reveals (IntersectionObserver + CSS, see _motion.scss): titles, copy, cards, chips
 *  - hero: orchestrated entrance, cursor glow, scroll parallax
 *  - magnetic primary buttons (project cards use a CSS-only hover lift)
 *  - header hides on scroll down, nav highlights the current section
 *  - reading progress bar and stat counters
 * Reduced-motion users get the static page (nothing is ever hidden for them).
 */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// ---------------------------------------------------------------- reveals

const REVEALS = [
  // [selector, variant, stagger siblings?]
  [".about-me > h2, .experience > h2, .skills-habilities > h2, .education > h2, .projects > h2, .interests > h2, .cta-container > h2", "title"],
  [".about-content > *, .contact-info > *", "soft", true],
  [".expertise-tags .tag", "chip", true],
  [".experience .job", "up", true],
  [".skills-habilities article", "up", true],
  [".skill-mention > *", "chip", true],
  [".education-grid > *, .certificates > *", "up", true],
  [".projects .project", "card", true],
  [".about-objective, .project-filters, .interests-subtitle", "soft"],
  [".interest-card", "up", true],
  [".cta-container > :not(h2)", "up", true],
];

const initReveals = () => {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  // Titles start fully clipped, and Chrome's IntersectionObserver honours the target's own
  // clip-path (ratio stays 0), so a title is revealed when its container enters instead.
  const titlesByContainer = new Map();
  const containerIo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        titlesByContainer.get(e.target)?.forEach((t) => t.classList.add("in"));
        containerIo.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -15% 0px" },
  );

  for (const [selector, variant, stagger] of REVEALS) {
    document.querySelectorAll(selector).forEach((el) => {
      if (el.dataset.reveal) return;
      el.dataset.reveal = variant;
      if (stagger) {
        // Stagger relative to siblings that share the reveal, capped so long lists don't drag.
        const siblings = [...el.parentElement.children].filter((c) => c.matches(selector));
        el.style.setProperty("--i", String(Math.min(siblings.indexOf(el), variant === "chip" ? 14 : 6)));
      }
      if (variant === "title") {
        const box = el.parentElement;
        titlesByContainer.set(box, [...(titlesByContainer.get(box) ?? []), el]);
        containerIo.observe(box);
      } else {
        io.observe(el);
      }
    });
  }

  // Cards in a 2-column grid: restart the stagger per row so the second row doesn't wait.
  document.querySelectorAll(".projects .project").forEach((el, i) => el.style.setProperty("--i", String(i === 0 ? 0 : (i - 1) % 2)));
};

// ---------------------------------------------------------------- hero

const initHeroEntrance = () => {
  const lines = document.querySelectorAll(".hero-name > span");
  if (!lines.length) return;

  lines.forEach((line) => {
    if (line.querySelector(".line-inner")) return;
    const inner = document.createElement("span");
    inner.className = "line-inner";
    inner.style.display = "inline-block";
    inner.textContent = line.textContent;
    line.textContent = "";
    // Mask each line; the padding keeps descenders (the "j" in Manjarres) from being clipped.
    line.style.display = "block";
    line.style.overflow = "hidden";
    line.style.paddingBottom = "0.12em";
    line.style.marginBottom = "-0.12em";
    line.appendChild(inner);
  });

  gsap
    .timeline({ defaults: { ease: "expo.out" } })
    .from(".hero-role", { opacity: 0, y: 14, duration: 0.7 })
    .from(".hero-name .line-inner", { yPercent: 110, rotate: 2, duration: 1.2, stagger: 0.1 }, "-=0.4")
    .from(".my-icon", { opacity: 0, y: 24, duration: 1.3 }, "-=1")
    .from([".hero-lede", ".hero-actions", ".hero-now"], { opacity: 0, y: 18, duration: 0.9, stagger: 0.08 }, "-=0.9")
    .from(".hero-ambient", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0);
};

const initHeroAmbient = () => {
  const hero = document.querySelector(".presentation");
  if (!hero || hero.querySelector(".hero-ambient")) return;
  const ambient = document.createElement("div");
  ambient.className = "hero-ambient";
  ambient.setAttribute("aria-hidden", "true");
  ambient.innerHTML = '<span class="blob blob-a"></span><span class="blob blob-b"></span><span class="cursor-glow"></span>';
  hero.prepend(ambient);

  if (!finePointer) return;
  const glow = ambient.querySelector(".cursor-glow");
  const moveX = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power3.out" });
  const moveY = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power3.out" });
  hero.addEventListener("pointermove", (e) => {
    const r = ambient.getBoundingClientRect();
    moveX(e.clientX - r.left);
    moveY(e.clientY - r.top);
    ambient.classList.add("active");
  });
  hero.addEventListener("pointerleave", () => ambient.classList.remove("active"));
};

const initHeroParallax = () => {
  const hero = document.querySelector(".presentation");
  if (!hero) return;
  const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 };
  gsap.to(".hero-name", { yPercent: -12, ease: "none", scrollTrigger: scrub });
  gsap.to(".hero-ambient .blob", { yPercent: 30, ease: "none", scrollTrigger: scrub });
};

// ---------------------------------------------------------------- pointer effects

const initMagnetic = () => {
  if (!finePointer) return;
  document.querySelectorAll(".hero-actions .btn, .cta-button").forEach((btn) => {
    btn.classList.add("magnetic");
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.classList.add("pulling");
      btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.classList.remove("pulling");
      btn.style.transform = "";
    });
  });
};

// ---------------------------------------------------------------- navigation

const initSmartHeader = () => {
  const header = document.querySelector(".main-menu");
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const menuOpen = document.querySelector(".right-title-menu.active, .right-items-menu.active, #menu-toggle.active");
        const hide = y > 480 && y > lastY + 4 && !menuOpen;
        if (hide) header.classList.add("nav-hidden");
        else if (y < lastY - 4 || y <= 480) header.classList.remove("nav-hidden");
        lastY = y;
        ticking = false;
      });
    },
    { passive: true },
  );
  // Keyboard users tabbing into the nav must always see it.
  header.addEventListener("focusin", () => header.classList.remove("nav-hidden"));
};

const initActiveSection = () => {
  const links = new Map();
  document.querySelectorAll('.right-items-menu a[href^="#"]').forEach((a) => {
    const section = document.querySelector(a.getAttribute("href"));
    if (section) links.set(section, a);
  });
  if (!links.size) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((a) => a.classList.remove("is-current"));
        links.get(e.target)?.classList.add("is-current");
      }
    },
    // A section is "current" while it crosses the middle band of the viewport.
    { rootMargin: "-45% 0px -50% 0px" },
  );
  links.forEach((_, section) => io.observe(section));
};

// ---------------------------------------------------------------- misc (unchanged behaviour)

const initScrollProgress = () => {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
  });
};

const initCounters = () => {
  document.querySelectorAll(".stat-number").forEach((stat) => {
    const raw = stat.textContent.trim();
    const target = parseFloat(raw.replace(/[^0-9.]/g, ""));
    const suffix = raw.replace(/[0-9.]/g, "");
    if (Number.isNaN(target)) return;
    ScrollTrigger.create({
      trigger: stat,
      start: "top 90%",
      once: true,
      onEnter: () => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => (stat.textContent = Math.round(counter.value) + suffix),
        });
      },
    });
  });
};

// ---------------------------------------------------------------- boot

// Navigation helpers are useful even with reduced motion (no animation involved).
initActiveSection();

if (!reduceMotion) {
  document.documentElement.classList.add("motion");
  initReveals();
  initSmartHeader();
  initMagnetic();

  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    initHeroAmbient();
    initHeroEntrance();
    initHeroParallax();
    initScrollProgress();
    initCounters();
  }
}
