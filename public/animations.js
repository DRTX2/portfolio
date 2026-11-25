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
  [".about-me > h2, .experience > h2, .skills-habilities > h2, .education > h2, .projects > h2, .atalaya-live > h2, .interests > h2, .cta-container > h2", "title"],
  [".about-content > *", "soft", true],
  [".expertise-tags .tag", "chip", true],
  [".experience .job", "up", true],
  [".skills-habilities article", "up", true],
  [".skill-mention > *", "chip", true],
  [".education-grid > *, .certificates > *", "up", true],
  [".projects .project", "card", true],
  [".about-objective, .project-filters, .projects-more, .interests-subtitle, .flow-subtitle", "soft"],
  [".flow-grid > *", "up", true],
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

  const intro = gsap
    .timeline({ defaults: { ease: "expo.out" }, onComplete: () => skip.abort() })
    .from(".hero-role", { opacity: 0, y: 14, duration: 0.7 })
    .from(".hero-name .line-inner", { yPercent: 110, rotate: 2, duration: 1.2, stagger: 0.1 }, "-=0.4")
    .from(".my-icon", { opacity: 0, y: 24, duration: 1.3 }, "-=1")
    .from([".hero-lede", ".hero-actions", ".hero-now"], { opacity: 0, y: 18, duration: 0.9, stagger: 0.08 }, "-=0.9")
    .from(".hero-ambient", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0);

  const skip = new AbortController();
  const finish = () => { intro.progress(1); skip.abort(); };
  for (const type of ["wheel", "touchmove", "keydown", "scroll"]) {
    window.addEventListener(type, finish, { passive: true, signal: skip.signal });
  }
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

// ---------------------------------------------------------------- smooth scroll

// Wheel input is eased by Lenis (touch stays native). Modals lock the page with body overflow,
// so any wheel while one is open, or inside a dialog/textarea, is left to the browser.
const initSmoothScroll = () => {
  if (typeof Lenis === "undefined") return;
  const lenis = new Lenis({
    lerp: 0.12,
    prevent: (node) => document.body.style.overflow === "hidden" || !!node.closest?.('[role="dialog"], textarea'),
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;
};

// ---------------------------------------------------------------- Atalaya in action

// Replays the asserted Atalaya scenario on the diagram: a packet travels each signed call while
// the log advances. Plays once when it scrolls into view; pauses off screen or in a hidden tab.
const initAtalayaFlow = () => {
  const section = document.querySelector("[data-flow]");
  if (!section) return;
  const button = section.querySelector("[data-flow-run]");

  // Phones get a stacked layout of the same diagram (layout only, so it applies with reduced motion too).
  const svg = section.querySelector("svg");
  const stacked = window.matchMedia("(max-width: 640px)");
  const layout = () => {
    const s = stacked.matches;
    svg.setAttribute("viewBox", s ? "0 0 430 680" : "0 0 920 470");
    section.querySelectorAll(".flow-node").forEach((g) => g.setAttribute("transform", s ? g.dataset.tStacked : g.dataset.tWide));
    section.querySelectorAll(".flow-paths path").forEach((p) => p.setAttribute("d", s ? p.dataset.md : p.dataset.d));
    section.classList.toggle("is-stacked", s);
  };
  layout();
  stacked.addEventListener("change", layout);
  // Reduced motion or no GSAP: the static diagram and the full log stay readable.
  if (reduceMotion || typeof gsap === "undefined") { button.hidden = true; return; }

  const node = (id) => section.querySelector(`[data-node="${id}"]`);
  const path = (id) => section.querySelector(`[data-path="${id}"]`);
  const steps = [...section.querySelectorAll(".flow-log li")];
  const packet = section.querySelector(".flow-packet");

  const setNode = (id, state, status) => {
    const el = node(id);
    el.classList.remove("is-active", "is-bad", "is-ok");
    if (state) el.classList.add(state);
    el.querySelector(".n-status").textContent = status;
  };
  const reset = () => {
    section.querySelectorAll(".flow-node").forEach((el) => {
      el.classList.remove("is-active", "is-bad", "is-ok");
      const status = el.querySelector(".n-status");
      status.textContent = status.dataset.initial;
    });
    section.querySelectorAll(".flow-paths path").forEach((el) => el.classList.remove("is-live", "is-ok"));
    steps.forEach((li) => li.classList.remove("is-shown", "is-current"));
    packet.setAttribute("cx", -20);
    packet.setAttribute("cy", -20);
  };

  const tl = gsap.timeline({ paused: true });
  const wait = (seconds) => tl.to({}, { duration: seconds });
  const at = (fn) => tl.call(fn);
  const step = (i) => at(() => {
    steps.forEach((li) => li.classList.remove("is-current"));
    steps[i].classList.add("is-shown", "is-current");
  });
  const state = (...args) => at(() => setNode(...args));
  const travel = (id, ok = false) => {
    const line = path(id);
    const p = { t: 0 };
    at(() => {
      line.classList.add("is-live");
      line.classList.toggle("is-ok", ok);
      packet.classList.toggle("is-ok", ok);
    });
    tl.fromTo(p, { t: 0 }, {
      t: 1,
      duration: 0.75,
      ease: "power1.inOut",
      onUpdate: () => {
        const pt = line.getPointAtLength(p.t * line.getTotalLength());
        packet.setAttribute("cx", pt.x);
        packet.setAttribute("cy", pt.y);
      },
    });
    at(() => line.classList.remove("is-live", "is-ok"));
  };

  // Incident
  step(0); state("pipeline", "is-bad", "backlog 200"); wait(1);
  travel("pipeline-nimbus"); step(1); state("nimbus", "is-bad", "incident open"); wait(0.6);
  travel("nimbus-flagship"); step(2); state("flagship", "is-active", "orders-v2: OFF"); wait(0.5);
  travel("flagship-sdks"); step(3); state("sdks", "is-ok", "v1 (safe) · 680 ms"); wait(0.7);
  travel("nimbus-hookrelay"); step(4); state("hookrelay", "is-active", "1 accepted"); wait(0.4);
  travel("hookrelay-oncall"); step(5); state("hookrelay", "is-ok", "1 delivered"); state("oncall", "is-ok", "200 · opened");
  travel("hookrelay-bitacora"); state("bitacora", "is-active", "incident open"); wait(1.4);
  // Recovery
  step(6); state("pipeline", "is-ok", "backlog 3"); travel("pipeline-nimbus", true); state("nimbus", "is-ok", "recovered"); wait(0.4);
  travel("nimbus-flagship", true); step(7); state("flagship", "is-ok", "orders-v2: ON");
  travel("flagship-sdks", true); state("sdks", "is-ok", "serving v2"); wait(0.3);
  travel("nimbus-hookrelay", true); travel("hookrelay-oncall", true);
  step(8); state("hookrelay", "is-ok", "2 delivered"); state("oncall", "is-ok", "200 · recovered");
  travel("hookrelay-bitacora", true); step(9); state("bitacora", "is-ok", "postmortem ready");

  let started = false;
  let inView = false;
  const sync = () => { if (started) tl.paused(!inView || document.hidden); };
  const play = () => { reset(); started = true; tl.restart(); sync(); };

  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (!started && e.intersectionRatio >= 0.35) play();
    else sync();
  }, { threshold: [0, 0.35] }).observe(section);
  document.addEventListener("visibilitychange", sync);
  button.addEventListener("click", play);
  section.classList.add("is-ready");
};

// ---------------------------------------------------------------- contact handoff

// The contact sheet slides over Interests, which recedes (lower, smaller, dimmer). Scrubbed, so
// it follows the scroll in both directions. Only --recede moves: the section box itself stays put,
// so links to #interests still land where they should (see _motion.scss).
const initContactHandoff = () => {
  const from = document.querySelector(".interests");
  const to = document.querySelector("#contact");
  if (!from || !to) return;
  gsap.to(from, {
    "--recede": 1,
    ease: "none",
    scrollTrigger: { trigger: to, start: "top 75%", end: "top 15%", scrub: true },
  });
};

// ---------------------------------------------------------------- pause what isn't visible

// Infinite CSS loops (hero blobs, marquee, "in progress" pulse) stop while their area is off screen.
const initOffscreenPause = () => {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.classList.toggle("is-offscreen", !e.isIntersecting);
  });
  document.querySelectorAll(".presentation, .tech-marquee, .about-content, .projects").forEach((el) => io.observe(el));
};

// ---------------------------------------------------------------- keep scroll triggers accurate

// The page grows after load (lazy images, fonts, translated text). ScrollTrigger only re-measures
// on load and window resize, so re-measure whenever the content height actually changes.
const initTriggerRefresh = () => {
  let height = document.body.offsetHeight;
  let frame = 0;
  new ResizeObserver(() => {
    if (frame || document.body.offsetHeight === height) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      height = document.body.offsetHeight;
      ScrollTrigger.refresh();
    });
  }).observe(document.body);
};

// ---------------------------------------------------------------- boot

// Navigation helpers are useful even with reduced motion (no animation involved).
initActiveSection();
initAtalayaFlow();

if (!reduceMotion) {
  document.documentElement.classList.add("motion");
  initReveals();
  initSmartHeader();
  initMagnetic();
  initOffscreenPause();

  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    initSmoothScroll();
    initHeroAmbient();
    initHeroEntrance();
    initHeroParallax();
    initScrollProgress();
    initCounters();
    initContactHandoff();
    initTriggerRefresh();
  }
}
