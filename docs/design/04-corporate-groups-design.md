# Corporate & Group Plans — Design Spec (`/corporate-groups` + 6 subpages)

> References: `00-design-system.md`, `01-seo-strategy.md`, `docs/03-corporate-groups.md`
> Accent theme: Deep slate `#324158` + Ember saffron. Confident, warm, professional.

---

## SEO Header (hub)
- **Title:** `Corporate Team Outings Odisha | Group Retreats & Offsites`
- **Description:** "Premium corporate team outings & retreats in Odisha — nature team-building, leadership offsites, annual events & incentive tours. GST invoicing. Min 15 people."
- **Canonical:** `/corporate-groups`
- **JSON-LD:** `TouristTrip`, `Organization`, `FAQPage`, `BreadcrumbList`
- **H1:** "Corporate Team Outings & Group Retreats in Odisha"
- **Lead magnet:** Corporate Brochure PDF (gated-lite — email capture, stored in Supabase).

---

## Hub Page Flow

```
[01] SECTION HERO (bonfire-night theme)
[02] WHY ODISHA FOR CORPORATE (4 value props)
[03] PLAN PORTAL GRID (6 Tier-2 portals)
[04] COMPARISON TABLE (6 plans + GST column)
[05] WHAT EVERY PLAN INCLUDES (logistics/stay/food/activities/docs)
[06] SIGNATURE EXPERIENCES STRIP (3 hero cards, no links)
[07] BOOKING PROCESS (5 visual steps)
[08] BROCHURE DOWNLOAD CTA (email capture)
[09] FAQ (6)
[FOOTER CTA → FOOTER]
[ WhatsApp float ]
```

### [01] Section Hero
- Headline: *"Where Teams Breathe, Bonds Are Built"*
- Subhead: "Nature-immersive corporate experiences in Odisha — your team returns with shared stories no worksheet could create."
- Visual: group silhouette around large bonfire at night, forest backdrop — animated ember/fire glow over static poster.
- CTAs: **Request a Proposal** (→ InquiryForm, corporate) · **Download Corporate Brochure** (email capture)
- Breadcrumb: Home / Corporate & Groups

### [02] Why Odisha for Corporate
4 cards: fewer crowds / 30–40% cost efficiency / unique activities / connectivity + GST invoicing. Confident slate tone.

### [03] Plan Portal Grid — 6 Tier-2 portals
| Portal | Link |
|---|---|
| 🌿 Team-Building in the Wild | `/corporate-groups/team-building` |
| 🏛️ Leadership Offsite | `/corporate-groups/leadership-offsite` |
| 🎊 Annual Day / Company Events | `/corporate-groups/annual-day` |
| 🏆 Sales Incentive Trips | `/corporate-groups/incentive-trips` |
| 📅 Day Out Packages | `/corporate-groups/day-out` |
| 🔧 Custom Enterprise Plans | `/corporate-groups/custom` |

3×2 grid; ember edge-glow on hover. Real `<a>` + crawlable fallback.

### [04] Comparison Table
Real `<table>`: Plan · People · Duration · GST Invoice (✅) · From-price. 6 rows. GST badge prominent (B2B trust signal). Mobile → stacked.

### [05] What Every Plan Includes
4-column grid: Logistics & Transport · Accommodation · Food · Activities · Documentation (GST invoice, day-wise itinerary, 24/7 helpline). Icon-led.

### [06] Signature Experiences Strip
3 descriptive hero cards (no links): Konark Dawn Ritual · Tribal Haat Market Walk · River Raft Building Challenge.

### [07] Booking Process
5-step `StepFlow`: inquiry → proposal 24h → 30% advance → balance 15d + GST invoice → trip captain Day 1.

### [08] Brochure CTA
Email-capture band → triggers PDF + stores lead in Supabase (`leads` table). Server Action.

### [09] FAQ
6 Qs (GST, min group, conference/AV, activities, customisation, insurance). Real text + schema.

---

## Subpage Template (all 6 plans)

```
[A] SUBPAGE HERO (plan-specific, themed)
    breadcrumb: Home / Corporate & Groups / {Plan}
[B] OVERVIEW + headline + tagline (group size, duration, setting)
[C] ACTIVITIES / PROGRAMME STRUCTURE (bulleted)
[D] FORMATS or VENUE OPTIONS table
[E] RECOMMENDED LOCATIONS
[F] PROPOSAL CTA → InquiryForm (corporate, plan prefilled, GST fields)
[G] SIBLING PLAN LINKS (internal linking)
[H] FAQ where relevant
[FOOTER CTA → FOOTER]
```

### Per-subpage map (from docs)

| Subpage | Headline | Group / Duration | Notes |
|---|---|---|---|
| `/team-building` | Real Challenges. Real Teams. Real Nature. | 20–100 · 2–4N | raft, navigation, jungle cook, bonfire debrief |
| `/leadership-offsite` | Space to Think. Time to Align. | 8–20 · 3–5N | facilitated AM, curated PM, fine dining PM |
| `/annual-day` | Celebrate Your Team's Year the Right Way | 50–200 · 1–2N | cultural performance + feast + branding |
| `/incentive-trips` | Reward the Extraordinary with the Extraordinary | 5–15 · 3–5N | premium private access, helicopter, VIP darshan |
| `/day-out` | (Day Out near Bhubaneswar) | 15–80 · 1 day | 4 location options table, from ₹3,499 |
| `/custom` | (Bespoke Enterprise) | any | **inquiry form is the page** (7 fields) + 24h commitment |

### Subpage SEO titles (examples)
- `Nature-Based Corporate Team Building Odisha | Forest Challenges`
- `Leadership Offsite Odisha | Private Executive Retreats`
- `Corporate Day Out Near Bhubaneswar | Group Day Trips`

### Subpage JSON-LD
`TouristTrip` + `Organization` + `BreadcrumbList` + `FAQPage`. GST/B2B emphasized in copy.

---

## Components used
`SectionHero`, `ComparisonTable`, `StepFlow`, `PortalArch` ×6, `InquiryForm` (corporate variant w/ GST fields), `PatachitraDivider`, `FAQAccordion`, `WhatsAppFloat`, `Footer`.

## Performance/SEO
GST trust signals + comparison table server-rendered. Brochure via Server Action. Portal scenes dynamic-imported, offscreen-paused.
