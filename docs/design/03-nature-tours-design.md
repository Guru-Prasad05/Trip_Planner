# Nature Tours — Design Spec (`/nature-tours` + 6 subpages)

> References: `00-design-system.md`, `01-seo-strategy.md`, `docs/02-nature-tours.md`
> Accent theme: Forest green + River-light. Wild, fresh, immersive.

---

## SEO Header (hub)
- **Title:** `Wild Odisha Nature Tours | Wildlife, Waterfalls & Coasts`
- **Description:** "Tiger safaris in Similipal, dolphin cruises on Chilika, summit treks in Koraput & mangrove safaris in Bhitarkanika. Custom group nature tours by local experts."
- **Canonical:** `/nature-tours`
- **JSON-LD:** `TouristDestination`, `ItemList` (6 destinations), `FAQPage`, `BreadcrumbList`
- **H1:** "Wild Odisha Nature Tours"
- **LCP:** static Duduma Falls poster; canvas fades in after.

---

## Hub Page Flow

```
[01] SECTION HERO (forest-themed, animated falls)
[02] INTRO paragraph (155,707 sq km, slow-travel ethos)
[03] DESTINATION PORTAL GRID (6 Tier-2 portals)
[04] PACKAGE COMPARISON TABLE (4 packages)
[05] INCLUSIONS STRIP (icons)
[06] FAQ (5)
[07] FOOTER CTA → FOOTER
[ WhatsApp float ]
```

### [01] Section Hero
- `SectionHero` (reusable). Headline: *"Step Into the Wild Heart of Eastern India"*
- Subhead: "Six distinct natural worlds. One extraordinary state. Crafted for groups who want to go deeper."
- Visual: aerial Duduma Falls + sal canopy — animated water layer (flowing) over static poster.
- CTAs: **Explore Destinations** (scroll to [03]) · **View Packages** (scroll to [04])
- Breadcrumb: Home / Nature Tours

### [02] Intro
Rich paragraph (from docs) — keyword depth, sets eco/slow-travel tone. Patachitra divider.

### [03] Destination Portal Grid — 6 Tier-2 portals
Each `PortalArch` (themed) wrapped in real `<a>`:

| Portal | Inner scene | Link |
|---|---|---|
| 🏔️ Koraput Highlands | misty peaks + falls | `/nature-tours/koraput` |
| 🌿 Similipal National Park | sal forest + tiger ambience | `/nature-tours/similipal` |
| 🌊 Satkosia Gorge | river through gorge | `/nature-tours/satkosia` |
| 🐬 Chilika Lake | lagoon + dolphin | `/nature-tours/chilika` |
| 🏖️ Coastal Odisha | beach + Konark silhouette | `/nature-tours/coastal-odisha` |
| 🦚 Bhitarkanika Mangroves | mangrove channel | `/nature-tours/bhitarkanika` |

Layout: 3×2 desktop, 2×3 tablet, 1-col mobile. Lighter animation budget than home Tier-1.

### [04] Package Comparison Table
Real HTML `<table>` (crawlable). Columns: Package · Duration · Destinations · Group size · From-price. 4 rows. Mobile → stacked cards. Each priced row links to inquiry; emits `TouristTrip`/`Offer`.

### [05] Inclusions Strip
Icon row: certified guides · permits arranged · private AC transport · authentic Odia meals · eco-stays · 24/7 trip captain.

### [06] FAQ
5 Qs from docs, real text + `FAQPage` schema.

---

## Subpage Template (applies to all 6 destinations)

> Each subpage is its own SEO landing page (≥800 words). Same skeleton, themed visuals + unique copy.

```
[A] SUBPAGE HERO (destination-specific animated scene)
    breadcrumb: Home / Nature Tours / {Destination}
[B] DESTINATION OVERVIEW (rich narrative, the SEO body)
[C] EXPERIENCES LIST (bulleted, icon-tagged)
[D] AT-A-GLANCE PANEL (best season, group size, difficulty)
[E] GALLERY (masonry, Unsplash, alt text)
[F] RELATED PACKAGES (PackageCards relevant to this destination)
[G] 3D PORTAL CTA ("Book {Destination}…") → InquiryForm (prefilled package_type=nature, destination)
[H] SIBLING LINKS (2–3 other nature destinations — internal linking)
[I] FAQ (destination-specific where available)
[FOOTER CTA → FOOTER]
```

### Per-subpage content map (from docs)

| Subpage | H1 / Headline | Hero visual | Best season | Group |
|---|---|---|---|---|
| `/koraput` | The Call of the Wild: Koraput Adventures | Duduma Falls aerial gorge | Oct–Feb | 6–30 |
| `/similipal` | Where Tigers Walk in Sal Forests | leopard/tiger + Barehipani falls | Nov–Apr (closed Jul–Oct) | 4–25 |
| `/satkosia` | The Mahanadi's Grand Canyon | boat on gorge at golden hour | Oct–Mar | — |
| `/chilika` | Asia's Largest Lagoon — Magic Made Liquid | Irrawaddy dolphin / sunset boat | Nov–Mar birds, year-round dolphins | — |
| `/coastal-odisha` | From Golden Sunsets to Nesting Sea Turtles | Chandrabhaga sunrise + Konark | Oct–Mar, turtles Dec–Mar | — |
| `/bhitarkanika` | Mangroves, Crocodiles & the World's Rarest Birds | motorboat in mangrove channel | Oct–Mar | — |

### Subpage SEO titles (examples)
- Chilika: `Chilika Lake Tour | Dolphin Cruise & Houseboat Stay`
- Similipal: `Similipal National Park Tour | Tiger Safari & Eco Camp`
- Koraput: `Koraput Adventure Tour | Deomali Trek & Waterfalls`

### Subpage JSON-LD
`TouristAttraction` + `TouristTrip`/`Product`(+`Offer` INR) + `BreadcrumbList` + `FAQPage`.

---

## Components used
`SectionHero`, `PatachitraDivider`, `PortalArch` ×6, `ComparisonTable`, `PackageCard`, `InquiryForm`, `FAQAccordion`, `WhatsAppFloat`, `Footer`.

## Performance/SEO
Overview narrative + table + experiences all server-rendered. Portal scenes dynamically imported, paused offscreen. Gallery lazy-loaded. LCP = hero poster.
