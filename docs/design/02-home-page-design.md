# Home Page — Design Spec (`/`)

> References: `00-design-system.md`, `01-seo-strategy.md`, `docs/01-home-page.md`
> Accent theme: Saffron + River, Gold highlights. Hero is dark-immersive; content below is light (`--color-sand`).

---

## SEO Header (build first, before any visual work)
- **Title:** `Odisha Unveiled | Premium Group Tours, Spiritual Journeys & Celebrations` (default)
- **Description:** "Discover Odisha's wilderness, sacred temples & curated celebrations. Custom group tours, corporate retreats & all-India pilgrimages by local experts. Plan free."
- **Canonical:** `/`
- **JSON-LD:** `Organization`, `WebSite` (+ `SearchAction`), `LocalBusiness`, `FAQPage`
- **LCP element:** static hero poster image (`priority`). WebGPU water fades in after hydration.
- **H1 (semantic):** "Odisha Unveiled — Group Tours, Spiritual Journeys & Celebrations" (visually the stylized headline "Where Nature Meets The Divine" sits on top; keyword-bearing h1 present for crawlers, can be visually-hidden if needed).

---

## Page Flow (top → bottom)

```
┌─────────────────────────────────────────┐
│  [01] HERO  (full viewport, dark)         │  ← animated water + still person
├─────────────────────────────────────────┤
│  [02] TRUST BAR  (overlap, glass)         │  ← 5 stats
├─────────────────────────────────────────┤
│  [03] SECTION PORTALS  (4 archways)       │  ← THE signature moment
├─────────────────────────────────────────┤
│  [04] FEATURED DESTINATIONS carousel (6)  │
├─────────────────────────────────────────┤
│  [05] HOW IT WORKS  (4 steps)             │
├─────────────────────────────────────────┤
│  [06] EXPERIENCE CATEGORIES strip (4)     │
├─────────────────────────────────────────┤
│  [07] WHY US / USP  (5 promises)          │
├─────────────────────────────────────────┤
│  [08] PACKAGE SNAPSHOT  (3 cards)         │
├─────────────────────────────────────────┤
│  [09] TESTIMONIALS carousel  (3)          │
├─────────────────────────────────────────┤
│  [10] FOOD & CULTURE strip  (full-bleed)  │
├─────────────────────────────────────────┤
│  [11] BLOG TEASER  (3 cards)              │
├─────────────────────────────────────────┤
│  [12] FAQ accordion  (6)                  │
├─────────────────────────────────────────┤
│  [13] FOOTER CTA BAND                     │
├─────────────────────────────────────────┤
│  [14] FOOTER                              │
└─────────────────────────────────────────┘
  [ WhatsApp float — fixed bottom-right, persists ]
```

---

## [01] Hero — full viewport

**Layout:** centered text block, lower-third on mobile, vertical-center on desktop. Dual CTA below. Scroll cue at bottom.

**Z-layers (per design system §6):**
1. Sky gradient + Konark/sal-forest silhouette (slow parallax)
2. Animated flowing waterfall (WebGPU shader — continuous vertical flow + mist)
3. Still meditating person silhouette (centered, sharp, **unmoving**)
4. Foreground river ripple (refraction/caustics)
5. UI: headline, subhead, CTAs, scroll cue

**Copy:**
- Eyebrow: `ODISHA & SACRED INDIA`
- Headline (display): *"Where Nature Meets The Divine"*
- Subhead: "Curated group experiences — wilderness expeditions, spiritual pilgrimages, corporate retreats, and unforgettable celebrations."
- CTA primary (saffron, filled): **Plan My Group Trip** → `/contact` (or inquiry modal)
- CTA secondary (ghost, gold border): **Explore Packages** → scrolls to [03]

**Motion:** water always flowing; person still; mouse parallax ±8px; on scroll hero compresses and portals [03] rise. Reduced-motion → static poster, no canvas.

**Mobile:** canvas swapped for optimized poster image (CWV). Person + falls baked into the image.

---

## [02] Trust Bar

Glass card overlapping hero/portals seam. 5 stats in a row (2-col grid on mobile).

| 500+ | 50+ | 100% | 4 | 24/7 |
|---|---|---|---|---|
| Happy Travellers | Local Partners | Customised | Categories | Support |

Count-up animation on scroll into view (reduced-motion → static numbers).

---

## [03] Section Portals — signature element

4 large **Tier-1 PortalArch** components in a responsive layout:
- Desktop: 2×2 grid, generous gaps, staggered vertical offset (museum-like)
- Tablet: 2×2 tighter
- Mobile: 1-col stack, each portal ~70vh

Each portal (per design system §5, and SEO §1 — **wrapped in a real `<a>`**):

| # | Label | Tagline | Inner scene | Link | Accent |
|---|---|---|---|---|---|
| 1 | Wild Odisha | Forests, waterfalls, wildlife & coastlines | forest canopy + falls | `/nature-tours` | Forest green |
| 2 | Team Outings | Where teams breathe, bonds are built | bonfire night | `/corporate-groups` | Slate + ember |
| 3 | Celebrations | Birthdays, bachelor parties, pool nights | poolside dusk | `/celebrations` | Magenta + gold |
| 4 | Sacred India | Odisha Kalinga circuit to all-India pilgrimage | temple doorway + aarti | `/spiritual-journeys` | Stone + saffron |

**Interaction:** idle drift → hover edge-glow + depth dolly + label lift → click fly-through → View Transition to section. Keyboard-focusable, focus-visible gold ring.

**Crawlable fallback beneath canvas:** `<a>` with `<h2>` label, tagline `<p>`, and a static themed image with alt text. Bot/no-JS sees 4 linked cards.

---

## [04] Featured Destinations Carousel

Horizontal scroll (Lenis/scroll-snap), 6 cards. Each: image, name, micro-tag, link to relevant subpage.
1. Similipal NP → `/nature-tours/similipal`
2. Chilika Lake → `/nature-tours/chilika`
3. Konark Sun Temple → `/spiritual-journeys` (or coastal)
4. Varanasi Ghats → `/spiritual/kashi-varanasi`
5. Koraput Highlands → `/nature-tours/koraput`
6. Char Dham → `/spiritual/char-dham`

Drag + arrow controls; snap; keyboard arrow support. Descriptive anchor text (SEO).

---

## [05] How It Works — 4 steps

`StepFlow` component. Horizontal connected timeline (desktop) / vertical (mobile). Patachitra-style numerals.
1. **Tell Us Your Vision** — quick inquiry form
2. **Get Your Proposal** — day-wise itinerary in 24 hrs
3. **Confirm & Book** — 30% advance, balance 15 days prior
4. **Experience & Enjoy** — dedicated trip captain on ground

Reveal on scroll (GSAP stagger).

---

## [06] Experience Categories Strip

4 compact tiles (icon + title + one-liner) linking to the 4 hubs. Reinforces portals for fast scanners + adds internal links.
🌿 Nature · 🏢 Corporate · 🎉 Celebrations · 🕉️ Spiritual

---

## [07] Why Us / USP

Pulls from `docs/usp.md`. 5 promise cards with icons:
- ✨ No Hidden Charges (all-inclusive)
- 🍽️ Quality Food Everywhere
- 🧭 Experienced Trip Leaders
- 🤝 Relationships, Not Bookings
- 😌 Stress-Free Travel

Plus a caution callout: *"Don't be misled by unrealistic prices"* (transparent-pricing differentiator).

---

## [08] Package Snapshot — 3 featured

3 `PackageCard`s (one cross-section pick): e.g. Complete Wild Odisha, Char Dham Yatra, Golden Weekend Birthday.
Each: name, duration, from-price (INR), 3 highlights, **Book Now** CTA. Emits `Product`+`Offer` JSON-LD.

---

## [09] Testimonials Carousel

3 rotating `TestimonialCard`s: avatar, name, occasion tag, star rating, 2–3 line quote, trip photo. Auto-advance (pause on hover/focus), dots + arrows. Feeds `aggregateRating` for LocalBusiness when real.

---

## [10] Food & Culture Strip

Full-bleed image band, overlay quote:
> *"Taste the sacred. Wear the handwoven. Hear the ancient drums. Odisha is not just a place — it is a living civilization."*

Parallax bg (reduced-motion → static). Patachitra divider above/below.

---

## [11] Blog Teaser

3 latest `Article` cards (image, title, excerpt, read-time) → `/blog/[slug]`. SEO topic-cluster entry points.

---

## [12] FAQ Accordion

6 Qs from `docs/01-home-page.md`. Real text + `FAQPage` JSON-LD. One open at a time, keyboard accessible.

---

## [13] Footer CTA Band

Saffron gradient band. Headline **"Ready to Begin?"**, subtext "free consultation, no obligation", **Book Free Consultation** button.

---

## [14] Footer

Logo + tagline · quick links (4 hubs + Blog/About/Contact) · contact (phone, WhatsApp, email, Bhubaneswar address) · social (IG/FB/YT) · copyright/privacy/terms. NAP consistent with LocalBusiness schema.

---

## Components used
`HeroScene`, `TrustBar`, `PortalArch` ×4, `DestinationCarousel`, `StepFlow`, `PackageCard` ×3, `TestimonialCarousel`, `PatachitraDivider`, `FAQAccordion`, `WhatsAppFloat`, `Footer`.

## Performance notes (SEO §7)
- Hero poster `priority`; canvas `next/dynamic` `ssr:false`, mounts post-hydration.
- Portals init on `IntersectionObserver`; paused offscreen; DPR ≤2.
- Below-fold sections lazy; images AVIF/WebP with reserved dimensions.
