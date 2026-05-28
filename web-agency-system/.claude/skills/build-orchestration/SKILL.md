# Build Orchestration Skill

Master skill that coordinates the full website build process. This skill is the autopilot — it ensures every phase runs in order and nothing is skipped.

## When to use
Use this skill when starting any new website build. It calls the other skills and enforces the workflow.

## Full Build Sequence

### 1. Validate inputs
Before doing anything, confirm these files exist and are filled in:
- [ ] `CLIENT_BRIEF.md` — must have business name, services, competitors, tone
- [ ] `MEDIA.md` — must exist, even if empty (indicates no client media)

If either is missing or incomplete, stop and ask the user to complete them.

### 2. Competitor research
Run the competitor-research skill:
- Scrape all competitor URLs from CLIENT_BRIEF.md using Firecrawl
- Generate COMPETITOR_ANALYSIS.md
- Report key findings to the user in 3-5 bullet points

### 3. Funnel strategy
Run the funnel-strategy skill BEFORE any design or build work:
- Classify the business funnel type (A/B/C/D)
- Map each page to a funnel stage and primary action
- Choose minimum 3 revenue-generating elements to build in
- Write FUNNEL.md to the project root
- Report the funnel map to the user in a short summary

### 4. Design system assembly
Select and customize a DESIGN.md:
1. Read the CLIENT_BRIEF.md tone and style preferences
2. Read MEDIA.md — if client photography exists, note the color temperature and mood from descriptions
3. Browse `design-systems/design-md/` for a matching base design system (71+ brands — check subfolder names)
4. Use the Google Fonts skill to pick a distinctive typography pairing
5. Customize the palette to match client preferences and media
6. Write the project's DESIGN.md with exact CSS custom properties
7. Show the user: font pairing, color palette, and overall approach. Wait for approval before proceeding.

### 5. Site structure
Based on COMPETITOR_ANALYSIS.md and CLIENT_BRIEF.md:
1. Define the page list and navigation structure
2. For each page, outline the sections in order (e.g., Home: hero → social proof → services overview → testimonials → CTA → contact preview → footer)
3. Note which sections need Vanta.js, which need parallax, which need bento grids
4. Briefly confirm structure with user

### 5. Build pages
Build each page following CLAUDE.md rules. Order:
1. `index.html` (homepage) — build fully, preview in browser
2. Other pages in order of importance
3. `css/styles.css` — all styles in one file with CSS custom properties from DESIGN.md
4. `js/main.js` — Lenis init, GSAP animations, Barba.js transitions, preloader, mobile menu, scroll-to-top, sticky mobile CTA, dynamic copyright year
5. Create all SVG graphics inline
6. Source and place images (client media first, then stock)

After building the homepage, preview it in the browser and report to the user. This is the key checkpoint — the homepage sets the standard for all other pages.

### 6. Connect pages
- Implement Barba.js page transitions across all pages
- Ensure consistent nav, footer, and design system across all pages
- Verify all internal links work
- Verify animations re-initialize correctly after page transitions

### 7. Mobile optimization
- Test and refine at 360px viewport
- Implement sticky mobile CTA bar
- Verify hamburger menu works with slide-in animation
- Check all tap targets are 44px+
- Ensure no horizontal scroll

### 8. SEO & technical
- Add LocalBusiness JSON-LD schema to every page
- Add FAQ schema where applicable
- Add AggregateRating schema if reviews displayed
- Add unique title, meta description, OG tags, Twitter cards per page
- Add favicon
- Add canonical URLs
- Build 404.html

### 9. Performance pass
- Verify all images are WebP with lazy loading and dimensions
- Inline critical CSS in <head>
- Ensure all JS is deferred
- Check total page weight (target < 2MB)
- Preconnect Google Fonts

### 10. Final review
- Open `reference/CHECKLIST.md`
- Go through every item
- Fix anything that fails
- Preview final site in browser at both mobile and desktop
- Report completion to user with a summary of what was built

## Checkpoints (require user input)
The build pauses for user feedback at these moments:
1. After competitor analysis — "Here's what I found. Any surprises or adjustments?"
2. After design system — "Here's the font pairing and palette. Approve or adjust?"
3. After homepage build — "Here's the homepage in the browser. Feedback?"
4. After all pages complete — "Full site is built. Ready for final polish?"

Between checkpoints, work autonomously. Don't ask for permission on implementation details.

## Error handling
- If Firecrawl fails on a URL, skip it and note in the analysis
- If a DESIGN.md base can't be found in design-systems/design-md/, create one from scratch using CLAUDE.md rules (but flag to user that it's AI-generated, not sourced)
- If client media files referenced in MEDIA.md don't exist in media/, use stock photos and note the substitution
