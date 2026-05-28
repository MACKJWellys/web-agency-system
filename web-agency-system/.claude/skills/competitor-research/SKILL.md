# Competitor Research Skill

Analyze competitor websites using Firecrawl to inform the client's site strategy.

## When to use
Use this skill at the start of every new project, before any design or build work begins.

## Process

### Step 1: Read the brief
Read CLIENT_BRIEF.md and extract:
- The competitor URLs (3-5)
- The client's industry and services
- The client's target audience

### Step 2: Scrape competitors
Use Firecrawl to scrape each competitor URL. For each site, extract:
- **Site structure**: What pages exist? What's in the navigation?
- **Hero section**: What headline, subheadline, and CTA do they use? Is there a hero image/video?
- **Services/offerings**: How do they present their services? Do they show pricing?
- **Social proof**: Testimonials, review counts, client logos, certifications, awards?
- **CTAs**: What language do they use? Where are CTAs placed? How many per page?
- **Content sections**: What sections appear on the homepage and in what order?
- **Contact method**: Form, phone, booking link, chat widget?
- **Technical signals**: Do they have schema markup? Is it mobile-responsive? Fast or slow?

### Step 3: Write the analysis
Produce a competitive analysis in this format:

```markdown
## Competitive Analysis for [Client Name]

### Industry Standards (features every competitor has — we MUST match)
- [list common features across all competitors]

### Gaps (things competitors do poorly or are missing — our opportunity)
- [list weaknesses and missing features]

### Best Practices Spotted (things one or more competitors do well — consider adopting)
- [list standout features worth emulating]

### Content & Copy Patterns
- Common terminology/keywords used in this niche: [list]
- Typical headline patterns: [list examples]
- How pricing is presented: [describe]

### Recommended Site Structure
Based on competitor analysis and client brief:
1. Home — [key sections]
2. [Page] — [purpose]
3. [Page] — [purpose]
...

### Recommended Differentiators
Things we should include that NO competitor currently has:
- [list 3-5 specific differentiators]
```

### Step 4: Save and proceed
Save the analysis as `COMPETITOR_ANALYSIS.md` in the project root. This file is consumed during the design and build phases to ensure the site is competitive.
