# WeCompound Agency Website — Design Spec

## Identity

- **Name:** WeCompound
- **Domain:** wecompound.ie
- **Single statement:** "We build the online presence that gets your business paid."
- **Supporting line:** "We compound your growth, your visibility, your leads."
- **Brand feel:** Sharp, confident, dark, direct — high-end consultancy energy
- **Differentiator:** Revenue obsession — every decision measured against whether the client gets paid

## Services

1. Web Design & Development
2. SEO & Visibility Strategy
3. AI Tools & Automation
4. Premium Media Production (own camera, video, photography — full creative production)

## Design System — Linear-adapted, money-green accent

### Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `--canvas` | `#010102` | Page background — near-black with faint blue tint |
| `--surface-1` | `#0f1011` | Card backgrounds, panels |
| `--surface-2` | `#141516` | Hover states, featured cards |
| `--surface-3` | `#18191a` | Sub-nav, dropdowns |
| `--hairline` | `#23252a` | 1px card/divider borders |
| `--hairline-strong` | `#34343a` | Stronger borders, input focus |
| `--ink` | `#f7f8f8` | Primary text — headlines and body |
| `--ink-muted` | `#d0d6e0` | Secondary text |
| `--ink-subtle` | `#8a8f98` | Tertiary text, footer links |
| `--ink-tertiary` | `#62666d` | Disabled, footnotes |
| `--primary` | `#22c55e` | Money-green — CTAs, accent, brand mark |
| `--primary-hover` | `#4ade80` | Lighter green on hover |
| `--primary-focus` | `#16a34a` | Focus rings, pressed state |
| `--on-primary` | `#ffffff` | Text on primary buttons |

### Typography

Use Google Fonts skill to select a distinctive pairing at build time. Direction:

- **Display font:** Tight geometric sans, weights 300 + 700, aggressive negative tracking (-0.03em at display sizes)
- **Body font:** Clean, readable text face, weight 400, slight negative tracking (-0.01em)
- **Forbidden fonts:** Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Nunito
- All sizes use `clamp()` for fluid scaling

Fluid scale:

```css
:root {
  --text-sm: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.35vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1rem + 0.75vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);
  --text-2xl: clamp(2rem, 1.2rem + 2.5vw, 3.5rem);
  --text-3xl: clamp(2.5rem, 1rem + 4vw, 5rem);
  --text-eyebrow: clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem);
}
```

Heading: line-height 1.05–1.2, letter-spacing -0.02em to -0.03em.
Body: line-height 1.5–1.6, letter-spacing -0.01em.
Eyebrow: weight 500, letter-spacing +0.05em (positive — contrast against negative-tracked display).

### Spacing

Based on Linear's 4px base unit:

| Token | Value |
|-------|-------|
| `--space-xs` | 8px |
| `--space-sm` | 12px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-section` | `clamp(4rem, 8vw, 8rem)` |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 6px | Small chips, tags |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Large panels, project screenshots |

### Elevation

No drop shadows. Hierarchy via surface ladder + hairline borders only:
- Level 0: canvas, no border (body text, hero, footer)
- Level 1: surface-1, 1px hairline (default cards)
- Level 2: surface-2, 1px hairline-strong (featured/hovered cards)
- Focus: 2px primary-focus outline at 50% opacity

## Site Structure

Four pages with Barba.js transitions.

### Page 1: Home

**Preloader**
- Full-screen canvas (#010102)
- "WeCompound" wordmark fades in with money-green accent pulse
- 1.5s max, slides up to reveal hero
- Triggers hero entrance animation on complete

**Hero Section**
- Vanta.js `net` effect — nodes and connecting lines in money-green (#22c55e at ~30% opacity) on dark canvas
- Eyebrow: "Growth agency" or similar short taxonomy label
- H1: "We build the online presence that gets your business paid."
- Subline: "We compound your growth, your visibility, your leads."
- Primary CTA: "Talk to us" (money-green button)
- Secondary CTA: "See our work" (ghost button / text link)
- Headline: word-by-word stagger reveal (0.03s per word), subline + CTAs fade up 0.3s after

**Services Overview**
- Eyebrow: "What we do"
- Asymmetric bento grid (NOT three equal cards) — one card spanning 2 columns, varied heights
- 4 cards: Web Design, SEO & Visibility, AI Implementation, Media Production
- Each card: icon (inline SVG), title, 1–2 line description
- Media Production card gets a distinguishing treatment — slightly larger or accent-bordered to call out the differentiator

**Results / Social Proof Strip**
- Animated count-up stats: placeholder numbers for now (e.g., "12+ businesses grown", "3x average traffic increase")
- Horizontal layout, money-green numbers, muted label text
- Placeholder — easy to update with real metrics

**Featured Work**
- Eyebrow: "Selected work"
- 2–3 project cards from the portfolio (placeholder content)
- Each card: thumbnail image area (surface-1 with radius-xl), project name, industry tag pill, one-line result
- Cards link to Work page
- Asymmetric layout: one large card + one or two smaller

**CTA Banner**
- Surface-1 panel, radius-lg, 48px padding
- Headline: "Ready to compound your growth?"
- Primary CTA: "Get my free consultation"

### Page 2: Services

**Hero**
- No Vanta — clean dark canvas
- H1: "Everything your business needs to grow online."
- Subline: brief positioning paragraph

**Service Sections** (one per service, alternating layouts)

1. **Web Design & Development**
   - What we build: premium static sites, landing pages, full redesigns
   - Benefit-driven copy (PAS framework)
   - What's included list

2. **SEO & Visibility**
   - Local SEO, technical SEO, content strategy
   - Benefit-driven copy
   - What's included list

3. **AI Tools & Automation**
   - AI chatbots, workflow automation, AI-powered content
   - Benefit-driven copy
   - What's included list

4. **Premium Media Production**
   - This is the differentiator section — bigger treatment
   - "We show up with the camera too."
   - Video production, photography, creative direction
   - Reference the sauna case study approach: models, hero video, page photography all produced in-house

**CTA Banner** — same pattern as homepage

### Page 3: Work (Portfolio)

**Hero**
- H1: "Work that gets results."
- Subline: brief statement about measuring success by client revenue

**Project Grid**
- 3–4 placeholder project cards
- Each card structure:
  - Thumbnail area (surface-1, radius-xl) — placeholder gray or screenshot
  - Project name
  - Industry tag (pill badge)
  - One-line result description
  - "View project" link
- Asymmetric grid: one large feature card + smaller cards below
- Placeholder content ready to swap for: sound system hire, miseofficial.com, sauna business, personal trainer

**Expanded Project View**
- Could be a dedicated sub-page per project or an expanding panel — start with expanding panel (less routing complexity, easier to add projects)
- Panel shows: larger screenshots, brief description, services provided, key result metric

### Page 4: Contact

**Hero**
- H1: "Let's talk about your growth."
- Subline: one sentence — direct, no fluff

**Contact Form**
- Fields: Name, Email, Phone (optional), Message
- Submit: "Get my free consultation" (money-green primary button)
- Privacy line: "We'll get back to you within 24 hours. No spam, ever."

**Direct Contact**
- Email address displayed
- Phone number (click-to-call on mobile)
- Social links if applicable

**No map** — WeCompound is not a physical location clients visit.

### Navigation

**Desktop (≥768px)**
- Sticky top nav, canvas background
- Left: WeCompound wordmark/logo
- Center/right: Home, Services, Work, Contact
- Far right: Primary CTA button "Talk to us" (money-green)

**Mobile (<768px)**
- Hamburger icon, right-aligned
- Slide-in overlay from right
- Links stagger in 0.08s apart
- Sticky bottom bar: money-green, "Let's talk" + click-to-call or primary CTA
- Bottom bar appears after scrolling past hero

### Footer

- Canvas background
- WeCompound wordmark
- Nav links repeated
- Email, phone
- Social links
- "© [dynamic year] WeCompound"
- Subtle, dense — Linear footer energy

## Motion

### Libraries (CDN)
- GSAP + ScrollTrigger
- Lenis (smooth scroll)
- Barba.js (page transitions)
- Vanta.js + Three.js (hero background, home page only)

### Scroll Animations
- Section entrances: fade up (opacity 0→1, y 40→0), 0.8s, `power2.out`
- Card grids: stagger 0.1s between items
- Hero headline: word-by-word stagger 0.03s
- Stats: count-up animation on scroll into view
- Project cards: subtle scale (1.03→1) + opacity
- Start trigger: `top 85%`

### Page Transitions
- Barba.js fade transition, 0.5s
- Money-green progress bar slides across top during transition
- Scroll position resets, GSAP animations re-initialize after transition

### Micro-interactions
- CTA buttons: scale 1.03 on hover, bg shifts to primary-hover, 0.3s ease
- Cards: translateY(-4px) + hairline border brightens on hover, 0.3s
- Nav links: underline slides in from left on hover
- Form inputs: border transitions to money-green (primary-focus) on focus
- Mobile menu: slide-in from right, links stagger 0.08s
- Scroll-to-top: fades in after scrolling past first section

### Timing
- Default ease: `power2.out` for entrances, `power2.inOut` for transitions
- Duration: 0.6–1.0s section entrances, 0.3s hovers, 0.5s page transitions
- Stagger: 0.08–0.1s between items
- No linear easing. Nothing exceeds 1.5s.

## Technical Standards

- Static HTML/CSS/JS — no frameworks, no npm
- Semantic HTML5 with proper heading hierarchy
- One `styles.css`, one `main.js`, libraries via CDN
- All images: `loading="lazy"`, `width`/`height`, `alt` text
- Mobile-first CSS with `@media (min-width: ...)` breakpoints
- Responsive at: 360px, 768px, 1024px, 1440px
- SEO: unique titles, meta descriptions, Open Graph tags, structured data (Organization schema for WeCompound)
- Performance: page weight under 2MB, critical CSS in `<head>`, deferred JS
- Fonts: Google Fonts with `display=swap`, preconnect
- 404 page: branded, links back to home
- Dynamic copyright year via JS

## Copywriting

- PAS framework for hero sections (Problem → Agitate → Solution)
- First-person CTAs: "Get my free consultation" not "Get a consultation"
- Specific, benefit-driven — no vague aspirational language
- Placeholder copy is acceptable for portfolio items; all other copy should be real

## File Structure

```
wecompound/
├── index.html
├── services.html
├── work.html
├── contact.html
├── 404.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── images/
    └── [placeholder project thumbnails]
```

## Placeholder Content

Portfolio project cards use this structure (easy to swap later today):

```
Project Card:
- thumbnail: surface-1 placeholder or generic screenshot
- name: "Project Name"
- tag: "Industry"
- result: "One-line result description"
```

Likely final projects: sound system hire, miseofficial.com, sauna business, personal trainer site. Content TBD.
