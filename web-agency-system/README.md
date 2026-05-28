# Web Agency Build System

A complete Claude Code workspace for building premium static websites. Produces hand-crafted agency-quality sites, not AI-looking templates.

---

## What's in the box

```
web-agency-system/
├── CLAUDE.md                   ← Master AI instructions (never delete or edit)
├── README.md                   ← This file
├── templates/
│   ├── CLIENT_BRIEF.md         ← Fill this in for every new client
│   └── MEDIA.md                ← Catalogue client photos, video, logos here
├── reference/
│   └── CHECKLIST.md            ← Pre-launch quality checklist
├── design-systems/
│   └── design-md/              ← 71+ brand design systems (Airbnb, Apple, Ferrari, etc.)
├── scripts/
│   └── deploy.ps1              ← Legacy deploy script (use deploy-hostinger.ps1 instead)
└── media/                      ← Drop client media files here
```

---

## Starting a new project

### Step 1 — Copy this folder

Take a fresh copy of `web-agency-system` and rename it to your client (e.g. `plumber-dublin`). Place it alongside your other projects in your workspace.

> Your workspace should look like this:
> ```
> Nick 23.5.26/
> ├── deploy-hostinger.ps1     ← Master deploy script (already set up)
> ├── web-agency-system/       ← The template (don't edit this one)
> ├── sauna-demo/
> ├── compound-fitness-site/
> └── plumber-dublin/          ← Your new project (copied from template)
> ```

### Step 2 — Fill in the brief

Open `CLIENT_BRIEF.md` and replace all the example content with the real client details:

- Business name, location, phone, email
- What makes them different
- Target customer and their problem
- 3–5 competitor URLs (these get scraped automatically)
- Tone/style preferences
- Pages needed and features required
- SEO keywords
- Hosting details (Hostinger temp URL if using demo)

### Step 3 — Add client media

Drop all client photos, videos, and logos into the `media/` folder. Then open `MEDIA.md` and describe each file — Claude cannot see images directly, so the description determines how each file is used in the design.

```
media/
├── logo.svg
├── hero-photo.jpg
├── founder.jpg
└── ...
```

### Step 4 — Open Claude Code in the project folder

Open Claude Code with your new project folder as the workspace (not the template). Claude will read `CLAUDE.md` automatically and follow the build system.

Then simply say:

> **"Build the website for [client name]"**

Claude will run through all 5 phases automatically:
1. Competitor research (scrapes competitor sites with Firecrawl)
2. Design system assembly (picks fonts, builds colour palette, assembles DESIGN.md)
3. Build (generates all HTML, CSS, JS files)
4. Browser review (checks it in Chrome at mobile + desktop sizes)
5. Deploy to Hostinger

---

## Deploying to Hostinger

The `deploy-hostinger.ps1` script at your workspace root handles all deployments. SSH key authentication is already set up — no passwords needed.

**Deploy a site:**
```powershell
# From your workspace root (Nick 23.5.26 folder):
.\deploy-hostinger.ps1 -Site "plumber-dublin"
```

The first time you run it for a new project, it auto-assigns a free Hostinger temp domain (e.g. `lavenderblush-rail-871260.hostingersite.com`). Every subsequent deploy reuses the same domain.

**See all live sites:**
```powershell
.\deploy-hostinger.ps1 -ListSites
```

**See available temp domains:**
```powershell
.\deploy-hostinger.ps1 -FreeDomains
```

**Deploy to a specific domain:**
```powershell
.\deploy-hostinger.ps1 -Site "plumber-dublin" -Domain "khaki-seahorse-813887.hostingersite.com"
```

### What gets deployed / what stays local

| Deployed | Stays local |
|----------|-------------|
| `index.html`, all `.html` pages | `CLAUDE.md` |
| `css/styles.css` | `CLIENT_BRIEF.md` |
| `js/main.js` | `MEDIA.md`, `DESIGN.md` |
| `images/` folder | `media/` folder (working files) |
| `fonts/` (if self-hosting) | `design-systems/`, `reference/`, `scripts/`, `templates/` |

---

## The design systems library

`design-systems/design-md/` contains 71+ brand design systems. When Claude builds a site, it picks one as a starting point and adapts it to the client's palette.

Available brands include: Airbnb, Apple, BMW, Bugatti, Ferrari, Figma, Framer, IBM, Lamborghini, Linear, Meta, and many more.

Claude selects the most appropriate one automatically based on the client's industry and brief. You can override it by telling Claude:

> "Use the Ferrari design system as the starting point"

---

## The skills

The `.claude/skills/` folder contains specialised AI skills that activate during the build:

- **competitor-research** — Scrapes and analyses competitor sites, identifying gaps and positioning opportunities
- **conversion-copy** — Writes all copy following the PAS framework (Problem → Agitate → Solution) with first-person CTAs
- **funnel-strategy** — Structures the page to guide visitors from awareness to conversion
- **build-orchestration** — Coordinates the multi-phase build process

These run automatically. You don't need to invoke them manually.

---

## Key rules (what makes sites look agency-quality)

These are enforced by CLAUDE.md but worth knowing:

**Typography**
- Always distinctive font pairings — never Inter, Roboto, Montserrat, Poppins (AI defaults)
- All sizes use `clamp()` for fluid scaling, never fixed px
- Big size jumps: h1 should be 3x+ body size, not 1.5x

**Layout**
- No three equal cards in a row — asymmetric bento grids only
- Sections break the container occasionally (full-bleed images, offset elements)
- Generous whitespace: `padding-block: clamp(4rem, 8vw, 8rem)` minimum

**Copy**
- Every hero follows PAS: Problem → Agitate → Solution
- CTAs are first-person: "Book my session" not "Book a session"
- No vague aspirational language ("Transform your journey" etc.)
- Real numbers: "200+ clients", "4.9 stars from 127 reviews"

**Motion**
- Lenis smooth scroll on every site
- GSAP scroll-triggered entrance animations on every section
- Barba.js page transitions (no hard reloads between pages)
- Preloader animation on every site

**Conversion**
- Social proof immediately below the hero
- One primary CTA per section
- Sticky bottom bar on mobile with click-to-call

---

## Before going live

Run through `reference/CHECKLIST.md`. Every box must be ticked before the site is sent to a client. The checklist covers design, motion, conversion, mobile, SEO, performance, and accessibility.

---

## Tech stack

All sites are static HTML/CSS/JS deployed to shared Hostinger hosting. No build tools, no npm.

**Libraries (CDN only — no local installs):**
- [GSAP](https://gsap.com) + ScrollTrigger — scroll animations
- [Lenis](https://lenis.darkroom.engineering) — smooth scrolling
- [Barba.js](https://barba.js.org) — page transitions
- [Vanta.js](https://www.vantajs.com) — animated hero backgrounds (where appropriate)

**Hosting:**
- Hostinger shared hosting
- SSH deploy via `deploy-hostinger.ps1`
- SSH key: `~/.ssh/hostinger` (already configured)
- Credentials: `~/.hostinger/default.conf`
