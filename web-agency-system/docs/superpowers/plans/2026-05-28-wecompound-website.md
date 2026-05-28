# WeCompound Agency Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the WeCompound agency website — a 4-page static HTML/CSS/JS site with Linear-inspired dark design, money-green accent, GSAP/Lenis/Barba.js animations, and placeholder portfolio content.

**Architecture:** Static site with no build tools. One `styles.css`, one `main.js`, all libraries via CDN. Pages share identical nav/footer markup (duplicated per page — no templating in static HTML). Barba.js wraps page content for seamless transitions.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid, clamp()), vanilla JS, GSAP + ScrollTrigger (CDN), Lenis (CDN), Barba.js (CDN), Vanta.js + Three.js (CDN), Google Fonts.

**Spec:** `docs/superpowers/specs/2026-05-28-wecompound-website-design.md`
**Checklist:** `reference/CHECKLIST.md`
**Build rules:** `CLAUDE.md` (root)

---

## File Structure

```
wecompound/
├── index.html          — Home page (hero, services bento, stats, featured work, CTA)
├── services.html       — Service detail page (4 service sections)
├── work.html           — Portfolio page (project grid + expanding panels)
├── contact.html        — Contact page (form + direct contact info)
├── 404.html            — Branded 404 page
├── css/
│   └── styles.css      — All styles: reset, design tokens, layout, components, responsive
├── js/
│   └── main.js         — All JS: Lenis, GSAP, Barba.js, Vanta, preloader, menu, interactions
└── images/             — Placeholder project thumbnails (empty for now)
```

---

## Task 1: Project Scaffolding + Font Selection

**Files:**
- Create: `wecompound/css/styles.css`
- Create: `wecompound/images/` (empty directory)
- Create: `wecompound/js/` (empty directory)

- [ ] **Step 1: Create the project directory structure**

```powershell
New-Item -ItemType Directory -Force "wecompound/css", "wecompound/js", "wecompound/images"
```

- [ ] **Step 2: Select fonts using Google Fonts skill**

Invoke the `google-fonts` skill to select a distinctive pairing. Requirements:
- Display font: tight geometric sans, weights 300 + 700, aggressive negative tracking
- Body font: clean readable text face, weight 400
- Forbidden: Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Nunito
- Mode: contrast (pairing, not single font)
- Aesthetic: sharp, confident, technical — Linear/Vercel energy

- [ ] **Step 3: Create styles.css with design tokens and base styles**

Write `wecompound/css/styles.css` with:

1. CSS reset (box-sizing, margin, padding, smooth-scroll suppressed for Lenis)
2. `:root` block with ALL design tokens from spec:
   - Colors: `--canvas` through `--on-primary` (14 color tokens)
   - Typography scale: `--text-sm` through `--text-3xl` plus `--text-eyebrow` (all `clamp()`)
   - Font families: `--font-display` and `--font-body` (from Google Fonts skill result)
   - Spacing: `--space-xs` through `--space-section`
   - Radii: `--radius-sm` through `--radius-xl`
3. Base typography styles on `body` (font-family, color, background, line-height)
4. Heading styles (h1–h4) with fluid sizes, negative tracking, display font
5. Eyebrow class: `--text-eyebrow`, weight 500, letter-spacing +0.05em, primary color, uppercase
6. `.container` class: max-width 1280px, centered, padding-inline

```css
/* Key token examples — full set required */
:root {
  --canvas: #010102;
  --surface-1: #0f1011;
  --surface-2: #141516;
  --surface-3: #18191a;
  --hairline: #23252a;
  --hairline-strong: #34343a;
  --ink: #f7f8f8;
  --ink-muted: #d0d6e0;
  --ink-subtle: #8a8f98;
  --ink-tertiary: #62666d;
  --primary: #22c55e;
  --primary-hover: #4ade80;
  --primary-focus: #16a34a;
  --on-primary: #ffffff;

  --text-sm: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.35vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1rem + 0.75vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);
  --text-2xl: clamp(2rem, 1.2rem + 2.5vw, 3.5rem);
  --text-3xl: clamp(2.5rem, 1rem + 4vw, 5rem);
  --text-eyebrow: clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem);

  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-section: clamp(4rem, 8vw, 8rem);

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
```

- [ ] **Step 4: Add component styles to styles.css**

Append to `wecompound/css/styles.css`:

1. **Buttons:**
   - `.btn-primary`: bg primary, color on-primary, radius-md, padding 12px 28px, font-weight 500, font-size text-sm, transition all 0.3s ease. Hover: bg primary-hover, transform scale(1.03). Active: bg primary-focus.
   - `.btn-secondary`: bg transparent, color ink, 1px solid hairline, radius-md, same padding. Hover: border-color ink-subtle, translateY(-2px).
   - `.btn-ghost`: bg transparent, color primary, no border, underline on hover.

2. **Cards:**
   - `.card`: bg surface-1, 1px solid hairline, radius-lg, padding space-lg. Hover: translateY(-4px), border-color hairline-strong, transition 0.3s.
   - `.card--featured`: bg surface-2, border-color hairline-strong (the accent-bordered media production card).

3. **Tag pills:**
   - `.tag`: bg surface-2, color ink-muted, radius 9999px, padding 4px 12px, font-size text-sm.

4. **Form inputs:**
   - `input, textarea`: bg surface-1, color ink, 1px solid hairline, radius-md, padding 12px 16px. Focus: border-color primary-focus, outline 2px solid primary-focus at 50% opacity.

5. **CTA banner:**
   - `.cta-banner`: bg surface-1, radius-lg, padding space-2xl, text-align center, 1px solid hairline.

6. **Section spacing:**
   - `section`: padding-block var(--space-section).

- [ ] **Step 5: Verify by creating a minimal test page**

Create a temporary `wecompound/test.html` with the CSS linked, containing one of each component (button, card, heading, eyebrow). Open in browser to verify colors, fonts, and spacing render correctly. Delete `test.html` after verification.

- [ ] **Step 6: Commit**

```
git add wecompound/css/styles.css
git commit -m "feat(wecompound): scaffold project and design system"
```

---

## Task 2: Navigation + Footer

**Files:**
- Reference: `wecompound/css/styles.css` (append nav/footer styles)

Navigation and footer markup will be written directly into each HTML page (Tasks 3–7). This task defines the CSS and documents the exact HTML pattern to duplicate.

- [ ] **Step 1: Add navigation CSS to styles.css**

Append to `wecompound/css/styles.css`:

```css
/* --- Navigation --- */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--canvas);
  border-bottom: 1px solid var(--hairline);
  height: 64px;
  display: flex;
  align-items: center;
  transition: background 0.3s ease;
}

.nav__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__logo {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav__logo span {
  color: var(--primary);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  list-style: none;
}

.nav__link {
  color: var(--ink-subtle);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 400;
  position: relative;
  transition: color 0.3s ease;
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--primary);
  transition: width 0.3s ease;
}

.nav__link:hover,
.nav__link--active {
  color: var(--ink);
}

.nav__link:hover::after,
.nav__link--active::after {
  width: 100%;
}

.nav__cta {
  /* Uses .btn-primary class */
}

.nav__hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
}

.nav__hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--ink);
  margin: 5px 0;
  transition: all 0.3s ease;
}
```

- [ ] **Step 2: Add mobile menu overlay CSS**

```css
/* --- Mobile Menu Overlay --- */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: var(--surface-1);
  z-index: 200;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 80px var(--space-xl) var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.mobile-menu.is-open {
  transform: translateX(0);
}

.mobile-menu__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 199;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.mobile-menu__overlay.is-open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-menu__close {
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  background: none;
  border: none;
  color: var(--ink);
  cursor: pointer;
  padding: var(--space-xs);
}

.mobile-menu__link {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  display: block;
  opacity: 0;
  transform: translateX(20px);
}

.mobile-menu.is-open .mobile-menu__link {
  opacity: 1;
  transform: translateX(0);
}
```

- [ ] **Step 3: Add footer CSS**

```css
/* --- Footer --- */
.footer {
  background: var(--canvas);
  border-top: 1px solid var(--hairline);
  padding: var(--space-2xl) 0;
}

.footer__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-xl);
}

.footer__brand {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--ink);
  margin-bottom: var(--space-md);
  letter-spacing: -0.02em;
}

.footer__brand span {
  color: var(--primary);
}

.footer__tagline {
  color: var(--ink-subtle);
  font-size: var(--text-sm);
  line-height: 1.6;
  max-width: 280px;
}

.footer__heading {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--ink-muted);
  margin-bottom: var(--space-md);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.footer__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer__link {
  color: var(--ink-subtle);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color 0.3s ease;
}

.footer__link:hover {
  color: var(--ink);
}

.footer__bottom {
  max-width: 1280px;
  margin: var(--space-xl) auto 0;
  padding: var(--space-lg) var(--space-lg) 0;
  border-top: 1px solid var(--hairline);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ink-tertiary);
  font-size: var(--text-sm);
}
```

- [ ] **Step 4: Add sticky mobile CTA bar CSS**

```css
/* --- Sticky Mobile CTA --- */
.sticky-cta {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  background: var(--primary);
  height: 60px;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.sticky-cta.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.sticky-cta__link {
  color: var(--on-primary);
  font-weight: 600;
  font-size: var(--text-base);
  text-decoration: none;
}
```

- [ ] **Step 5: Add responsive nav/footer/sticky-cta styles**

```css
@media (max-width: 767px) {
  .nav__links { display: none; }
  .nav__cta { display: none; }
  .nav__hamburger { display: block; }
  .sticky-cta { display: flex; }
  .footer__inner {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
  }
}
```

- [ ] **Step 6: Document the nav HTML pattern**

This exact markup goes at the top of every page's `<body>`, inside `[data-barba="wrapper"]`:

```html
<!-- Navigation -->
<nav class="nav" role="navigation" aria-label="Main navigation">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo">We<span>Compound</span></a>
    <ul class="nav__links">
      <li><a href="index.html" class="nav__link nav__link--active">Home</a></li>
      <li><a href="services.html" class="nav__link">Services</a></li>
      <li><a href="work.html" class="nav__link">Work</a></li>
      <li><a href="contact.html" class="nav__link">Contact</a></li>
    </ul>
    <a href="contact.html" class="btn-primary nav__cta">Talk to us</a>
    <button class="nav__hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu__overlay"></div>
<div class="mobile-menu" role="dialog" aria-label="Mobile menu">
  <button class="mobile-menu__close" aria-label="Close menu">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </button>
  <a href="index.html" class="mobile-menu__link">Home</a>
  <a href="services.html" class="mobile-menu__link">Services</a>
  <a href="work.html" class="mobile-menu__link">Work</a>
  <a href="contact.html" class="mobile-menu__link">Contact</a>
  <a href="contact.html" class="btn-primary" style="margin-top: auto;">Talk to us</a>
</div>
```

Change `nav__link--active` to the correct page on each HTML file.

- [ ] **Step 7: Document the footer HTML pattern**

This exact markup goes at the bottom of every page, inside `[data-barba="container"]`:

```html
<footer class="footer">
  <div class="footer__inner">
    <div class="footer__col">
      <div class="footer__brand">We<span>Compound</span></div>
      <p class="footer__tagline">We build the online presence that gets your business paid.</p>
    </div>
    <div class="footer__col">
      <h4 class="footer__heading">Pages</h4>
      <ul class="footer__links">
        <li><a href="index.html" class="footer__link">Home</a></li>
        <li><a href="services.html" class="footer__link">Services</a></li>
        <li><a href="work.html" class="footer__link">Work</a></li>
        <li><a href="contact.html" class="footer__link">Contact</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h4 class="footer__heading">Services</h4>
      <ul class="footer__links">
        <li><a href="services.html" class="footer__link">Web Design</a></li>
        <li><a href="services.html" class="footer__link">SEO Strategy</a></li>
        <li><a href="services.html" class="footer__link">AI Tools</a></li>
        <li><a href="services.html" class="footer__link">Media Production</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h4 class="footer__heading">Contact</h4>
      <ul class="footer__links">
        <li><a href="mailto:hello@wecompound.ie" class="footer__link">hello@wecompound.ie</a></li>
        <li><a href="tel:+353XXXXXXXX" class="footer__link">+353 XX XXX XXXX</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <span>&copy; <span class="js-year"></span> WeCompound</span>
    <span>All rights reserved</span>
  </div>
</footer>

<!-- Sticky Mobile CTA -->
<div class="sticky-cta">
  <a href="contact.html" class="sticky-cta__link">Let's talk</a>
</div>
```

- [ ] **Step 8: Commit**

```
git add wecompound/css/styles.css
git commit -m "feat(wecompound): add nav, footer, mobile menu, sticky CTA styles"
```

---

## Task 3: Home Page (index.html)

**Files:**
- Create: `wecompound/index.html`

- [ ] **Step 1: Create index.html with full document structure**

Write `wecompound/index.html` with:

1. `<!DOCTYPE html>`, `<html lang="en">`
2. `<head>`:
   - Charset, viewport meta
   - `<title>WeCompound — We Build the Online Presence That Gets Your Business Paid</title>`
   - Meta description: "WeCompound is a growth agency that compounds your revenue through websites, SEO, AI tools, and premium media production. Based in Ireland."
   - Open Graph tags (og:title, og:description, og:image, og:url="https://wecompound.ie", og:type="website")
   - Twitter Card meta tags (summary_large_image)
   - Canonical URL: `https://wecompound.ie/`
   - Favicon: inline SVG (green circle or "W" mark)
   - Google Fonts `<link>` tags with preconnect
   - Critical CSS in `<style>` tag (canvas bg, ink color, font-family, nav height offset)
   - `<link rel="stylesheet" href="css/styles.css">`
3. `<body>`:
   - Skip-to-content link: `<a href="#main" class="skip-link">Skip to content</a>`
   - Preloader div: `.preloader` with "WeCompound" wordmark inside
   - `[data-barba="wrapper"]` wrapping everything after preloader
   - Nav markup (from Task 2 step 6, with `nav__link--active` on Home)
   - Mobile menu markup
   - `[data-barba="container" data-barba-namespace="home"]`
   - `<main id="main">`

- [ ] **Step 2: Add hero section HTML**

Inside `<main>`, add:

```html
<section class="hero" id="hero">
  <div class="hero__vanta" id="vanta-bg"></div>
  <div class="hero__content container">
    <span class="eyebrow">Growth Agency</span>
    <h1 class="hero__title">We build the online presence that gets your business paid.</h1>
    <p class="hero__sub">We compound your growth, your visibility, your leads.</p>
    <div class="hero__actions">
      <a href="contact.html" class="btn-primary">Talk to us</a>
      <a href="work.html" class="btn-secondary">See our work</a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add services bento grid section HTML**

```html
<section class="services-overview" id="services">
  <div class="container">
    <span class="eyebrow">What we do</span>
    <h2 class="section-title">Four ways we compound your growth</h2>
    <div class="bento-grid">
      <div class="card bento-grid__item bento-grid__item--wide">
        <div class="card__icon"><!-- inline SVG: monitor/code icon --></div>
        <h3 class="card__title">Web Design & Development</h3>
        <p class="card__desc">Premium websites built to convert visitors into customers. No templates, no frameworks — hand-crafted code that loads fast and ranks higher.</p>
      </div>
      <div class="card bento-grid__item">
        <div class="card__icon"><!-- inline SVG: search/chart icon --></div>
        <h3 class="card__title">SEO & Visibility</h3>
        <p class="card__desc">Get found by the people already searching for what you sell. Local SEO, technical audits, and content that ranks.</p>
      </div>
      <div class="card bento-grid__item">
        <div class="card__icon"><!-- inline SVG: AI/brain icon --></div>
        <h3 class="card__title">AI Implementation</h3>
        <p class="card__desc">Automate the repetitive. AI chatbots, workflow automation, and smart tools that save hours every week.</p>
      </div>
      <div class="card card--featured bento-grid__item bento-grid__item--wide">
        <div class="card__icon"><!-- inline SVG: camera icon --></div>
        <h3 class="card__title">Premium Media Production</h3>
        <p class="card__desc">We show up with the camera too. Professional video, photography, and creative direction — the content that makes your website actually work.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add stats/social proof section HTML**

```html
<section class="stats-strip">
  <div class="container">
    <div class="stats-strip__grid">
      <div class="stat">
        <span class="stat__number" data-target="12">0</span><span class="stat__suffix">+</span>
        <span class="stat__label">Businesses grown</span>
      </div>
      <div class="stat">
        <span class="stat__number" data-target="3">0</span><span class="stat__suffix">x</span>
        <span class="stat__label">Average traffic increase</span>
      </div>
      <div class="stat">
        <span class="stat__number" data-target="100">0</span><span class="stat__suffix">%</span>
        <span class="stat__label">Client retention</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Add featured work section HTML**

```html
<section class="featured-work" id="work-preview">
  <div class="container">
    <span class="eyebrow">Selected work</span>
    <h2 class="section-title">Results, not just websites</h2>
    <div class="work-grid">
      <a href="work.html" class="work-card work-card--large">
        <div class="work-card__thumb"></div>
        <div class="work-card__info">
          <span class="tag">Industry</span>
          <h3 class="work-card__title">Project Name</h3>
          <p class="work-card__result">One-line result description</p>
        </div>
      </a>
      <a href="work.html" class="work-card">
        <div class="work-card__thumb"></div>
        <div class="work-card__info">
          <span class="tag">Industry</span>
          <h3 class="work-card__title">Project Name</h3>
          <p class="work-card__result">One-line result description</p>
        </div>
      </a>
      <a href="work.html" class="work-card">
        <div class="work-card__thumb"></div>
        <div class="work-card__info">
          <span class="tag">Industry</span>
          <h3 class="work-card__title">Project Name</h3>
          <p class="work-card__result">One-line result description</p>
        </div>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Add CTA banner + footer + scripts**

```html
<section class="cta-banner">
  <div class="container">
    <div class="cta-banner__inner">
      <h2>Ready to compound your growth?</h2>
      <p class="cta-banner__sub">Let's talk about what's holding your business back online.</p>
      <a href="contact.html" class="btn-primary">Get my free consultation</a>
    </div>
  </div>
</section>
```

Then add footer markup (from Task 2 step 7), close `</main>`, `</div>` (barba container), sticky CTA, close `</div>` (barba wrapper).

Then add script tags before `</body>`:

```html
<!-- Libraries -->
<script src="https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@latest/dist/lenis.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/@barba/core@latest/dist/barba.umd.js" defer></script>
<!-- App -->
<script src="js/main.js" defer></script>
```

Add Organization JSON-LD schema:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WeCompound",
  "url": "https://wecompound.ie",
  "description": "Growth agency that compounds your revenue through websites, SEO, AI tools, and premium media production.",
  "email": "hello@wecompound.ie",
  "sameAs": []
}
</script>
```

- [ ] **Step 7: Commit**

```
git add wecompound/index.html
git commit -m "feat(wecompound): add home page HTML"
```

---

## Task 4: Home Page CSS — Sections & Layout

**Files:**
- Modify: `wecompound/css/styles.css` (append section-specific styles)

- [ ] **Step 1: Add preloader CSS**

```css
/* --- Preloader --- */
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--canvas);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.preloader.is-done {
  transform: translateY(-100%);
}

.preloader__wordmark {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.03em;
  opacity: 0;
  animation: preloaderFade 1s ease forwards;
}

.preloader__wordmark span {
  color: var(--primary);
}

@keyframes preloaderFade {
  0% { opacity: 0; transform: translateY(10px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 1; transform: translateY(0); }
}

.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-md);
  background: var(--primary);
  color: var(--on-primary);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-md);
  z-index: 10000;
  font-size: var(--text-sm);
}

.skip-link:focus {
  top: var(--space-md);
}
```

- [ ] **Step 2: Add hero section CSS**

```css
/* --- Hero --- */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 64px; /* nav height */
  overflow: hidden;
}

.hero__vanta {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.hero__title {
  font-size: var(--text-3xl);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: var(--space-lg);
}

.hero__sub {
  font-size: var(--text-lg);
  color: var(--ink-muted);
  line-height: 1.5;
  margin-bottom: var(--space-xl);
  max-width: 600px;
}

.hero__actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}
```

- [ ] **Step 3: Add bento grid CSS**

```css
/* --- Bento Grid (services overview) --- */
.services-overview {
  padding-block: var(--space-section);
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-top: var(--space-md);
  margin-bottom: var(--space-2xl);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

.bento-grid__item--wide {
  grid-column: span 2;
}

.card__icon {
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-md);
  color: var(--primary);
}

.card__icon svg {
  width: 100%;
  height: 100%;
}

.card__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-sm);
}

.card__desc {
  color: var(--ink-muted);
  font-size: var(--text-base);
  line-height: 1.6;
}

@media (max-width: 767px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-grid__item--wide {
    grid-column: span 1;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 4: Add stats strip CSS**

```css
/* --- Stats Strip --- */
.stats-strip {
  padding-block: var(--space-2xl);
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}

.stats-strip__grid {
  display: flex;
  justify-content: center;
  gap: clamp(var(--space-2xl), 8vw, 120px);
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat__number {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.03em;
  line-height: 1;
}

.stat__suffix {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.03em;
}

.stat__label {
  display: block;
  margin-top: var(--space-xs);
  color: var(--ink-subtle);
  font-size: var(--text-sm);
}
```

- [ ] **Step 5: Add featured work grid CSS**

```css
/* --- Featured Work --- */
.featured-work {
  padding-block: var(--space-section);
}

.work-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-template-rows: auto auto;
  gap: var(--space-md);
}

.work-card {
  display: block;
  text-decoration: none;
  color: var(--ink);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.work-card:hover {
  transform: translateY(-4px);
  border-color: var(--hairline-strong);
}

.work-card--large {
  grid-row: span 2;
}

.work-card__thumb {
  aspect-ratio: 16 / 10;
  background: var(--surface-2);
  /* placeholder — swap bg for actual screenshot later */
}

.work-card--large .work-card__thumb {
  aspect-ratio: 16 / 14;
}

.work-card__info {
  padding: var(--space-lg);
}

.work-card__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: var(--space-xs);
  margin-bottom: var(--space-xs);
}

.work-card__result {
  color: var(--ink-muted);
  font-size: var(--text-sm);
}

@media (max-width: 767px) {
  .work-grid {
    grid-template-columns: 1fr;
  }
  .work-card--large {
    grid-row: span 1;
  }
}
```

- [ ] **Step 6: Add CTA banner CSS**

```css
/* --- CTA Banner --- */
.cta-banner {
  padding-block: var(--space-section);
}

.cta-banner__inner {
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  text-align: center;
}

.cta-banner__inner h2 {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: var(--space-md);
}

.cta-banner__sub {
  color: var(--ink-muted);
  font-size: var(--text-lg);
  margin-bottom: var(--space-xl);
  max-width: 500px;
  margin-inline: auto;
}
```

- [ ] **Step 7: Verify index.html in browser**

Open `wecompound/index.html` in Chrome. Verify:
- Canvas background renders near-black
- All text is legible (ink on canvas)
- Bento grid is asymmetric (2-col + 1-col cards)
- Money-green primary buttons render correctly
- Footer grid lays out properly
- Check at 360px, 768px, and 1440px widths

- [ ] **Step 8: Commit**

```
git add wecompound/css/styles.css
git commit -m "feat(wecompound): add home page section styles"
```

---

## Task 5: Services Page (services.html)

**Files:**
- Create: `wecompound/services.html`
- Modify: `wecompound/css/styles.css` (append service page styles)

- [ ] **Step 1: Create services.html**

Write `wecompound/services.html` with:
- Same `<head>` pattern as index.html but with unique title: "Services — WeCompound | Growth Agency Ireland"
- Meta description: "Web design, SEO strategy, AI implementation, and premium media production. WeCompound builds what gets your business paid."
- Unique OG tags, canonical URL: `https://wecompound.ie/services.html`
- Same nav markup (with `nav__link--active` on Services)
- `data-barba-namespace="services"`
- No Vanta script tags (not needed on this page) — but keep Three.js/Vanta in the shared script block since Barba.js may transition to the home page

Hero section:
```html
<section class="page-hero">
  <div class="container">
    <span class="eyebrow">Our services</span>
    <h1 class="page-hero__title">Everything your business needs to grow online.</h1>
    <p class="page-hero__sub">Most agencies build websites. We build revenue machines — then hand you the keys.</p>
  </div>
</section>
```

Four service detail sections with alternating layouts:
```html
<section class="service-detail" id="web-design">
  <div class="container service-detail__inner">
    <div class="service-detail__content">
      <span class="eyebrow">Web Design & Development</span>
      <h2 class="service-detail__title">Your website is losing you money. Let's fix that.</h2>
      <p class="service-detail__desc">A slow, dated, or generic website tells potential customers you're not serious. We build premium sites from scratch — no templates, no page builders — that load fast, rank high, and convert visitors into paying customers.</p>
      <ul class="service-detail__list">
        <li>Custom-coded static sites (no WordPress bloat)</li>
        <li>Mobile-first responsive design</li>
        <li>Conversion-optimised landing pages</li>
        <li>Smooth scroll animations and page transitions</li>
        <li>Hosting setup and deployment</li>
      </ul>
    </div>
    <div class="service-detail__visual">
      <!-- Placeholder visual — surface-1 panel -->
      <div class="service-visual-placeholder"></div>
    </div>
  </div>
</section>
```

Repeat for SEO & Visibility, AI Tools & Automation, and Premium Media Production (the differentiator section gets a larger/featured treatment with accent border).

PAS copy for each:
- **SEO**: "You're invisible online. Your competitors aren't." → agitate with cost of not being found → solution
- **AI**: "You're doing manually what a machine could do in seconds." → agitate with wasted hours → solution
- **Media**: "Stock photos tell your customers you're not real." → agitate with generic looking sites → solution: "We show up with the camera too."

End with CTA banner (same pattern as home page), footer, scripts.

- [ ] **Step 2: Add service detail CSS to styles.css**

```css
/* --- Page Hero (non-home pages) --- */
.page-hero {
  padding-top: calc(64px + var(--space-section));
  padding-bottom: var(--space-2xl);
}

.page-hero__title {
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  max-width: 800px;
  margin-bottom: var(--space-lg);
}

.page-hero__sub {
  font-size: var(--text-lg);
  color: var(--ink-muted);
  line-height: 1.5;
  max-width: 600px;
}

/* --- Service Detail --- */
.service-detail {
  padding-block: var(--space-section);
  border-top: 1px solid var(--hairline);
}

.service-detail__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  align-items: center;
}

.service-detail:nth-child(even) .service-detail__inner {
  direction: rtl;
}

.service-detail:nth-child(even) .service-detail__inner > * {
  direction: ltr;
}

.service-detail__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-top: var(--space-md);
  margin-bottom: var(--space-lg);
}

.service-detail__desc {
  color: var(--ink-muted);
  font-size: var(--text-base);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.service-detail__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.service-detail__list li {
  color: var(--ink-muted);
  font-size: var(--text-base);
  padding-left: var(--space-lg);
  position: relative;
}

.service-detail__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
}

.service-visual-placeholder {
  aspect-ratio: 4 / 3;
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-xl);
}

.service-detail--featured {
  background: var(--surface-1);
  border-top: 2px solid var(--primary);
}

@media (max-width: 767px) {
  .service-detail__inner {
    grid-template-columns: 1fr;
  }
  .service-detail:nth-child(even) .service-detail__inner {
    direction: ltr;
  }
}
```

- [ ] **Step 3: Commit**

```
git add wecompound/services.html wecompound/css/styles.css
git commit -m "feat(wecompound): add services page"
```

---

## Task 6: Work Page (work.html)

**Files:**
- Create: `wecompound/work.html`
- Modify: `wecompound/css/styles.css` (append portfolio styles)

- [ ] **Step 1: Create work.html**

Write `wecompound/work.html` with:
- Title: "Work — WeCompound | Growth Agency Ireland"
- Meta description: "See the websites, SEO strategies, and media we've produced for businesses across Ireland. Real results, not just pretty pages."
- `data-barba-namespace="work"`
- Nav with `nav__link--active` on Work

Hero:
```html
<section class="page-hero">
  <div class="container">
    <span class="eyebrow">Our work</span>
    <h1 class="page-hero__title">Work that gets results.</h1>
    <p class="page-hero__sub">We measure success by one thing: did the client's revenue grow?</p>
  </div>
</section>
```

Project grid with 4 placeholder cards. Each card:
```html
<div class="project-card" data-project="project-1">
  <div class="project-card__thumb"></div>
  <div class="project-card__info">
    <span class="tag">Industry</span>
    <h3 class="project-card__title">Project Name</h3>
    <p class="project-card__result">One-line result description</p>
    <span class="project-card__link">View project <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 12l4-4-4-4"/></svg></span>
  </div>
</div>
```

Expanding panel (hidden by default, revealed on click):
```html
<div class="project-panel" id="project-1-panel">
  <div class="project-panel__inner container">
    <button class="project-panel__close" aria-label="Close project details">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <div class="project-panel__screenshots">
      <div class="project-panel__screenshot-placeholder"></div>
    </div>
    <div class="project-panel__details">
      <h2 class="project-panel__title">Project Name</h2>
      <p class="project-panel__desc">Brief description of the project, the client's challenge, and what we delivered.</p>
      <div class="project-panel__meta">
        <div class="project-panel__meta-item">
          <span class="project-panel__meta-label">Services</span>
          <span class="project-panel__meta-value">Web Design, Media Production</span>
        </div>
        <div class="project-panel__meta-item">
          <span class="project-panel__meta-label">Result</span>
          <span class="project-panel__meta-value">Key result metric</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

Repeat for 4 projects. CTA banner, footer, scripts.

- [ ] **Step 2: Add portfolio CSS to styles.css**

```css
/* --- Project Grid (Work page) --- */
.project-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  grid-template-rows: auto auto;
  gap: var(--space-md);
  padding-bottom: var(--space-section);
}

.project-card {
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.project-card:first-child {
  grid-row: span 2;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--hairline-strong);
}

.project-card__thumb {
  aspect-ratio: 16 / 10;
  background: var(--surface-2);
}

.project-card:first-child .project-card__thumb {
  aspect-ratio: 16 / 14;
}

.project-card__info {
  padding: var(--space-lg);
}

.project-card__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: var(--space-xs);
  margin-bottom: var(--space-xs);
}

.project-card__result {
  color: var(--ink-muted);
  font-size: var(--text-sm);
  margin-bottom: var(--space-sm);
}

.project-card__link {
  color: var(--primary);
  font-size: var(--text-sm);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* --- Expanding Project Panel --- */
.project-panel {
  max-height: 0;
  overflow: hidden;
  background: var(--surface-1);
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-panel.is-open {
  max-height: 800px;
}

.project-panel__inner {
  padding: var(--space-2xl) var(--space-lg);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--space-2xl);
  position: relative;
}

.project-panel__close {
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  background: none;
  border: none;
  color: var(--ink-subtle);
  cursor: pointer;
  padding: var(--space-xs);
  transition: color 0.3s ease;
}

.project-panel__close:hover {
  color: var(--ink);
}

.project-panel__screenshot-placeholder {
  aspect-ratio: 16 / 10;
  background: var(--surface-2);
  border-radius: var(--radius-lg);
}

.project-panel__title {
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-md);
}

.project-panel__desc {
  color: var(--ink-muted);
  font-size: var(--text-base);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.project-panel__meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.project-panel__meta-label {
  display: block;
  font-size: var(--text-sm);
  color: var(--ink-subtle);
  margin-bottom: 4px;
}

.project-panel__meta-value {
  font-size: var(--text-base);
  color: var(--ink);
}

@media (max-width: 767px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
  .project-card:first-child {
    grid-row: span 1;
  }
  .project-panel__inner {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Commit**

```
git add wecompound/work.html wecompound/css/styles.css
git commit -m "feat(wecompound): add work/portfolio page with expanding panels"
```

---

## Task 7: Contact Page (contact.html)

**Files:**
- Create: `wecompound/contact.html`
- Modify: `wecompound/css/styles.css` (append contact page styles)

- [ ] **Step 1: Create contact.html**

Write `wecompound/contact.html` with:
- Title: "Contact — WeCompound | Growth Agency Ireland"
- Meta description: "Get in touch with WeCompound. Free consultation on how we can grow your business online through web design, SEO, AI, and media production."
- `data-barba-namespace="contact"`
- Nav with `nav__link--active` on Contact

```html
<section class="page-hero">
  <div class="container">
    <span class="eyebrow">Get in touch</span>
    <h1 class="page-hero__title">Let's talk about your growth.</h1>
    <p class="page-hero__sub">Tell us where you are and where you want to be. We'll figure out the fastest way to get you there.</p>
  </div>
</section>

<section class="contact-section">
  <div class="container contact-grid">
    <form class="contact-form" action="#" method="POST">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" name="name" class="form-input" required autocomplete="name">
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" name="email" class="form-input" required autocomplete="email">
      </div>
      <div class="form-group">
        <label for="phone" class="form-label">Phone <span class="form-optional">(optional)</span></label>
        <input type="tel" id="phone" name="phone" class="form-input" autocomplete="tel">
      </div>
      <div class="form-group">
        <label for="message" class="form-label">Tell us about your business</label>
        <textarea id="message" name="message" class="form-input form-textarea" rows="5" required></textarea>
      </div>
      <button type="submit" class="btn-primary contact-form__submit">Get my free consultation</button>
      <p class="form-privacy">We'll get back to you within 24 hours. No spam, ever.</p>
    </form>
    <div class="contact-direct">
      <h2 class="contact-direct__title">Or reach us directly</h2>
      <div class="contact-direct__items">
        <div class="contact-direct__item">
          <span class="contact-direct__label">Email</span>
          <a href="mailto:hello@wecompound.ie" class="contact-direct__value">hello@wecompound.ie</a>
        </div>
        <div class="contact-direct__item">
          <span class="contact-direct__label">Phone</span>
          <a href="tel:+353XXXXXXXX" class="contact-direct__value">+353 XX XXX XXXX</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

Footer, scripts (no Vanta needed).

- [ ] **Step 2: Add contact page CSS to styles.css**

```css
/* --- Contact --- */
.contact-section {
  padding-bottom: var(--space-section);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: var(--space-2xl);
  align-items: start;
}

.form-group {
  margin-bottom: var(--space-lg);
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--ink-muted);
  margin-bottom: var(--space-xs);
}

.form-optional {
  color: var(--ink-tertiary);
  font-weight: 400;
}

.form-input {
  width: 100%;
  background: var(--surface-1);
  color: var(--ink);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-focus);
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form__submit {
  width: 100%;
  padding: 16px 32px;
  font-size: var(--text-base);
}

.form-privacy {
  color: var(--ink-tertiary);
  font-size: var(--text-sm);
  margin-top: var(--space-md);
  text-align: center;
}

.contact-direct {
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}

.contact-direct__title {
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-lg);
}

.contact-direct__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.contact-direct__label {
  display: block;
  font-size: var(--text-sm);
  color: var(--ink-subtle);
  margin-bottom: 4px;
}

.contact-direct__value {
  color: var(--primary);
  text-decoration: none;
  font-size: var(--text-base);
  transition: color 0.3s ease;
}

.contact-direct__value:hover {
  color: var(--primary-hover);
}

@media (max-width: 767px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Commit**

```
git add wecompound/contact.html wecompound/css/styles.css
git commit -m "feat(wecompound): add contact page with form"
```

---

## Task 8: 404 Page

**Files:**
- Create: `wecompound/404.html`

- [ ] **Step 1: Create 404.html**

Minimal branded 404 page:
- Same `<head>` pattern, title: "Page Not Found — WeCompound"
- No meta description or OG tags needed
- `data-barba-namespace="404"`
- Nav (no active link)

```html
<main id="main" class="page-404">
  <div class="container">
    <span class="eyebrow">404</span>
    <h1 class="page-hero__title">This page doesn't exist.</h1>
    <p class="page-hero__sub">But your business's growth potential does.</p>
    <a href="index.html" class="btn-primary">Back to home</a>
  </div>
</main>
```

```css
/* --- 404 --- */
.page-404 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 64px;
}
```

Footer, scripts.

- [ ] **Step 2: Commit**

```
git add wecompound/404.html wecompound/css/styles.css
git commit -m "feat(wecompound): add branded 404 page"
```

---

## Task 9: JavaScript — Core (Lenis, GSAP, Preloader)

**Files:**
- Create: `wecompound/js/main.js`

- [ ] **Step 1: Create main.js with initialization structure**

Write `wecompound/js/main.js` with the full JS file. Structure:

```javascript
// main.js — WeCompound
// All initialization runs after DOM + libraries load

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
});

/* ---------- Preloader ---------- */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) { initApp(); return; }

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('is-done');
      preloader.addEventListener('transitionend', () => {
        preloader.remove();
        initApp();
      }, { once: true });
    }, 1500);
  });
}

function initApp() {
  initLenis();
  initGSAP();
  initVanta();
  initBarba();
  initMobileMenu();
  initStickyCta();
  initCountUp();
  initProjectPanels();
  initDynamicYear();
  initScrollToTop();
}

/* ---------- Lenis Smooth Scroll ---------- */
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  window.__lenis = lenis;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* ---------- GSAP Scroll Animations ---------- */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero word-by-word reveal
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const words = heroTitle.textContent.split(' ');
    heroTitle.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
    gsap.from('.hero__title .word', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power2.out',
      delay: 0.2,
    });
    gsap.from('.hero__sub, .hero__actions', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.8,
    });
  }

  // Page hero fade-in (non-home pages)
  gsap.from('.page-hero .eyebrow, .page-hero__title, .page-hero__sub', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.1,
  });

  // Section entrance animations
  const sections = document.querySelectorAll(
    '.services-overview, .stats-strip, .featured-work, .cta-banner, .service-detail, .contact-section'
  );

  sections.forEach(section => {
    gsap.from(section.children, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  });

  // Card stagger
  const cardGroups = document.querySelectorAll('.bento-grid, .work-grid, .project-grid');
  cardGroups.forEach(group => {
    const cards = group.children;
    gsap.from(cards, {
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      scale: 0.97,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  });
}

/* ---------- Vanta.js Hero Background ---------- */
function initVanta() {
  if (typeof VANTA === 'undefined') return;
  const el = document.getElementById('vanta-bg');
  if (!el) return;

  VANTA.NET({
    el: el,
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x22c55e,
    backgroundColor: 0x010102,
    points: 8.00,
    maxDistance: 22.00,
    spacing: 18.00,
    showDots: true,
  });
}

/* ---------- Barba.js Page Transitions ---------- */
function initBarba() {
  if (typeof barba === 'undefined') return;

  // Create transition progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'barba-progress';
  progressBar.innerHTML = '<div class="barba-progress__bar"></div>';
  document.body.appendChild(progressBar);

  barba.init({
    transitions: [{
      name: 'fade',
      leave(data) {
        const bar = document.querySelector('.barba-progress__bar');
        return gsap.timeline()
          .to(bar, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
          .to(data.current.container, { opacity: 0, duration: 0.3, ease: 'power2.inOut' }, 0);
      },
      enter(data) {
        const bar = document.querySelector('.barba-progress__bar');
        window.scrollTo(0, 0);
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        return gsap.timeline()
          .from(data.next.container, { opacity: 0, duration: 0.3, ease: 'power2.inOut' })
          .to(bar, { scaleX: 0, duration: 0.2, ease: 'power2.in' }, 0.1);
      },
      after() {
        ScrollTrigger.getAll().forEach(t => t.kill());
        initGSAP();
        initVanta();
        initCountUp();
        initProjectPanels();
        initStickyCta();
        initDynamicYear();
        updateActiveNav();
      }
    }]
  });
}

function updateActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    link.classList.remove('nav__link--active');
    if (link.getAttribute('href') === path) {
      link.classList.add('nav__link--active');
    }
  });
}
```

- [ ] **Step 2: Add interaction functions to main.js**

Append to `wecompound/js/main.js`:

```javascript
/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu__overlay');
  const closeBtn = document.querySelector('.mobile-menu__close');
  if (!hamburger || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    overlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Stagger link animation
    const links = menu.querySelectorAll('.mobile-menu__link');
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(links,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
      );
    }
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
}

/* ---------- Sticky Mobile CTA ---------- */
function initStickyCta() {
  const stickyCta = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero, .page-hero');
  if (!stickyCta || !hero) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyCta.classList.add('is-visible');
      } else {
        stickyCta.classList.remove('is-visible');
      }
    });
  }, { threshold: 0 });

  observer.observe(hero);
}

/* ---------- Count-Up Animation ---------- */
function initCountUp() {
  const counters = document.querySelectorAll('.stat__number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ---------- Project Panels (Work page) ---------- */
function initProjectPanels() {
  const cards = document.querySelectorAll('.project-card[data-project]');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      const panel = document.getElementById(`${projectId}-panel`);
      if (!panel) return;

      // Close any open panel
      document.querySelectorAll('.project-panel.is-open').forEach(p => {
        if (p !== panel) p.classList.remove('is-open');
      });

      panel.classList.toggle('is-open');

      if (panel.classList.contains('is-open')) {
        setTimeout(() => {
          panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  });

  // Close buttons
  document.querySelectorAll('.project-panel__close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.closest('.project-panel').classList.remove('is-open');
    });
  });
}

/* ---------- Dynamic Year ---------- */
function initDynamicYear() {
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Scroll to Top ---------- */
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 16V4M4 10l6-6 6 6"/></svg>';
  document.body.appendChild(btn);

  const hero = document.querySelector('.hero, .page-hero');
  if (hero) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        btn.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    observer.observe(hero);
  }

  btn.addEventListener('click', () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
```

- [ ] **Step 3: Add Barba progress bar and scroll-to-top CSS to styles.css**

```css
/* --- Barba Progress Bar --- */
.barba-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 9999;
  pointer-events: none;
}

.barba-progress__bar {
  width: 100%;
  height: 100%;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left;
}

/* --- Scroll to Top --- */
.scroll-top {
  position: fixed;
  bottom: 80px;
  right: var(--space-lg);
  z-index: 80;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--hairline);
  color: var(--ink);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s ease;
  pointer-events: none;
}

.scroll-top.is-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.scroll-top:hover {
  background: var(--surface-3);
}

@media (max-width: 767px) {
  .scroll-top {
    bottom: 76px; /* above sticky CTA */
  }
}
```

- [ ] **Step 4: Verify in browser**

Open `wecompound/index.html` in Chrome. Verify:
- Preloader appears, wordmark fades in, slides up after 1.5s
- Vanta.js net renders with green nodes on dark background
- Hero headline reveals word by word
- Scroll down — sections fade in
- Stats count up when scrolled into view
- Cards lift on hover
- Mobile menu opens/closes at 360px width
- Sticky CTA bar appears on mobile after scrolling past hero
- Navigate to other pages (links may not work yet without Barba since pages exist)

- [ ] **Step 5: Commit**

```
git add wecompound/js/main.js wecompound/css/styles.css
git commit -m "feat(wecompound): add all JavaScript — Lenis, GSAP, Barba, Vanta, interactions"
```

---

## Task 10: Inline SVG Icons + Final Polish

**Files:**
- Modify: `wecompound/index.html` (add SVG icons to service cards)
- Modify: `wecompound/css/styles.css` (any remaining responsive fixes)

- [ ] **Step 1: Add inline SVG icons to service cards on index.html**

Replace each `<!-- inline SVG: ... -->` placeholder in the bento grid with actual SVGs:

**Monitor/Code icon** (Web Design):
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="6" width="40" height="28" rx="3"/><path d="M16 40h16M24 34v6M18 20l4 4-4 4M28 28h6"/>
</svg>
```

**Search/Chart icon** (SEO):
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="20" cy="20" r="14"/><path d="M30 30l10 10M14 22v-6M20 22v-10M26 22v-4"/>
</svg>
```

**AI/Brain icon** (AI Implementation):
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M24 4C13 4 8 12 8 20s5 16 16 24c11-8 16-16 16-24S35 4 24 4z"/><circle cx="18" cy="18" r="2" fill="currentColor"/><circle cx="30" cy="18" r="2" fill="currentColor"/><path d="M18 18h12M18 18c0 6 6 10 6 10s6-4 6-10"/>
</svg>
```

**Camera icon** (Media Production):
```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 16a2 2 0 012-2h6l4-4h12l4 4h6a2 2 0 012 2v20a2 2 0 01-2 2H8a2 2 0 01-2-2V16z"/><circle cx="24" cy="26" r="8"/>
</svg>
```

- [ ] **Step 2: Add full-bleed container-break element**

Per CLAUDE.md checklist: "At least one full-bleed or container-breaking element per page." The stats strip already spans full width. Add a subtle full-bleed treatment:

```css
.stats-strip {
  /* already full-width by default — no container constraint */
  background: var(--surface-1);
}
```

Ensure `.stats-strip` on index.html is NOT inside `.container` — it should be a direct child of `<main>`, with its own inner `.container` for the content.

- [ ] **Step 3: Final responsive sweep**

Add any remaining responsive styles to `styles.css`:

```css
@media (max-width: 767px) {
  .hero__title {
    font-size: var(--text-2xl);
  }
  .hero__content {
    padding-top: var(--space-2xl);
  }
  .hero__actions {
    flex-direction: column;
    gap: var(--space-sm);
  }
  .hero__actions .btn-primary,
  .hero__actions .btn-secondary {
    width: 100%;
    text-align: center;
  }
  .page-hero {
    padding-top: calc(64px + var(--space-2xl));
  }
  body {
    padding-bottom: 60px; /* space for sticky CTA */
  }
}
```

- [ ] **Step 4: Commit**

```
git add wecompound/
git commit -m "feat(wecompound): add SVG icons, full-bleed elements, responsive polish"
```

---

## Task 11: Browser Review

**Files:** None (read-only verification)

- [ ] **Step 1: Review at 1440px (desktop)**

Open `wecompound/index.html` in Chrome at 1440px width. Walk through the CHECKLIST.md items:

Design:
- Distinctive font pairing (not forbidden list)
- clamp() fluid sizes
- Asymmetric bento grid
- Generous section spacing
- Money-green accent, dark canvas (not pure black)
- SVG icons consistent style

Motion:
- Preloader → word reveal → section fade-ins
- Vanta.js net background
- Card hover lifts
- Nav link underline slide-in
- Stats count up

Conversion:
- PAS hero copy
- First-person CTA language
- Social proof stats below hero area
- CTA banner at bottom

- [ ] **Step 2: Review at 768px (tablet)**

Resize to 768px:
- Bento grid collapses to 2-col
- Service detail grid stacks properly
- Footer grid becomes 2-col
- Nav links still visible (hamburger at <768px)

- [ ] **Step 3: Review at 360px (mobile)**

Resize to 360px:
- Hamburger menu appears, nav links hidden
- Mobile menu slides in from right
- Sticky CTA bar at bottom
- All tap targets ≥44px
- No horizontal scroll
- Text readable without zoom
- Hero buttons stack vertically

- [ ] **Step 4: Navigate between pages**

Click through Home → Services → Work → Contact:
- Barba.js fade transitions work
- Green progress bar slides across top
- Scroll position resets on each page
- Animations re-initialize on each page
- Active nav link updates
- Footer consistent across all pages

- [ ] **Step 5: Fix any issues found**

Address problems discovered during review. Common issues:
- Vanta.js not initializing (check CDN load order)
- Barba.js not wrapping properly (verify data-barba attributes)
- GSAP animations not triggering (check ScrollTrigger registration)
- Mobile menu not closing on link click (add close on link click)

- [ ] **Step 6: Final commit**

```
git add wecompound/
git commit -m "fix(wecompound): browser review fixes"
```

---

## Completion Checklist

After all tasks, verify against `reference/CHECKLIST.md`:

- [ ] All design checklist items pass
- [ ] All motion checklist items pass
- [ ] All conversion checklist items pass
- [ ] All mobile checklist items pass
- [ ] All SEO/schema checklist items pass
- [ ] All performance checklist items pass
- [ ] All HTML/accessibility checklist items pass
- [ ] All content checklist items pass (except stock photos — placeholder OK per spec)
