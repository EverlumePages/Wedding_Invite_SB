/* =========================================================
   මංගල ආරාධනා — Sri Lankan Wedding Invitation
   Traditional Sinhala Buddhist (Magul Poruwa) theme
   -----------------------------------------------------------
   ▶▶ EDIT EVERYTHING IN ONE PLACE: the CONFIG object below ◀◀
   ========================================================= */

const CONFIG = {
  groom: { en: "Lahiru", si: "ලහිරු", full: "Lahiru Madushan" },
  bride: { en: "Sanduni", si: "සඳුනි", full: "Sanduni Wijesinghe" },

  monogram: "L & S",
  hashtag: "#LahiruWedsSanduni",

  // Parents' blessing line — traditional on Sri Lankan invitations
  groomParents: "Son of Mr. & Mrs. W. Gunaratne",
  brideParents: "Daughter of Mr. & Mrs. K. Wijesinghe",

  // ISO format "YYYY-MM-DDTHH:MM:SS" (24-hour, local) — the poruwa muhurthaya.
  // This one value drives the countdown.
  eventISO: "2027-01-17T08:04:00",

  dateText: "Sunday, 17 January 2027",
  daySi: "ඉරිදා",
  dateSi: "2027 ජනවාරි 17",
  nakathaEn: "at the auspicious hour of 8:04 in the morning",
  nakathaSi: "පෙ.ව. 8:04 සුභ මුහූර්තයෙන්",

  venueName: "Siyapatha Mangala Mandiraya",
  venueSi: "සියපත මංගල මන්දිරය",
  venueSub: "By the Mahaweli river",
  city: "Kandy, Sri Lanka",
  mapsQuery: "Kandy, Sri Lanka", // used to build the Google Maps link

  dressCode: "White & Gold",
  dressNote: "Traditional Osariya / Sarong, or modern formal. White and gold tones are most welcome.",

  // The verse shown on the invitation panel
  verseSi: "ජයමංගල ගාථා",
  verseLine: "සබ්බීතියෝ විවජ්ජන්තු · සබ්බ රෝගෝ විනස්සතු",
  verseEn: "May all misfortunes be averted, may all illness fade away — may you be blessed with long life and happiness.",

  invitation:
    "Together with their families, we joyfully invite you to share in the blessings of our Poruwa ceremony, as two lives are woven into one beneath the light of the pahana.",

  // RSVP → WhatsApp. Country code, digits only, no "+" and no spaces.
  rsvpWhatsApp: "94771234567",
  rsvpDeadline: "31 December 2026",

  // Leave "" to hide the music button entirely.
  // Drop in a royalty-free ambient / traditional track URL to activate it.
  musicUrl: "",

  footerMsg: "With joy, and the blessings of our families",
  footerSi: "ආයුබෝවන්! ඔබ සැමට සුබ දවසක්",
};

/* ── Love story — ආදර කතාව ───────────────────────────── */
const STORY = [
  {
    year: "2019",
    si: "මුල් හමුව",
    title: "The first meeting",
    text: "At the Kandy Esala Perahera, beneath a thousand oil lamps, we met entirely by chance.",
    icon: "🪔",
  },
  {
    year: "2021",
    si: "මිතුරුකම ආදරයක් විය",
    title: "Friendship became love",
    text: "Two years of friendship turned, slowly and without warning, into something far deeper.",
    icon: "🌸",
  },
  {
    year: "2024",
    si: "යෝජනාව",
    title: "The proposal",
    text: "By the waters of Samanala Wewa as the sun went down, Lahiru asked — and Sanduni said yes.",
    icon: "💍",
  },
  {
    year: "2027",
    si: "මංගල පෝරුව",
    title: "The Poruwa",
    text: "Today, before all of you, we step onto the poruwa and begin one life together.",
    icon: "🕊️",
  },
];

/* ── Day-of schedule — කාල සටහන ───────────────────────── */
const SCHEDULE = [
  { time: "7:30 AM", si: "ආරාධිතයින්ගේ පැමිණීම", title: "Guests arrive", desc: "Welcome drinks and seating in the hall", icon: "🚪" },
  { time: "8:04 AM", si: "පෝරුව මංගල්‍යය", title: "Poruwa ceremony", desc: "The couple ascends the poruwa at the auspicious hour", icon: "🪔" },
  { time: "8:20 AM", si: "ජයමංගල ගාථා", title: "Jayamangala Gatha", desc: "Ashtaka chanting and the singing of blessings", icon: "🙏" },
  { time: "8:45 AM", si: "උඩරට නැටුම්", title: "Kandyan dancers", desc: "Traditional ves dancing with hevisi drummers", icon: "🥁" },
  { time: "9:30 AM", si: "මංගල සේයාරූ", title: "Photographs", desc: "Portraits with the couple and both families", icon: "📸" },
  { time: "11:00 AM", si: "මංගල භෝජන සංග්‍රහය", title: "Wedding feast", desc: "A traditional Sri Lankan buffet", icon: "🍛" },
  { time: "12:30 PM", si: "මංගල කේක් කැපීම", title: "Cutting the cake", desc: "Cake, milk rice and good wishes", icon: "🎂" },
  { time: "2:00 PM", si: "හිස් අත් ගමන", title: "The departure", desc: "The couple leaves amid blessings and jasmine", icon: "🌺" },
];

/* Motion preference — honoured across the whole page. */
const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const PETAL_COLORS = ["#E2879E", "#F4C148", "#FBF3E2", "#E0991F", "#D9A0AF"];

/* ── tiny helpers ─────────────────────────────────────── */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const setText = (id, val) => {
  const el = document.getElementById(id);
  if (el && val != null) el.textContent = val;
};

/* =========================================================
   1 · CONFIG → DOM
   ========================================================= */
function applyConfig() {
  setText("groomName", CONFIG.groom.en);
  setText("brideName", CONFIG.bride.en);
  setText("groomNameSi", CONFIG.groom.si);
  setText("brideNameSi", CONFIG.bride.si);
  setText("groomParents", CONFIG.groomParents);
  setText("brideParents", CONFIG.brideParents);

  setText("envMonogram", CONFIG.monogram);
  setText("footerMonogram", CONFIG.monogram);
  setText("footerHashtag", CONFIG.hashtag);
  setText("footerMsg", CONFIG.footerMsg);
  setText("footerSi", CONFIG.footerSi);

  setText("heroDate", CONFIG.dateText);
  setText("heroDay", CONFIG.daySi);
  setText("heroNakatha", CONFIG.nakathaSi);
  setText("heroVenue", CONFIG.venueName);

  setText("verseSi", CONFIG.verseSi);
  setText("verseLine", CONFIG.verseLine);
  setText("verseEn", CONFIG.verseEn);
  setText("invitationText", CONFIG.invitation);

  setText("detailDate", CONFIG.dateText);
  setText("detailNakatha", CONFIG.nakathaEn);
  setText("detailVenue", CONFIG.venueName);
  setText("detailVenueSi", CONFIG.venueSi);
  setText("detailVenueSub", CONFIG.venueSub);
  setText("detailCity", CONFIG.city);
  setText("detailDress", CONFIG.dressCode);
  setText("detailDressNote", CONFIG.dressNote);

  setText("rsvpDeadline", CONFIG.rsvpDeadline);
  setText("year", new Date().getFullYear());

  const map = document.getElementById("mapLink");
  if (map) {
    map.href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(CONFIG.mapsQuery);
  }

  document.title = `${CONFIG.groom.en} & ${CONFIG.bride.en} · Wedding Invitation`;
}

/* =========================================================
   2 · Render the story timeline and the day-of schedule
   ========================================================= */
function renderStory() {
  const wrap = document.getElementById("timeline");
  if (!wrap) return;

  STORY.forEach((item) => {
    const el = document.createElement("article");
    el.className = "tl-item reveal";
    el.innerHTML = `
      <span class="tl-dot" aria-hidden="true"></span>
      <span class="tl-year">${item.year}</span>
      <span class="tl-icon" aria-hidden="true">${item.icon}</span>
      <h3 class="tl-title">${item.title}</h3>
      <p class="tl-si" lang="si">${item.si}</p>
      <p class="tl-text">${item.text}</p>`;
    wrap.appendChild(el);
  });
}

function renderSchedule() {
  const wrap = document.getElementById("schedule");
  if (!wrap) return;

  SCHEDULE.forEach((item) => {
    const el = document.createElement("li");
    el.className = "sch-item reveal";
    el.innerHTML = `
      <span class="sch-icon" aria-hidden="true">${item.icon}</span>
      <span class="sch-time">${item.time}</span>
      <div class="sch-body">
        <h3 class="sch-title">${item.title}</h3>
        <p class="sch-si" lang="si">${item.si}</p>
        <p class="sch-desc">${item.desc}</p>
      </div>`;
    wrap.appendChild(el);
  });
}

/* Hiding the scrollbar while the intro is up would let the page jump sideways
   by its width. Hold that space open with padding instead — a `scrollbar-gutter`
   on <html> would leave a pale strip beside the full-bleed overlay. */
function lockScroll() {
  const bar = window.innerWidth - document.documentElement.clientWidth;
  if (bar > 0) document.body.style.paddingRight = bar + "px";
  document.body.classList.add("is-locked");
}

function unlockScroll() {
  document.body.classList.remove("is-locked");
  document.body.style.paddingRight = "";
}

/* =========================================================
   3 · ENVELOPE INTRO
   Seal cracks → flap opens → card rises → overlay lifts.
   Shown once per session, like every sibling project.
   ========================================================= */
function initIntro() {
  const overlay = document.getElementById("envelope");
  if (!overlay) return;

  const openBtn = document.getElementById("envOpen");
  const skipBtn = document.getElementById("envSkip");
  const seal = document.getElementById("envSeal");
  const flap = document.getElementById("envFlap");
  const card = document.getElementById("envCard");
  const shards = $$(".env__shard", overlay);
  const monoPath = $("#envMonoRing");

  let done = false;
  let safety = null;

  /* Remove the overlay and hand focus back to the page. */
  const finish = () => {
    if (done) return;
    done = true;
    clearTimeout(safety);
    try {
      sessionStorage.setItem("wi_intro", "1");
    } catch (e) {
      /* private mode — just carry on */
    }
    document.removeEventListener("keydown", onKey);
    overlay.classList.add("is-gone");
    unlockScroll();
    window.setTimeout(() => overlay.remove(), 900);
    revealHero();
  };

  /* Already seen this session, or the user prefers less motion. */
  let seen = false;
  try {
    seen = sessionStorage.getItem("wi_intro") === "1";
  } catch (e) {
    /* ignore */
  }
  if (seen) {
    overlay.remove();
    revealHero();
    return;
  }

  lockScroll();

  const onKey = (e) => {
    if (e.key === "Escape") finish();
  };
  document.addEventListener("keydown", onKey);

  /* Keep tabbing inside the overlay while it is open. */
  overlay.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || done) return;
    const focusable = [openBtn, skipBtn].filter(Boolean);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  if (skipBtn) skipBtn.addEventListener("click", finish);
  window.setTimeout(() => openBtn && openBtn.focus(), 400);

  /* Reduced motion, or GSAP never loaded → a plain fade. */
  if (REDUCE || typeof window.gsap === "undefined") {
    overlay.classList.add("is-simple");
    if (openBtn) openBtn.addEventListener("click", finish);
    return;
  }

  const gsap = window.gsap;

  /* Settle the envelope in. */
  gsap.from(".env__body", {
    y: 40,
    opacity: 0,
    scale: 0.94,
    duration: 1,
    ease: "power3.out",
  });
  gsap.from(".env__hint", { opacity: 0, y: 12, duration: 0.8, delay: 0.5 });

  const open = () => {
    if (done || overlay.dataset.opening === "1") return;
    overlay.dataset.opening = "1";

    /* If anything below throws, never strand the guest on the overlay. */
    safety = window.setTimeout(finish, 6000);

    const travel = measureTravel(card);
    const tl = gsap.timeline({ onComplete: finish });

    tl.to(".env__hint", { opacity: 0, y: -8, duration: 0.3 })
      /* 1 · the wax seal cracks and its shards scatter */
      .to(seal, { scale: 1.18, duration: 0.22, ease: "power2.out" }, "<")
      .to(seal, { scale: 0, opacity: 0, rotate: 22, duration: 0.45, ease: "back.in(2)" })
      .to(
        shards,
        {
          x: () => gsap.utils.random(-160, 160),
          y: () => gsap.utils.random(-120, 180),
          rotate: () => gsap.utils.random(-220, 220),
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.02,
        },
        "-=0.4"
      )
      /* 2 · the flap swings open, then drops behind the rising card */
      .to(flap, { rotateX: -172, duration: 0.85, ease: "power3.inOut" }, "-=0.55")
      .set(flap, { zIndex: 1 })
      /* 3 · the card rises out of the envelope while the envelope sinks to
         meet it, keeping the opened pair centred. */
      .to(card, { y: -travel.rise, duration: 1.05, ease: "power3.out" }, "-=0.35")
      .to(".env__body", { y: travel.shift, duration: 1.05, ease: "power3.out" }, "<")
      .to(card, { scale: 1.04, duration: 0.5, ease: "power2.out" }, "-=0.45");

    /* 4 · the monogram ring draws itself in gold */
    if (monoPath) {
      const len = monoPath.getTotalLength();
      gsap.set(monoPath, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(monoPath, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, "-=0.7");
    }

    tl.from(".env__card-inner > *", {
      opacity: 0,
      y: 16,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
    }, "-=0.6")
      .call(() => burstPetals(window.innerWidth / 2, window.innerHeight / 2, 26))
      /* 5 · the whole overlay lifts away */
      .to(overlay, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, "+=0.55");
  };

  if (openBtn) openBtn.addEventListener("click", open);
}

/* How far the card climbs, and how far the envelope sinks to meet it.
   Derived from the live layout rather than fixed percentages, so the card's
   head never clears the top of a short or landscape screen. */
function measureTravel(card) {
  const body = document.querySelector(".env__body");
  const M = 14; // breathing room at the screen edges
  const c = card.getBoundingClientRect();
  const b = body.getBoundingClientRect();
  const vh = window.innerHeight;

  let rise = c.height * 0.58;
  let shift = c.height * 0.29;

  /* Sink further if the card would otherwise overshoot the top… */
  const over = M - (c.top - rise + shift);
  if (over > 0) shift += over;

  /* …but never so far that the envelope's foot drops off the bottom. */
  shift = Math.min(shift, Math.max(0, vh - M - b.bottom));

  /* If that cap wasn't enough, climb a little less instead. */
  const stillOver = M - (c.top - rise + shift);
  if (stillOver > 0) rise = Math.max(c.height * 0.3, rise - stillOver);

  return { rise, shift };
}

/* Stagger the hero in once the envelope is out of the way. */
function revealHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.classList.add("is-live");

  if (REDUCE || typeof window.gsap === "undefined") return;
  window.gsap.from(".hero__frame > *", {
    opacity: 0,
    y: 26,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.15,
  });
}

/* =========================================================
   4 · PETAL CANVAS
   Depth-aware drift — no two petals alike.
   ========================================================= */
class PetalField {
  constructor(canvas) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d");
    this.petals = [];
    this.raf = null;
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);

    this.resize();
    window.addEventListener("resize", this.resize);

    const count = window.innerWidth < 720 ? 22 : 42;
    for (let i = 0; i < count; i++) this.petals.push(this.make(true));

    this.raf = requestAnimationFrame(this.tick);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.c.width = this.w * dpr;
    this.c.height = this.h * dpr;
    this.c.style.width = this.w + "px";
    this.c.style.height = this.h + "px";
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  make(seeded) {
    const depth = Math.random(); // 0 = far, 1 = near
    return {
      x: Math.random() * this.w,
      y: seeded ? Math.random() * this.h : -20,
      r: 3 + depth * 7,
      depth,
      speed: 0.25 + depth * 0.9,
      drift: (Math.random() - 0.5) * 0.6,
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      angle: Math.random() * Math.PI * 2,
      color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
      alpha: 0.28 + depth * 0.45,
    };
  }

  tick() {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.w, this.h);

    this.petals.forEach((p, i) => {
      p.phase += 0.012;
      p.y += p.speed;
      p.x += Math.sin(p.phase) * 0.7 + p.drift;
      p.angle += p.spin;

      if (p.y - p.r > this.h) this.petals[i] = this.make(false);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    this.raf = requestAnimationFrame(this.tick);
  }
}

function initPetals() {
  const canvas = document.getElementById("petals");
  if (!canvas) return;
  if (REDUCE) {
    canvas.remove();
    return;
  }
  new PetalField(canvas);
}

/* A short celebratory burst — used by the intro and the RSVP. */
function burstPetals(x, y, count = 18) {
  if (REDUCE) return;

  const layer = document.createElement("div");
  layer.className = "burst";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "burst__petal";
    const size = 6 + Math.random() * 10;
    p.style.cssText = `
      left:${x}px; top:${y}px;
      width:${size}px; height:${size * 0.6}px;
      background:${PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0]};
      --tx:${(Math.random() - 0.5) * 420}px;
      --ty:${-60 - Math.random() * 300}px;
      --rot:${(Math.random() - 0.5) * 720}deg;
      animation-delay:${Math.random() * 0.18}s;`;
    layer.appendChild(p);
  }

  window.setTimeout(() => layer.remove(), 2200);
}

/* =========================================================
   5 · SCROLL REVEALS
   GSAP ScrollTrigger, with an IntersectionObserver fallback
   so the card is never left blank if the CDN is blocked.
   ========================================================= */
function initReveals() {
  const items = $$(".reveal");

  /* Reduced motion → just show everything. */
  if (REDUCE) {
    items.forEach((el) => el.classList.add("in"));
    $$(".ornament__path").forEach((p) => p.classList.add("in"));
    return;
  }

  if (typeof window.gsap !== "undefined" && window.ScrollTrigger) {
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    items.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });

    /* Ornamental dividers draw themselves in. */
    $$(".ornament svg path").forEach((path) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: path, start: "top 90%", once: true },
      });
    });

    /* Peacock feathers drift gently against the scroll. */
    $$("[data-parallax]").forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || 0.1;
      gsap.to(el, {
        yPercent: amt * 100,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    return;
  }

  /* ── Fallback: no GSAP ── */
  const pending = new Set(items);

  const show = (el) => {
    el.classList.add("in");
    pending.delete(el);
    io.unobserve(el);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.isIntersecting && show(entry.target));
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));

  /* An anchor jump (the hero CTA links straight to #rsvp) can carry a section
     past the viewport between two frames, so the observer never sees it
     intersect. Sweep for anything already scrolled into or past view. */
  let queued = false;
  const sweep = () => {
    queued = false;
    const limit = window.innerHeight * 0.92;
    pending.forEach((el) => {
      if (el.getBoundingClientRect().top < limit) show(el);
    });
    if (!pending.size) window.removeEventListener("scroll", onScroll);
  };
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(sweep);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  sweep();

  $$(".ornament__path").forEach((p) => p.classList.add("in"));
}

/* =========================================================
   6 · COUNTDOWN to the muhurthaya
   ========================================================= */
function initCountdown() {
  const target = new Date(CONFIG.eventISO).getTime();
  const grid = document.getElementById("countdown");
  const past = document.getElementById("countdownPast");
  if (!grid || Number.isNaN(target)) return;

  const units = [
    { id: "cd-days", ms: 864e5 },
    { id: "cd-hours", ms: 36e5 },
    { id: "cd-mins", ms: 6e4 },
    { id: "cd-secs", ms: 1e3 },
  ];

  const tick = () => {
    let diff = target - Date.now();

    if (diff <= 0) {
      grid.hidden = true;
      if (past) past.hidden = false;
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / 864e5);
    diff -= days * 864e5;
    const hours = Math.floor(diff / 36e5);
    diff -= hours * 36e5;
    const mins = Math.floor(diff / 6e4);
    diff -= mins * 6e4;
    const secs = Math.floor(diff / 1e3);

    [days, hours, mins, secs].forEach((val, i) => {
      const el = document.getElementById(units[i].id);
      if (!el) return;
      const next = String(val).padStart(2, "0");
      if (el.textContent === next) return;
      el.textContent = next;
      /* flip only the digit that actually changed */
      el.classList.remove("flip");
      void el.offsetWidth; // restart the animation
      el.classList.add("flip");
    });
  };

  tick();
  const timer = setInterval(tick, 1000);
}

/* =========================================================
   7 · RSVP → WhatsApp
   ========================================================= */
function initRSVP() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;

  const msgEl = document.getElementById("rsvp-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.guest.value.trim();
    const seats = parseInt(form.seats.value, 10);
    const attending = form.attending.value;
    const note = form.note.value.trim();

    if (!name) {
      msgEl.textContent = "Please tell us your name so we can find you on the list.";
      msgEl.className = "rsvp__msg is-error";
      form.guest.focus();
      return;
    }
    if (!seats || seats < 1 || seats > 8) {
      msgEl.textContent = "Please enter a number of guests between 1 and 8.";
      msgEl.className = "rsvp__msg is-error";
      form.seats.focus();
      return;
    }

    /* Compose the WhatsApp message. */
    const lines = [
      `ආයුබෝවන්! RSVP for ${CONFIG.groom.en} & ${CONFIG.bride.en}`,
      "",
      `Name: ${name}`,
      attending === "yes"
        ? `Joyfully attending — ${seats} guest${seats > 1 ? "s" : ""}`
        : "Regretfully unable to attend",
    ];
    if (note) lines.push("", `Note: ${note}`);
    lines.push("", `${CONFIG.dateText} · ${CONFIG.venueName}`);

    const url =
      "https://wa.me/" +
      CONFIG.rsvpWhatsApp +
      "?text=" +
      encodeURIComponent(lines.join("\n"));

    /* Celebrate. */
    const rect = form.getBoundingClientRect();
    burstPetals(rect.left + rect.width / 2, rect.top + rect.height / 3, 22);

    msgEl.textContent =
      attending === "yes"
        ? "Wonderful — opening WhatsApp so you can send it across. ස්තූතියි!"
        : "Thank you for letting us know. You will be missed. ස්තූතියි!";
    msgEl.className = "rsvp__msg is-ok";
    form.classList.add("is-sent");

    /* Always leave a link the guest can tap, in case the browser blocks the
       new tab or WhatsApp isn't installed. */
    let link = document.getElementById("rsvp-link");
    if (!link) {
      link = document.createElement("a");
      link.id = "rsvp-link";
      link.className = "btn btn--ghost rsvp__fallback";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      msgEl.insertAdjacentElement("afterend", link);
    }
    link.href = url;
    link.textContent = "Open WhatsApp";

    /* Hand off immediately — a delayed window.open loses the click's transient
       activation and gets caught by the popup blocker. */
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
  });
}

/* =========================================================
   8 · MUSIC TOGGLE
   Opt-in only — autoplay policies reject a real autoplay.
   ========================================================= */
function initMusic() {
  const btn = document.getElementById("musicBtn");
  const audio = document.getElementById("bgMusic");
  if (!btn || !audio) return;

  /* No track configured → hide the control rather than ship a dead button. */
  if (!CONFIG.musicUrl) {
    btn.remove();
    audio.remove();
    return;
  }

  audio.src = CONFIG.musicUrl;
  audio.volume = 0.35;

  btn.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        btn.classList.add("is-playing");
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", "Pause background music");
      } catch (err) {
        /* Autoplay policies can reject; leave it paused. */
      }
    } else {
      audio.pause();
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Play background music");
    }
  });
}

/* =========================================================
   9 · SHARE
   ========================================================= */
function initShare() {
  const btn = document.getElementById("shareBtn");
  if (!btn) return;

  const toast = (text) => {
    const t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.textContent = text;
    document.body.appendChild(t);
    window.setTimeout(() => t.classList.add("in"));
    window.setTimeout(() => {
      t.classList.remove("in");
      window.setTimeout(() => t.remove(), 400);
    }, 2400);
  };

  btn.addEventListener("click", async () => {
    const data = {
      title: `${CONFIG.groom.en} & ${CONFIG.bride.en} · Wedding Invitation`,
      text: `You are invited to our Poruwa ceremony on ${CONFIG.dateText}.`,
      url: location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        return; // the guest dismissed the sheet
      }
    }

    try {
      await navigator.clipboard.writeText(location.href);
      toast("Invitation link copied");
    } catch (err) {
      toast(location.href);
    }
  });
}

/* =========================================================
   10 · GUEST PERSONALISATION
   Share as  invitation.html?guest=Nimal%20Perera
   ========================================================= */
function initGuestName() {
  let name = "";
  try {
    name = (new URLSearchParams(location.search).get("guest") || "").trim();
  } catch (e) {
    return;
  }
  if (!name) return;

  name = name.slice(0, 48); // keep it a name, not an essay

  const greet = document.getElementById("guestGreeting");
  if (greet) {
    /* textContent, never innerHTML — the value comes from the URL. */
    greet.textContent = `Dear ${name},`;
    greet.hidden = false;
  }

  const field = document.getElementById("guest");
  if (field && !field.value) field.value = name;
}

/* =========================================================
   BOOT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderStory();
  renderSchedule();
  initIntro();
  initPetals();
  initReveals();
  initCountdown();
  initRSVP();
  initMusic();
  initShare();
  initGuestName();
});
