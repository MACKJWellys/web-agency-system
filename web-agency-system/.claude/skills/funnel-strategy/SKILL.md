# Funnel Strategy Skill

## When to use
Activate before designing any page structure or writing any copy. The funnel is the skeleton — everything else hangs on it.

---

## The core principle

A website without a funnel is a brochure. A website with a funnel is a salesperson who works 24/7. Every page, every section, every CTA must serve one of four funnel stages:

1. **Awareness** — They found you. Don't lose them.
2. **Consideration** — They're comparing you to alternatives. Win on trust and specificity.
3. **Conversion** — Remove every obstacle between them and the action.
4. **Retention** — A repeat customer costs 5× less than a new one. Build this in.

---

## Step 1: Identify the funnel type from CLIENT_BRIEF.md

Read CLIENT_BRIEF.md and classify the business into one of these funnel types:

### A. Service business (trades, consultants, agencies, wellness, hospitality)
**Goal:** Enquiry / booking / call booked
**Funnel:** Traffic → Landing page → Social proof → Booking/contact → Follow-up
**Revenue levers:** Upsell to premium tier, recurring retainer, referral program

### B. E-commerce / product
**Goal:** First purchase, then repeat purchase
**Funnel:** Traffic → Product page → Cart → Checkout → Post-purchase upsell → Email sequence
**Revenue levers:** Bundles, subscription, abandoned cart, loyalty

### C. Lead generation (B2B, high-ticket services)
**Goal:** Qualified lead captured (email/phone)
**Funnel:** Traffic → Lead magnet landing page → Email sequence → Sales call → Close
**Revenue levers:** Lead magnet quality, email nurture, case studies

### D. Content / media / SaaS
**Goal:** Free signup or trial → paid conversion
**Funnel:** SEO content → Free tool/trial → Onboarding → Paid upgrade → Retention
**Revenue levers:** Feature gates, annual plan discount, referral

---

## Step 2: Map the funnel onto the pages

For EACH page, define:
- **Stage:** Which funnel stage this page serves
- **Primary action:** The ONE thing you want the visitor to do on this page
- **Exit path:** Where do they go after completing (or abandoning) the primary action

Write this as a brief comment block at the top of CLIENT_BRIEF.md under `## Funnel Map` before building anything.

**Example for a service business:**

```
## Funnel Map
- index.html      → Awareness + Consideration. Primary action: click Book CTA. Exit: booking.html
- booking.html    → Conversion. Primary action: submit enquiry / DM Instagram. Exit: thank-you or Instagram
- reviews.html    → Consideration (trust). Primary action: return to booking. Exit: booking.html
- services.html   → Consideration. Primary action: click through to booking. Exit: booking.html
- 404.html        → Recovery. Primary action: back to index.
```

---

## Step 3: Revenue-generating elements to build into the site

Choose from this list based on funnel type. Include at minimum 3.

### Lead capture (works for ALL funnel types)
- **Email opt-in with lead magnet** — "Get our [X] guide / checklist / discount" in exchange for email. Put in hero section AND as an exit-intent or scroll-triggered popup (after 60% scroll depth). Use a form with name + email only (max 2 fields).
- **SMS opt-in** — for hospitality/local businesses, SMS has 98% open rate vs 22% email.
- **Waitlist / early access** — creates scarcity and captures leads before launch.

### Urgency / scarcity (ethical — only use if real)
- **Limited availability indicator** — "Only 3 slots left this week" (if genuinely true)
- **Countdown timer** — for a real promotion or seasonal offer
- **Social proof ticker** — "12 people booked this week"

### Upsell / cross-sell
- **Session upgrade prompt** — e.g. "Add a coffee package — €X extra" at the booking CTA
- **Bundle page** — group the core offer with a complementary product/service at a slight discount
- **"Most popular" badge** on a mid-tier option — anchors price perception

### Trust accelerators (reduce hesitation at conversion point)
- **Money-back / satisfaction guarantee** — even a soft one ("If you're not happy, come back on us")
- **FAQ directly above CTA** — answer the last 3 objections right before the button
- **Specific social proof near CTA** — not just "great service" but "I booked 3 days ago, arrived nervous, left completely relaxed — Siobhán K."
- **Logos / certifications / press mentions** — even local press counts

### Retention (post-conversion revenue)
- **Loyalty prompt** — "Book 5 sessions, get 1 free" messaging visible after conversion
- **Refer a friend** — "Bring a friend and you both get €X off your next session"
- **Email sequence hook** — "Join our list for early access to weekend slots" builds a retargetable audience

---

## Step 4: Page-level funnel checklist

Before writing any section on any page, answer:

1. **What does the visitor know when they arrive here?** (cold/warm/hot traffic)
2. **What is the ONE action I want them to take?** (never two primary actions)
3. **What objection do they have right now?** (address it in this section)
4. **What happens if they don't take the action?** (is there a fallback CTA?)

---

## Step 5: CTA hierarchy (enforce on every page)

Every page must have exactly one of each:

| Level | Type | Styling | Example |
|-------|------|---------|---------|
| Primary | Conversion action | Filled amber button, centred | "Book my session" |
| Secondary | Soft next step | Ghost/outline button | "See how it works" |
| Tertiary | Trust builder | Text link | "Read guest reviews →" |

Never two primary CTAs competing on the same screen. If the primary CTA isn't booking/purchase, it must lead directly toward it within 1–2 clicks.

---

## Step 6: Analytics hooks (add to every page)

Even without a full analytics setup, add these data-attributes so tracking can be added later without touching HTML:

```html
<!-- On every primary CTA -->
<a href="..." data-track="cta-primary" data-funnel-stage="conversion">...</a>

<!-- On every secondary CTA -->
<a href="..." data-track="cta-secondary" data-funnel-stage="consideration">...</a>

<!-- On email opt-in forms -->
<form data-track="lead-capture" data-lead-magnet="[name]">...</form>

<!-- On pricing/session cards -->
<div class="session-card" data-track="session-view" data-session-type="solo">...</div>
```

These are invisible to users, harmless without analytics, and save hours of retroactive tagging.

---

## Output from this skill

Before touching any HTML, write a `FUNNEL.md` file in the project root containing:

1. Funnel type (A/B/C/D)
2. Funnel map (page → stage → primary action → exit path)
3. Revenue elements chosen (min 3) with placement notes
4. Top 3 objections at conversion point and how each is addressed on the page
5. Email/lead capture strategy

This file is your north star. Every design decision should serve it.

---

## Quick-reference: funnel anti-patterns to avoid

- ❌ Hero CTA that says "Learn More" — this sends people away, not toward conversion
- ❌ Contact form as the only conversion path — most people won't fill forms; offer Instagram / WhatsApp / phone as alternatives
- ❌ Social proof only at the bottom — trust signals should appear BEFORE every CTA
- ❌ No fallback for people who aren't ready to buy — capture their email at minimum
- ❌ Pricing hidden behind "contact us" (unless unavoidable) — transparency converts better
- ❌ One CTA per page only — you need primary + secondary for the two audience segments (ready now vs. not yet)
