# Spiritual Journeys — Design Spec (`/spiritual-journeys` + 7 subpages)

> References: `00-design-system.md`, `01-seo-strategy.md`, `docs/05-spritual.md`
> Accent theme: Temple stone + Saffron, river-blue accents. **Calm, sacred, reverent — not flashy.**
> Note: covers all-India pilgrimage, not only Odisha.

---

## SEO Header (hub)
- **Title:** `Hindu Pilgrimage Tour Packages | Char Dham, Jyotirlinga & Kashi`
- **Description:** "Sacred journeys across India — Char Dham Yatra, 12 Jyotirlinga circuit, Shakti Peetha trail & Varanasi tirtha. Guided, family-friendly pilgrimage packages. Plan now."
- **Canonical:** `/spiritual-journeys`
- **JSON-LD:** `TouristTrip`, `Place`, `FAQPage`, `BreadcrumbList`
- **H1:** "Spiritual Journeys & Hindu Pilgrimage Tours Across India"
- **LCP:** static temple-doorway-at-dawn poster; subtle aarti-glow + soft water canvas fades in after (low motion budget).

---

## Design tone (critical)
Per docs: soft water-flowing backgrounds, temple silhouettes, morning light, stone textures, still-person hero. Portals open like a **temple doorway** with glowing aarti light, river reflections, depth — **subtle and reverent, never flashy**. Calm typography, generous whitespace, slower motion easing.

---

## Hub Page Flow

```
[01] SECTION HERO (temple doorway, still person, soft water)
[02] PILGRIMAGE INTRO (tirtha as sacred crossing — devotional framing)
[03] SACRED ROUTE PORTALS (7 Tier-2 temple-door portals)
[04] DIVINE PACKAGE TYPES TABLE (5 packages)
[05] CROSS-LINK BLOCK (Char Dham ↔ Jyotirlinga ↔ Shakti ↔ Kashi)
[06] CTA STRATEGY band (guided, not sold-to)
[07] FAQ
[FOOTER CTA → FOOTER]
[ WhatsApp float ]
```

### [01] Section Hero
- Headline: *"Journeys of Devotion, Routes of the Sacred"* (keyword h1 beneath if stylized)
- Subhead: "From the ghats of Kashi to the peaks of Char Dham — tirtha, Jyotirlinga, and Shakti Peetha journeys, planned with care and reverence."
- Visual: temple doorway, still meditating/praying person, flowing water behind, diya glow — minimal motion (water + flame flicker only).
- CTAs: **Plan My Pilgrimage** (→ InquiryForm) · **Explore Sacred Routes** (scroll)
- Breadcrumb: Home / Spiritual Journeys

### [02] Pilgrimage Intro
Devotional copy: tirtha = sacred crossing; journey of devotion, healing, clarity. Helps choose short trip / full circuit / custom. Stone-textured panel.

### [03] Sacred Route Portals — 7 Tier-2 (temple-door style)
| Portal | Link | Door scene |
|---|---|---|
| Kashi & Varanasi | `/spiritual/kashi-varanasi` | ghat + Ganga aarti glow |
| Char Dham Yatra | `/spiritual/char-dham` | mountain mist + shrine |
| Jyotirlinga Circuit | `/spiritual/jyotirlinga` | Shiva shrine + lingam light |
| Shakti Peetha Trail | `/spiritual/shakti-peetha` | goddess temple + red/gold |
| Sacred River Journeys | `/spiritual/sacred-rivers` | flowing river + diyas |
| South India Tirtha | `/spiritual/south-india-tirtha` | gopuram silhouette |
| Custom Pilgrimage | `/spiritual/custom-pilgrimage` | open doorway, soft light |

Layout: 3+3+1 or 4×2 desktop, 1-col mobile. **Reverent motion** — slow door-open, gentle glow, no sparkle. Real `<a>` + crawlable fallback.

### [04] Divine Package Types Table
Real `<table>`: Package · Duration · Focus · Ideal-for. 5 rows (Kashi Darshan 2N/3D, Char Dham 9N/10D, Jyotirlinga 7–15N, Shakti Peetha 5–12N, Custom Tirtha). Each links to relevant route.

### [05] Cross-Link Block
Explicit internal-linking module connecting the four pillar circuits (SEO requirement from docs) — "Often combined with…" cards.

### [06] CTA Strategy Band
Soft band, single clear path. Options rotate: Plan my pilgrimage · Request custom tirtha route · Book Char Dham consultation · Build a family spiritual tour. Tone: guided, not sold-to.

### [07] FAQ
Pilgrimage-intent Qs (best season, senior/family-friendly, helicopter options for Char Dham, darshan/queue planning). Real text + `FAQPage` schema.

---

## Subpage Template (all 7 routes)

```
[A] SUBPAGE HERO (temple-door scene, still person, soft water)
    breadcrumb: Home / Spiritual Journeys / {Route}
[B] SHORT SACRED STORY (narrative + significance)
[C] KEY DESTINATIONS / SHRINES (list or map)
[D] BEST SEASON + TRAVEL PLAN (route map, duration, fitness/altitude where relevant)
[E] PACKAGE CARDS (route-specific)
[F] INQUIRY CTA → InquiryForm (spiritual, route prefilled, group/elders fields)
[G] CROSS-LINKS to sister circuits (Char Dham/Jyotirlinga/Shakti/Kashi)
[H] FAQ
[FOOTER CTA → FOOTER]
```

### Per-subpage map (from docs)

| Subpage | Focus | Key content |
|---|---|---|
| `/kashi-varanasi` | Kashi Vishwanath, Ganga Aarti, ghats | darshan, Dashashwamedh/Assi ghats, boat rides, ghat walks |
| `/char-dham` | Yamunotri, Gangotri, Kedarnath, Badrinath | route map, opening season, duration, fitness/altitude, heli/road, senior-friendly |
| `/jyotirlinga` | 12 Jyotirlinga circuit | per-shrine: story, mythology, season, route, nearby sites |
| `/shakti-peetha` | goddess circuit | Kamakhya, Vaishno Devi, Kalighat, Tarapith, Biraja; Navratri planning |
| `/sacred-rivers` | river ghats, rituals | ganga aarti, holy bathing, boat rides, sunrise/sunset rituals, meditation |
| `/south-india-tirtha` | southern sacred routes | Rameshwaram, Tirupati, Srirangam, Madurai; queue planning, senior itineraries |
| `/custom-pilgrimage` | bespoke mixed route | inquiry-led; family/elders focus, flexible duration |

### Subpage SEO titles (examples)
- `Char Dham Yatra 2026 | Kedarnath & Badrinath Tour Package`
- `12 Jyotirlinga Tour Package | Shiva Shrine Pilgrimage Circuit`
- `Varanasi Spiritual Tour | Kashi Vishwanath & Ganga Aarti`

### Subpage JSON-LD
`TouristTrip` + `Place` (per shrine/city) + `Product`+`Offer` where priced + `BreadcrumbList` + `FAQPage`. Heavy intent-keyword internal linking between pillar pages.

---

## Components used
`SectionHero` (reverent variant), `PortalArch` ×7 (temple-door style, low motion), `ComparisonTable`, `PackageCard`, `InquiryForm` (spiritual variant), `PatachitraDivider` (stone/brass tone), `FAQAccordion`, `WhatsAppFloat`, `Footer`.

## Performance/SEO
Sacred narratives, shrine lists, route tables fully server-rendered. Motion deliberately minimal (reverent + good for CWV). Cross-links between Char Dham/Jyotirlinga/Shakti/Kashi are first-class SEO assets. LCP = temple poster.
