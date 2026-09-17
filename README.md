# 🪔 මංගල ආරාධනා — Sri Lankan Wedding Invitation

A single-page digital wedding invitation card in the traditional **Sinhala Buddhist (Magul Poruwa)** style. A sealed envelope opens, the card rises, and the invitation unfolds into a scrolling story — countdown to the *muhurthaya*, the couple's story, the Poruwa day schedule, venue details and a WhatsApp RSVP.

Zero build step. Three files. Open `index.html` and it runs.

---

## 🎨 Design

| | |
|---|---|
| **Vibe** | Temple-paper warmth, Kandyan ornament, oil-lamp light |
| **Palette** | Maroon `#6E1423` · turmeric gold `#E0991F` · peacock teal `#0F6E64` · lotus pink `#E2879E` on cream `#FBF3E2` |
| **Type** | Cormorant Garamond (names) · Noto Serif Sinhala (සිංහල) · Jost (UI labels) · Great Vibes (monogram) |
| **Motifs** | *Pahana* oil lamp, *nelum* lotus wax seal, peacock feathers, *hansa puttuwa* swan-knot dividers, *liya vela* borders — all hand-drawn inline SVG, no image files |

---

## 🎬 Animations

- **Envelope intro** — wax seal cracks and scatters into shards → flap swings open in 3D → the card rises out → monogram ring draws itself in gold → petals burst → the overlay lifts away. Shown once per session.
- **Petal canvas** — depth-aware falling petals, each with its own drift, spin and speed
- **Scroll reveals** — GSAP ScrollTrigger, `power3.out`, fired once at 85% viewport
- **Gold shimmer** travelling across the couple's names
- **Ken Burns** drift on the hero glow
- **Peacock feathers** parallaxing against the scroll
- **Ornamental dividers** drawing themselves in via `stroke-dashoffset`
- **Countdown digits** flipping only when the value actually changes
- **Petal burst** on RSVP submit
- Live flame flicker on the oil lamp

All motion is disabled under `prefers-reduced-motion`, and if the GSAP CDN is unreachable the page falls back to an IntersectionObserver reveal — the invitation never ends up blank.

---

## 📄 Sections

1. **Envelope** — the sealed intro
2. **Hero** — lit pahana, couple's names in English and සිංහල, date and *nakath* time
3. **Invitation** — Jayamangala Gatha verse, the invitation itself, both families named
4. **Countdown** — days / hours / minutes / seconds to the muhurthaya
5. **Our story** — four-milestone timeline
6. **The day** — the full Poruwa schedule, arrival through departure
7. **The celebration** — when / where (+ Maps) / dress code
8. **RSVP** — sends through WhatsApp
9. **Footer** — monogram, hashtag and a Sinhala sign-off

Plus a fixed dock: share, and background music.

---

## 🛠 Tech

Vanilla HTML + CSS + JavaScript. [GSAP 3.12.5](https://gsap.com) with ScrollTrigger from a CDN, Google Fonts, and nothing else — no npm, no bundler, no image or audio assets.

---

## ▶️ Run it

Double-click **`index.html`**. That's it.

To serve it instead:

```bash
python -m http.server 8080
```

---

## ✏️ Customise

**Everything you'd want to change lives in the `CONFIG` object at the top of [`script.js`](script.js)** — names, the date, the auspicious hour, venue, dress code, RSVP number, hashtag.

The countdown is driven entirely by one value:

```js
eventISO: "2027-01-17T08:04:00",   // the poruwa muhurthaya
```

Just below `CONFIG` are two arrays you can edit freely: `STORY` (the timeline) and `SCHEDULE` (the day-of itinerary).

**RSVP** goes to WhatsApp. Set the number in international format, digits only — no `+`, no spaces:

```js
rsvpWhatsApp: "94771234567",
```

**Background music** is off by default and the button hides itself until you add a track:

```js
musicUrl: "https://example.com/traditional-ambient.mp3",
```

**Personalise per guest** by adding a `guest` parameter to the link you send. Each guest sees their own greeting, and their name is pre-filled in the RSVP form:

```
index.html?guest=Nimal%20Perera
```

**Re-skin the whole card** from the `:root` block at the top of [`styles.css`](styles.css) — the variable names stay, only the values change.

---

## 🌐 Browser notes

- The envelope intro replays only after the session ends — clear `sessionStorage` to see it again during development
- Music never autoplays; browsers reject that. The guest taps to start it.
