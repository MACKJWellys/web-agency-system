# Quality Checklist

Run through every item before declaring a build complete. Every box must be ticked.

---

## Design

- [ ] Typography is a distinctive pairing (not Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Nunito)
- [ ] Font sizes use `clamp()` for fluid scaling (no fixed px with media query jumps)
- [ ] Heading scale has bold size jumps (h1 is 3x+ body size, not 1.5x)
- [ ] Letter-spacing is slightly negative on large headings (-0.01em to -0.03em)
- [ ] Layout uses asymmetric grids (no three-equal-cards-in-a-row anywhere)
- [ ] Generous whitespace between sections (clamp(4rem, 8vw, 8rem) minimum)
- [ ] All colors defined as CSS custom properties on :root
- [ ] Dark sections use rich darks (#0a0a0a, #111827) not pure black (#000)
- [ ] Glass/blur effects used sparingly and intentionally (nav, modals, floating cards only)
- [ ] At least one full-bleed or container-breaking element per page
- [ ] No generic clip-art or icon fonts — custom SVGs or inline SVG icons throughout
- [ ] Consistent icon style (all outline OR all filled, same stroke width)
- [ ] Visual hierarchy is clear — eye is guided from heading → subtext → CTA naturally

## Motion

- [ ] Lenis smooth scroll initialized and synced with GSAP
- [ ] Every content section has a scroll-triggered entrance animation
- [ ] Hero heading has a staggered character or word reveal
- [ ] Grid items / cards use stagger (0.08-0.15s between items)
- [ ] At least one parallax element per page (hero image, background layer)
- [ ] CTA buttons have magnetic hover or scale effect
- [ ] Cards have subtle lift (translateY) + shadow on hover
- [ ] Nav links have animated underline (slide-in, not instant)
- [ ] Form inputs have focus animation (label float, border color transition)
- [ ] Page transitions via Barba.js or Swup (no hard page reloads)
- [ ] Page preloader animation present (1-2s, then reveals content)
- [ ] Vanta.js hero background (only if appropriate for the niche — skip for restaurants, trades, retail)
- [ ] No animation exceeds 1.5s duration
- [ ] No linear easing on any UI animation
- [ ] All animations use "power2.out" or "power2.inOut"
- [ ] Scroll-to-top button fades in after scrolling past hero

## Conversion

- [ ] Hero section follows PAS framework (Problem → Agitate → Solution)
- [ ] No vague aspirational copy ("Transform your experience", "Unlock the future", etc.)
- [ ] Headlines are specific and benefit-driven with real numbers where possible
- [ ] CTAs use first-person language ("Book my session" not "Book a session")
- [ ] One primary CTA per section (never competing CTAs side by side)
- [ ] Primary CTA is centered with high contrast and generous padding
- [ ] Above-fold includes: headline + value proposition + CTA + social proof (all visible without scrolling)
- [ ] Social proof appears immediately below or within the hero section
- [ ] 3-5 testimonials on homepage with names and context
- [ ] Trust elements near CTAs (ratings, review count, certifications, years in business)
- [ ] Specific numbers used ("200+ clients", "4.9 stars", "15 years") not vague claims
- [ ] Contact form has max 4-5 fields
- [ ] Submit button uses benefit language ("Get my free quote" not "Submit")
- [ ] Privacy reassurance line below contact form
- [ ] Pricing displayed transparently (when applicable to the business)

## Mobile

- [ ] Sticky bottom CTA bar on mobile (appears after scrolling past hero)
- [ ] Click-to-call phone link (`tel:`) in sticky bar and header
- [ ] Hamburger menu on mobile/tablet only (never on desktop)
- [ ] Mobile menu: slide-in overlay with staggered link animation
- [ ] All tap targets minimum 44x44px
- [ ] No horizontal scroll at any viewport width
- [ ] Tested visually at 360px, 768px, 1024px, 1440px
- [ ] Text is readable without zooming on mobile (body 16px minimum)

## Technical — SEO & Schema

- [ ] Unique `<title>` tag per page (format: "Page — Business Name | Location")
- [ ] `<meta name="description">` per page (150-160 chars, includes location + service)
- [ ] Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- [ ] Twitter Card meta tags
- [ ] Canonical URL on every page
- [ ] LocalBusiness JSON-LD schema with name, address, phone, hours, geo, sameAs
- [ ] FAQ schema on any page with an FAQ section
- [ ] AggregateRating schema if reviews are displayed
- [ ] Proper heading hierarchy (one h1 per page, h2 → h3 in order)
- [ ] All images have descriptive alt text
- [ ] Internal links between pages use relative paths

## Technical — Performance

- [ ] Total page weight under 2MB (excluding hero video)
- [ ] All images are WebP format with lazy loading
- [ ] Images have explicit width and height attributes (prevents layout shift)
- [ ] Images use srcset for responsive sizes where appropriate
- [ ] Fonts preconnected: `<link rel="preconnect" href="https://fonts.googleapis.com">`
- [ ] Fonts use display=swap
- [ ] Critical above-fold CSS inlined in `<style>` in `<head>`
- [ ] All JS loaded with `defer` attribute
- [ ] CSS in single file, JS in single file (plus CDN libs)
- [ ] No render-blocking resources in `<head>` (except critical CSS)

## Technical — HTML & Accessibility

- [ ] Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- [ ] `lang` attribute on `<html>` tag
- [ ] Skip-to-content link present
- [ ] All interactive elements keyboard-accessible
- [ ] Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text)
- [ ] Focus styles visible on all interactive elements
- [ ] Favicon present (SVG preferred)
- [ ] 404 page exists, matches site design
- [ ] Copyright year generated dynamically with JS
- [ ] All file paths are relative (except CDN links)
- [ ] File names are lowercase with hyphens (no spaces or uppercase)

## Content

- [ ] Client media used where available (MEDIA.md checked first)
- [ ] Stock photos are specific and relevant (not generic "happy people in office")
- [ ] No Lorem Ipsum anywhere
- [ ] No placeholder images or "coming soon" sections
- [ ] Real business details: hours, address, phone, email
- [ ] All external links (social, booking, maps) work and open in new tab
- [ ] Footer includes: business name, address, phone, email, social links, copyright
- [ ] Google Maps embed on contact page (if address provided)
