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
  // One stanza, four lines. The newlines are kept by the panel's own styling,
  // so write the verse here exactly as it should read on the page.
  verseLine:
    "බාහුං සහස්ස මභිනිම් මිත සා යුධං තං\n" +
    "ගිරි මේඛලං උදිත ඝෝර සසේන මාරං\n" +
    "දානාදි ධම්ම විධිනා ජිත වා මුනින්දෝ\n" +
    "තං තේජසා භවතු (තේ) ජය මංගලානී",
  verseEn: "May all misfortunes be averted, may all illness fade away — may you be blessed with long life and happiness.",

  invitation:
    "Together with their families, we joyfully invite you to share in the blessings of our Poruwa ceremony, as two lives are woven into one beneath the light of the pahana.",

  // RSVP → WhatsApp. Country code, digits only, no "+" and no spaces.
  rsvpWhatsApp: "94707001787",
  rsvpDeadline: "31 December 2026",

  // Leave "" to hide the music button entirely.
  // Drop in a royalty-free ambient / traditional track URL to activate it.
  musicUrl: "",

  footerMsg: "With joy, and the blessings of our families",
  footerSi: "ඔබ සැමට සුබ දවසක්!",
};

/* ── Day-of schedule — කාල සටහන ───────────────────────── */
const SCHEDULE = [
  { time: "7:30 AM", si: "ආරාධිතයින්ගේ පැමිණීම", title: "Guests arrive", desc: "Welcome drinks and seating in the hall", icon: "door" },
  { time: "8:04 AM", si: "පෝරුව මංගල්‍යය", title: "Poruwa ceremony", desc: "The couple ascends the poruwa at the auspicious hour", icon: "lamp" },
  { time: "8:20 AM", si: "ජයමංගල ගාථා", title: "Jayamangala Gatha", desc: "Ashtaka chanting and the singing of blessings", icon: "worship" },
  { time: "8:45 AM", si: "උඩරට නැටුම්", title: "Kandyan dance", desc: "Traditional ves dancing with hevisi drummers", icon: "dance" },
  { time: "9:30 AM", si: "මංගල සේයාරූ", title: "Photographs", desc: "Portraits with the couple and both families", icon: "camera" },
  { time: "11:00 AM", si: "මංගල භෝජන සංග්‍රහය", title: "Wedding feast", desc: "A traditional Sri Lankan buffet", icon: "food" },
  { time: "12:30 PM", si: "මංගල කේක් කැපීම", title: "Cutting the cake", desc: "Cake, milk rice and good wishes", icon: "cake" },
  { time: "2:00 PM", si: "පිටත්ව යෑම", title: "The departure", desc: "The couple leaves amid blessings and jasmine", icon: "flower" },
];

/* Motion preference — honoured across the whole page. */
const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/* Fallback shapes, used only if the sprites below fail to load. */
const PETAL_COLORS = ["#E2879E", "#F4C148", "#FBF3E2", "#E0991F", "#D9A0AF"];
/* The intro runs warm white, so its fallback petals do too — the page's
   saffron would burn a hole in that frame. */
const INTRO_PETALS = ["#E8C4C0", "#F2D9D5", "#FBF3E2", "#E7CE8A", "#EFD3CF"];

/* How small the card sits while it is still inside the envelope. Shared by the
   rest state and by measureTravel, which has to reason about the size the card
   will grow to, not the size it is. */
const INTRO_CARD_REST = 0.68;

/* Real petals, cut out of images/3.png. Loaded once and shared by the drifting
   canvas and every burst. */
const PETAL_SPRITE_SRCS = Array.from(
  { length: 10 },
  (_, i) => `images/petals/p${String(i + 1).padStart(2, "0")}.png`
);

/* Decoded sprites. A file that fails to load simply never joins the pool, and
   if none arrive the petals quietly fall back to drawn shapes. */
const PETAL_SPRITES = [];

function loadPetalSprites() {
  if (REDUCE) return;
  PETAL_SPRITE_SRCS.forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.addEventListener("load", () => PETAL_SPRITES.push(img));
    img.src = src;
  });
}

/* Petals are created before the sprites finish loading, so each one keeps a
   stable 0–1 pick and resolves it against the pool at draw time. That way they
   take up their sprite the moment it lands, instead of being stuck shapeless. */
function petalSprite(pick) {
  if (!PETAL_SPRITES.length) return null;
  const img = PETAL_SPRITES[(pick * PETAL_SPRITES.length) | 0];
  return img && img.complete && img.naturalWidth ? img : null;
}

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
   2 · Render the day-of schedule
   ========================================================= */
/* The schedule icons are images rather than emoji, so the page looks the same
   on every device instead of falling back to each platform's own glyphs — or
   to tofu, for the newer ones. Decorative, hence alt="". */
function iconTag(name, cls) {
  return `<img class="${cls}" src="images/icons/${name}.webp" alt="" aria-hidden="true" decoding="async" />`;
}

function renderSchedule() {
  const wrap = document.getElementById("schedule");
  if (!wrap) return;

  SCHEDULE.forEach((item) => {
    const el = document.createElement("li");
    el.className = "sch-item reveal";
    el.innerHTML = `
      ${iconTag(item.icon, "sch-icon")}
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
  const card = document.getElementById("envCard");
  const monoPath = $("#envMonoRing");

  let done = false;
  let safety = null;
  let introField = null;

  /* Remove the overlay and hand focus back to the page. */
  const finish = () => {
    if (done) return;
    done = true;
    clearTimeout(safety);
    if (introField) introField.destroy();
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

  /* Keep tabbing inside the overlay while it is open. The seal button is the
     only thing left to land on, so Tab simply stays on it. Escape still
     dismisses the intro. */
  overlay.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || done || !openBtn) return;
    e.preventDefault();
    openBtn.focus();
  });

  window.setTimeout(() => openBtn && openBtn.focus(), 400);

  /* Reduced motion, or GSAP never loaded → a plain fade. */
  if (REDUCE || typeof window.gsap === "undefined") {
    overlay.classList.add("is-simple");
    if (openBtn) openBtn.addEventListener("click", finish);
    return;
  }

  const gsap = window.gsap;

  /* Petals over the ivory scene from the first frame, as in the reference —
     sparser than the page's field, so they read as drifting rather than
     falling. Torn down by finish(). */
  const introCanvas = document.getElementById("introPetals");
  if (introCanvas) {
    introField = new PetalField(introCanvas, window.innerWidth < 720 ? 12 : 20, 0.7);
  }

  /* Settle the envelope in. */
  gsap.from(".env__body", {
    y: 40,
    opacity: 0,
    scale: 0.94,
    duration: 1,
    ease: "power3.out",
  });
  gsap.from(".env__hint", { opacity: 0, y: 12, duration: 0.8, delay: 0.5 });

  /* The slow camera push-in. It runs from load, independent of the open
     timeline, so the frame is already drifting closer while the guest decides
     to tap — linear, because a dolly has no easing. */
  gsap.fromTo(
    ".env__stage",
    { scale: 1 },
    { scale: 1.06, duration: 14, ease: "none" }
  );

  /* The card waits inside the envelope: centred on the body and under size. It
     cannot simply be hidden behind a layer — at rest it overlaps the lace
     liner, which sits behind it.

     The fade goes on the faces, never on .env__card itself. An opacity below 1
     is a grouping value: it flattens the element's 3D context, which switches
     off backface-visibility and leaves both faces painting at once, so the
     turn never reveals the reverse at all. */
  gsap.set(card, { xPercent: -50, yPercent: -50, scale: INTRO_CARD_REST });
  gsap.set(".env__face", { opacity: 0 });

  /* The envelope starts sealed: the open photograph waits underneath at zero,
     and cross-fades in behind the swinging flap. */
  gsap.set(".env__layer", { opacity: 0 });

  const open = () => {
    if (done || overlay.dataset.opening === "1") return;
    overlay.dataset.opening = "1";

    /* If anything below throws, never strand the guest on the overlay. Kept
       clear of the full timeline (~7.6s). */
    safety = window.setTimeout(finish, 12000);

    const travel = measureTravel(card);
    const tl = gsap.timeline({ onComplete: finish });

    /* Absolute positions throughout. Relative offsets here compound against
       whatever the longest preceding tween happens to be — the stage drift
       alone pushed the card's entrance out past a second, long after the beat
       it was meant to land on. */
    tl.to(".env__hint", { opacity: 0, y: -8, duration: 0.3 }, 0)

      /* The composition drifts down into the space the prompt leaves behind,
         so the card ends up balanced on screen without ever moving backwards. */
      .to(".env__stage", { y: travel.stageShift, duration: 1.5, ease: "power2.inOut" }, 0)

      /* 1 · the seal's glow flares and goes out. The wax is printed into the
         photograph, so the light does the breaking, not the wax. The CSS
         animation has to be stopped first: it owns transform, and would
         override anything tweened here. */
      .set("#envSealGlow", { animation: "none", xPercent: -50, yPercent: -50 }, 0)
      .to("#envSealGlow", { scale: 1.9, opacity: 0, duration: 0.5, ease: "power2.out" }, 0)

      /* 2 · the flap swings open on its hinge. -136°, not further: this is
         where the open photograph's own flap is lying, so the two coincide at
         the moment they trade places. Swing it flat and the hand-over becomes
         a visible jump. */
      .to("#envClosedFlap", { rotationX: -136, duration: 0.95, ease: "power2.inOut" }, 0.15)

      /* 3 · while the flap is mid-air and covering the change, the sealed
         photograph hands over to the open one. The two share a frame and the
         bodies are all but identical, so this reads as nothing at all — which
         is the point. Then the flap itself goes, into the open flap it has
         been standing in front of. */
      .to("#envClosedBody", { opacity: 0, duration: 0.4, ease: "power1.inOut" }, 0.65)
      .to(".env__layer", { opacity: 1, duration: 0.4, ease: "power1.inOut" }, 0.65)
      /* Last to go, and only once it has reached the angle the open flap is
         already lying at. */
      .to("#envClosedFlap", { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.95)

      /* 4 · the card rises out from between the envelope's two layers, turning
         a full circle as it comes. Climb and turn share one duration and one
         ease, so they decelerate together and settle as a single movement
         rather than the spin finishing early and the card coasting up after. */
      .to(card, { y: -travel.rise, scale: 1, duration: 1.6, ease: "power2.out" }, 0.95)
      .to(card, { rotationY: 360, duration: 1.6, ease: "power2.out" }, 0.95)
      /* Short, so the card is solid by the time it clears the pocket edge —
         any longer and it reads as materialising rather than sliding out. */
      .to(".env__face", { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.95)

      /* 5 · the envelope hands over: it sinks, recedes and goes. Once it is
         gone the card stands entirely clear — the only way a card this size
         can be fully out on a phone screen. */
      .to(".env__layer, #envSealGlow", {
        y: travel.sink,
        scale: 0.94,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, 1.2)

      /* 6 · a last touch of scale as it settles */
      .to(card, { scale: 1.03, duration: 0.6, ease: "power2.out" }, 2.3);

    /* the monogram ring draws itself in gold as the card comes to rest */
    if (monoPath) {
      const len = monoPath.getTotalLength();
      gsap.set(monoPath, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(monoPath, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 2.2);
    }

    tl.from(".env__card-inner > *", {
      opacity: 0,
      y: 14,
      duration: 0.55,
      stagger: 0.1,
      ease: "power3.out",
    }, 2.4)

      /* 5 · blush petals drift down the whole frame, spawned across the top
         rather than puffed from the centre */
      .call(() =>
        burstPetals(window.innerWidth / 2, -20, 34, {
          colors: INTRO_PETALS,
          fall: true,
          duration: 3.6,
          spawn: window.innerWidth * 1.1,
        }), null, 2.7)

      /* 6 · the handoff: the key light blooms, the white dissolves, and the
         maroon hero is already warming underneath before the overlay is gone.
         A hard slide-off here is exactly the jar this avoids. The dwell before
         it is deliberate — the card is the point, so it gets a beat alone. */
      .set(".env__glow", { animation: "none", xPercent: -50, yPercent: -50, opacity: 0.8 }, 6.4)
      .to(".env__glow", { opacity: 1, scale: 1.7, duration: 1.15, ease: "power2.out" }, 6.4)
      .to(overlay, { opacity: 0, duration: 1.15, ease: "power2.inOut" }, 6.4)
      .call(revealHero, null, 7.2);
  };

  if (openBtn) openBtn.addEventListener("click", open);
}

/* How far the card climbs out of the pocket, how far the envelope sinks as it
   bows out, and the last lift that puts the card on the screen's true centre.
   Measured from the live layout rather than fixed percentages, so the card's
   head never runs off the top of a short or landscape screen. */
function measureTravel(card) {
  const M = 20; // breathing room at the screen edges
  const c = card.getBoundingClientRect();
  const body = document.querySelector(".env__body").getBoundingClientRect();
  const vh = window.innerHeight;

  /* The rect is measured at rest, so it is already scaled down. Everything
     below reasons about the size the card grows to, not the size it is. */
  const grown = c.height / INTRO_CARD_REST;
  const topAtRest = c.top + (c.height - grown) / 2; // top once it reaches 1

  /* The prompt sits below the envelope, which pushes the whole composition
     above centre. Once it fades, that space is dead — so the stage drifts down
     into it. Doing this rather than recentring the card at the end avoids the
     card rising and then visibly settling back down again. */
  const stageShift = Math.max(0, vh / 2 - (body.top + body.height / 2));

  /* Modest: the separation the eye reads is the card's climb plus the
     envelope's fall, so the envelope does most of the work and the card does
     not have to travel far enough to run off the top. */
  let rise = grown * 0.18;
  const over = M - (topAtRest + stageShift - rise);
  if (over > 0) rise = Math.max(0, rise - over);

  return { rise, sink: grown * 0.3, stageShift };
}

/* Stagger the hero in once the envelope is out of the way. The handoff calls
   this part-way through the overlay's fade and finish() calls it again on the
   way out, so it has to be safe to run twice. */
function revealHero() {
  const hero = document.querySelector(".hero");
  if (!hero || hero.classList.contains("is-live")) return;
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
  constructor(canvas, count, alphaScale) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d");
    this.petals = [];
    this.raf = null;
    this.dead = false;
    /* The intro's field drifts in front of the envelope, so it is dialled back
       — at full strength a near petal can park on the wax seal and hide the
       one thing the guest is meant to tap. */
    this.alphaScale = alphaScale || 1;
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);

    this.resize();
    window.addEventListener("resize", this.resize);

    const n = count || (window.innerWidth < 720 ? 22 : 42);
    for (let i = 0; i < n; i++) this.petals.push(this.make(true));

    this.raf = requestAnimationFrame(this.tick);
  }

  /* The intro's field goes away with its overlay. Without this its rAF loop
     would keep painting a canvas that is no longer in the document. */
  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
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
      y: seeded ? Math.random() * this.h : -40,
      /* Half-width. Real petals need more size than the drawn ellipses did
         before their shape reads at all. */
      r: 8 + depth * 17,
      depth,
      speed: 0.25 + depth * 0.9,
      drift: (Math.random() - 0.5) * 0.6,
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      angle: Math.random() * Math.PI * 2,
      pick: Math.random(),
      color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
      alpha: 0.4 + depth * 0.5,
    };
  }

  tick() {
    if (this.dead) return;
    const { ctx } = this;
    ctx.clearRect(0, 0, this.w, this.h);

    this.petals.forEach((p, i) => {
      p.phase += 0.012;
      p.y += p.speed;
      p.x += Math.sin(p.phase) * 0.7 + p.drift;
      p.angle += p.spin;

      if (p.y - p.r * 2 > this.h) this.petals[i] = this.make(false);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.alpha * this.alphaScale;

      const img = petalSprite(p.pick);
      if (img) {
        const w = p.r * 2;
        const h = w * (img.naturalHeight / img.naturalWidth);
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
      } else {
        /* p.r is sized for a sprite; the drawn shape reads best at the
           smaller radius it always used. */
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 0.42, p.r * 0.23, 0, 0, Math.PI * 2);
        ctx.fill();
      }
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

/* Petals thrown from a point — the RSVP's celebratory puff by default, or,
   with `fall`, the slow blush drift down the intro. Options:
     colors    palette to draw from          (default: the page's saffron/lotus)
     fall      sink past the foot of the screen instead of bursting upward
     duration  seconds per petal             (default 1.6)
     spawn     spread the origin over this many px of width */
function burstPetals(x, y, count = 18, opts = {}) {
  if (REDUCE) return;

  const colors = opts.colors || PETAL_COLORS;
  const fall = opts.fall === true;
  const secs = opts.duration || 1.6;
  const spawn = opts.spawn || 0;

  const layer = document.createElement("div");
  layer.className = "burst";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "burst__petal";

    const img = petalSprite(Math.random());
    const size = img ? 14 + Math.random() * 20 : 6 + Math.random() * 10;
    /* A real petal keeps its own proportions; the drawn fallback stays the
       squat ellipse it always was. */
    const h = img ? size * (img.naturalHeight / img.naturalWidth) : size * 0.6;
    const skin = img
      ? `background-image:url(${img.src});`
      : `background:${colors[(Math.random() * colors.length) | 0]};`;
    if (img) p.classList.add("burst__petal--img");

    /* A burst throws up and out; a drift sinks clear past the bottom edge on
       a much narrower sideways wander. */
    const ty = fall
      ? window.innerHeight * (0.55 + Math.random() * 0.6)
      : -60 - Math.random() * 300;
    p.style.cssText = `
      left:${x + (Math.random() - 0.5) * spawn}px; top:${y}px;
      width:${size}px; height:${h}px;
      ${skin}
      --tx:${(Math.random() - 0.5) * (fall ? 150 : 420)}px;
      --ty:${ty}px;
      --rot:${(Math.random() - 0.5) * 720}deg;
      animation-duration:${secs}s;
      animation-delay:${Math.random() * (fall ? 1.7 : 0.18)}s;`;
    layer.appendChild(p);
  }

  window.setTimeout(() => layer.remove(), (secs + 2.2) * 1000);
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
  renderSchedule();
  loadPetalSprites(); // kicked off first — everything else can start without it
  initIntro();
  initPetals();
  initReveals();
  initCountdown();
  initRSVP();
  initMusic();
  initShare();
  initGuestName();
});
