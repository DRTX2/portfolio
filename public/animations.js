/**
 * Page motion, kept deliberately small:
 *  - one orchestrated entrance for the hero (role, name lines, copy, photo)
 *  - reading progress bar
 *  - stat counters in the contact section
 * Everything is skipped when the user prefers reduced motion.
 */

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const initHeroEntrance = () => {
  const lines = document.querySelectorAll(".hero-name > span");
  if (!lines.length) return;

  // Wrap each name line so it can rise from behind its own edge
  lines.forEach((line) => {
    if (line.querySelector(".line-inner")) return;
    const inner = document.createElement("span");
    inner.className = "line-inner";
    inner.style.display = "inline-block";
    inner.textContent = line.textContent;
    line.textContent = "";
    line.appendChild(inner);
  });

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .from(".hero-role", { opacity: 0, y: 12, duration: 0.5 })
    .from(".hero-name .line-inner", { yPercent: 105, duration: 0.9, stagger: 0.12 }, "-=0.2")
    .from(".my-icon", { opacity: 0, duration: 0.9 }, "-=0.6")
    .from([".hero-lede", ".hero-actions", ".hero-now"], { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 }, "-=0.7");
};

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
          duration: 1.4,
          ease: "power1.out",
          onUpdate: () => (stat.textContent = Math.round(counter.value) + suffix),
        });
      },
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || prefersReducedMotion()) return;
  gsap.registerPlugin(ScrollTrigger);
  initHeroEntrance();
  initScrollProgress();
  initCounters();
});
