# Celebrations — Design Spec (`/celebrations` + 5 subpages)

> References: `00-design-system.md`, `01-seo-strategy.md`, `docs/04-celebrations.md`
> Accent theme: Magenta-rose `#C13A6B` + Gold + pool-blue. Festive, glowing, warm.

---

## SEO Header (hub)
- **Title:** `Birthday, Bachelor & Pool Party Packages Odisha`
- **Description:** "Plan unforgettable birthdays, bachelor/bachelorette parties, pool parties & campfire nights in Odisha. Custom celebration packages with full hospitality. Enquire now."
- **Canonical:** `/celebrations`
- **JSON-LD:** `EventReservation`/`Event`, `LocalBusiness`, `FAQPage`, `BreadcrumbList`
- **H1:** "Celebration Tour Packages in Odisha"
- **LCP:** static poolside-dusk poster; pool-light shimmer canvas fades in after.

---

## Hub Page Flow

```
[01] SECTION HERO (poolside dusk, string lights)
[02] CELEBRATION TYPE PORTALS (5 Tier-2 portals)
[03] PROMISE STRIP (total care, zero stress)
[04] HOW CELEBRATION PACKAGES WORK (5 steps)
[05] POPULAR ADD-ONS (icon grid)
[06] TESTIMONIALS carousel (3 occasion groups)
[07] FAQ (6)
[FOOTER CTA → FOOTER]
[ WhatsApp float ]
```

### [01] Section Hero
- Headline: *"Because Some Moments Deserve More Than a Restaurant"*
- Subhead: "Birthdays, bachelor nights, pool parties, campfires & getaways — crafted with total care, zero planning stress."
- Visual: luxury poolside at dusk, blue-lit water, lounge chairs, warm string lights — animated water shimmer + glowing lights over poster.
- CTAs: **Plan My Celebration** (→ InquiryForm) · **View All Packages** (scroll)
- Breadcrumb: Home / Celebrations

### [02] Celebration Type Portals — 5 Tier-2
| Portal | Link | Inner scene |
|---|---|---|
| 🎂 Birthday Packages | `/celebrations/birthday` | candlelit welcome decor |
| 🥂 Bachelor / Bachelorette | `/celebrations/bachelor-bachelorette` | beach bonfire silhouettes |
| 🏊 Pool Parties | `/celebrations/pool-party` | blue-lit pool dusk |
| 🔥 Campfire Nights | `/celebrations/campfire` | bonfire + stars |
| 👫 Friends' Outing | `/celebrations/friends-outing` | candid group warmth |

Layout: row of 5 (desktop, scroll-snap), 1-col mobile. Magenta/gold glow; sparkle particles. Real `<a>` + fallback.

### [03] Promise Strip
Centered quote: *"Total immersion. Total care. Zero planning stress. You arrive — we've already thought of everything."* Gold patachitra frame.

### [04] How It Works — 5 steps
`StepFlow`: free planning call (30 min) → proposal in 24h → 30% advance → we handle everything → you celebrate.

### [05] Popular Add-Ons
Icon grid (8): custom Odia-motif cake · photographer · Odissi/Gotipua performance · welcome board · lantern release · acoustic/folk music · drone package · gift hamper.

### [06] Testimonials
3 cards — birthday group, bachelor group, friends outing. Photos + ratings.

### [07] FAQ
6 Qs (booking lead time, dietary, min size, surprises, décor/flowers, cancellation). Real text + schema.

---

## Subpage Template (all 5 celebration types)

```
[A] SUBPAGE HERO (occasion-themed, festive)
    breadcrumb: Home / Celebrations / {Type}
[B] HERO HEADLINE + tagline + emotional intro
[C] SIGNATURE PACKAGE BREAKDOWN (day-by-day / inclusions)
[D] VENUE / LOCATION TABLE (vibe + best-for)
[E] ADD-ONS list (occasion-specific)
[F] PRICING panel (from-price, min group, what's included)
[G] BOOK CTA → InquiryForm (celebration, type prefilled, occasion date)
[H] SIBLING TYPE LINKS (internal)
[I] CANCELLATION POLICY (where relevant)
[FOOTER CTA → FOOTER]
```

### Per-subpage map (from docs)

| Subpage | Headline | Hero visual | Pricing | Group |
|---|---|---|---|---|
| `/birthday` | The Birthday They'll Never Stop Talking About | nature welcome decor, candlelight | from ₹8,499/pp | min 6 |
| `/bachelor-bachelorette` | One Last Wild Night. Make It Count. | beach bonfire silhouettes | from ₹11,999/pp | 8–20 |
| `/pool-party` | Your Party. Your Pool. Your Rules. | luxury rooftop pool dusk | from ₹5,999/pp | min 10, 4-hr slot |
| `/campfire` | Where Stories Come Out. Where People Come Together. | large bonfire, starlit | from ₹2,999/pp (₹5,999 overnight) | min 6 |
| `/friends-outing` | Pack Light. Leave Your To-Do List Behind. | candid group beach/forest | from ₹4,999/pp | 4–15 |

Birthday & Bachelor subpages include full **day-by-day itinerary blocks** (Arrival / Day 2 / Farewell) + venue table. Pool party includes "What's Included" + event-type icons + partner-venue table. Campfire includes experience-elements + location table. Friends includes signature package + custom-package options.

### Subpage SEO titles (examples)
- `Birthday Trip Packages Odisha | Private Group Getaway`
- `Bachelor Party Odisha | Bachelor & Bachelorette Weekends`
- `Pool Party Packages Odisha | Private Pool Events`

### Subpage JSON-LD
`Event`/`EventReservation` + `Product`+`Offer`(INR) + `BreadcrumbList` + `FAQPage`. Cancellation policy reflected in `Offer` terms where applicable.

---

## Components used
`SectionHero`, `PortalArch` ×5, `StepFlow`, `PackageCard`, `ComparisonTable` (venue tables), `TestimonialCarousel`, `InquiryForm` (celebration variant w/ occasion date), `PatachitraDivider`, `FAQAccordion`, `WhatsAppFloat`, `Footer`.

## Performance/SEO
Itineraries, venue tables, pricing all server-rendered text/HTML. Festive particle effects respect reduced-motion. Portal scenes dynamic-imported.
