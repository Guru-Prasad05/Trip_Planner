# Odisha Unveiled — SEO Strategy (Mandatory)

> SEO is a non-negotiable requirement. Every page, component, and animation decision must preserve crawlability, performance, and structured data. This document is the source of truth.

---

## 1. Core Principles

1. **Content is server-rendered.** All primary content (headlines, copy, package details, FAQs) renders in React Server Components — never locked behind client-only canvases or animations.
2. **3D/animation is progressive enhancement.** Portals and the hero canvas are decorative layers. Crawlable HTML (links, headings, text, images with alt) sits beneath them. A bot with no JS still sees a complete, linked page.
3. **Every portal is a real `<a>` with descriptive anchor text** — not a canvas-only click handler. The WebGPU scene is layered on top of a semantic link.
4. **Performance is SEO.** Core Web Vitals are a ranking factor; the heavy 3D must not block LCP/INP (see §7).

---

## 2. URL & Information Architecture

Clean, keyword-aligned, lowercase, hyphenated. No trailing slashes.

```
/                                  Home
/nature-tours                      Nature hub
/nature-tours/koraput
/nature-tours/similipal
/nature-tours/satkosia
/nature-tours/chilika
/nature-tours/coastal-odisha
/nature-tours/bhitarkanika
/corporate-groups                  Corporate hub
/corporate-groups/team-building
/corporate-groups/leadership-offsite
/corporate-groups/annual-day
/corporate-groups/incentive-trips
/corporate-groups/day-out
/corporate-groups/custom
/celebrations                      Celebrations hub
/celebrations/birthday
/celebrations/bachelor-bachelorette
/celebrations/pool-party
/celebrations/campfire
/celebrations/friends-outing
/spiritual-journeys                Spiritual hub
/spiritual/kashi-varanasi
/spiritual/char-dham
/spiritual/jyotirlinga
/spiritual/shakti-peetha
/spiritual/sacred-rivers
/spiritual/south-india-tirtha
/spiritual/custom-pilgrimage
/blog                              Travel stories (SEO content engine)
/blog/[slug]
/about
/contact
```

**Internal linking rules:**
- Hubs link down to all children; children link back up to hub + sideways to 2–3 sibling pages.
- Spiritual cross-links: Char Dham ↔ Jyotirlinga ↔ Shakti Peetha ↔ Varanasi (per docs).
- Blog posts deep-link to relevant destination/package pages (topic cluster model).
- Breadcrumb navigation on every subpage (also emits BreadcrumbList schema).

---

## 3. Next.js Metadata Implementation

Use the **App Router Metadata API** — `generateMetadata` for dynamic pages, static `metadata` export for fixed pages.

### Per-page required fields
- `title` (unique, ≤ 60 chars, primary keyword front-loaded)
- `description` (unique, 140–160 chars, includes intent keyword + CTA)
- `alternates.canonical` (absolute URL)
- `openGraph` (title, description, url, type, images[1200×630], siteName, locale `en_IN`)
- `twitter` (card `summary_large_image`)
- `keywords` (optional, light)

### Root `metadata` (layout.tsx)
- `metadataBase` = production origin
- `title.template` = `%s | Odisha Unveiled`
- `title.default` = `Odisha Unveiled | Premium Group Tours, Spiritual Journeys & Celebrations`
- Default OG image + `robots` defaults (`index, follow`, `max-image-preview:large`)

### Example pattern
```ts
// app/nature-tours/chilika/page.tsx
export const metadata: Metadata = {
  title: "Chilika Lake Tour | Dolphin Cruise & Houseboat Stay",
  description:
    "Dawn Irrawaddy dolphin cruises, migratory birds & houseboat nights on Asia's largest lagoon. Group Chilika packages crafted by local experts. Enquire now.",
  alternates: { canonical: "/nature-tours/chilika" },
  openGraph: {
    title: "Chilika Lake Tour | Dolphin Cruise & Houseboat Stay",
    description: "Dawn dolphin cruises and houseboat nights on Chilika.",
    url: "/nature-tours/chilika",
    images: [{ url: "/og/chilika.jpg", width: 1200, height: 630 }],
    type: "website",
    locale: "en_IN",
  },
};
```

---

## 4. Structured Data (JSON-LD) — per page type

Inject via a `<JsonLd>` server component (script type `application/ld+json`).

| Page | Schema types |
|---|---|
| Home | `Organization`, `WebSite` (+ `SearchAction`), `LocalBusiness`, `FAQPage` |
| Nature hub | `TouristDestination`, `ItemList` (of destinations), `FAQPage` |
| Nature subpage | `TouristAttraction`, `TouristTrip`/`Product` (package + `Offer` price), `BreadcrumbList`, `FAQPage` |
| Corporate hub/subpages | `TouristTrip`, `Organization`, `BreadcrumbList`, `FAQPage` |
| Celebrations | `EventReservation`/`Event`, `Product`+`Offer`, `LocalBusiness`, `BreadcrumbList`, `FAQPage` |
| Spiritual | `TouristTrip`, `Place`, `BreadcrumbList`, `FAQPage` |
| Blog post | `Article`/`BlogPosting`, `BreadcrumbList`, `Author` |
| All | `BreadcrumbList` on subpages |

**Offer/price:** every package card with a price emits `Offer` (`priceCurrency: INR`, `price`, `availability`). "On Request" packages omit price, use `priceSpecification` text.

**LocalBusiness** core NAP: name, address (Bhubaneswar, Odisha), phone, geo, openingHours, sameAs (social), aggregateRating (when reviews exist).

---

## 5. On-Page SEO Rules

- **One `<h1>` per page**, containing the primary keyword (the hero headline; if the headline is stylized/poetic, include a visually-hidden semantic h1 or ensure the SEO keyword appears in it).
- Logical heading hierarchy `h1 → h2 → h3`, no skips.
- **Image SEO:** descriptive `alt` on every image, `next/image` with width/height (no CLS), lazy-load below fold, `priority` only on LCP hero image, modern formats (AVIF/WebP).
- **FAQ blocks** on every page (already in docs) rendered as real text + `FAQPage` schema.
- Descriptive, keyword-rich anchor text for all internal links (no "click here").
- Tables (package comparisons) are real HTML `<table>` — crawlable.
- Content depth: hub pages ≥ 600 words, subpages ≥ 800 words of unique copy (the docs already supply rich copy).

---

## 6. Technical SEO Assets

| Asset | Implementation |
|---|---|
| `sitemap.xml` | `app/sitemap.ts` — dynamic, includes all static + DB-driven (blog, packages) routes with `lastModified`, `changeFrequency`, `priority` |
| `robots.txt` | `app/robots.ts` — allow all, point to sitemap, disallow `/api`, `/account`, draft routes |
| Canonical tags | Per-page via `alternates.canonical`; self-referencing |
| `manifest.ts` | PWA manifest (name, icons, theme color `--color-saffron`) |
| 404 / not-found | Custom `not-found.tsx` with internal links (no soft-404s) |
| Hreflang | `en-IN` default now; structure ready for future `or-IN` (Odia) |
| Trailing slash | `trailingSlash: false` consistent |
| Redirects | 301 for any legacy/changed slugs in `next.config` |

---

## 7. Core Web Vitals Guardrails (animation-aware)

The 3D experience must not sabotage rankings.

- **LCP ≤ 2.5s:** Hero LCP element is a static optimized poster image (`priority`), rendered immediately. The WebGPU water canvas mounts *after* hydration and fades in over the poster — it is never the LCP element.
- **INP ≤ 200ms:** Portal interactions debounced; heavy Three.js init runs in `requestIdleCallback` / after first paint; offscreen portals paused via `IntersectionObserver`.
- **CLS ≤ 0.1:** All media reserve dimensions; fonts use `next/font` with `display: swap` and size-adjust; no layout shift from late-loading canvas (absolutely positioned over reserved hero box).
- **JS budget:** Three.js + scene code dynamically imported (`next/dynamic`, `ssr:false`) only on routes that need portals; tree-shaken; route-level code splitting.
- **DPR cap 2, pause offscreen, dispose on unmount.** Mobile gets the lighter fallback (§ design doc fallback ladder), preserving mobile CWV.
- Preload hero poster + critical fonts; preconnect to Supabase + image CDN.

---

## 8. Content / Keyword Map (intent-driven)

Target route + intent, not just temple/place names (per spiritual doc guidance).

| Page | Primary keyword | Supporting intent |
|---|---|---|
| Home | odisha group tour packages | custom itinerary, local experts |
| Nature hub | odisha nature tours | wildlife, waterfalls, eco |
| /chilika | chilika lake tour package | dolphin cruise, houseboat |
| /similipal | similipal national park tour | tiger safari, eco camp |
| Corporate hub | corporate team outing odisha | offsite, GST invoice, retreat |
| Celebrations hub | birthday party packages odisha | bachelor party, pool party |
| Spiritual hub | hindu pilgrimage tour packages | tirtha yatra india |
| /jyotirlinga | jyotirlinga tour package | 12 jyotirlinga circuit |
| /char-dham | char dham yatra 2026 | helicopter, package |
| /kashi-varanasi | varanasi spiritual tour | ganga aarti, kashi vishwanath |
| Blog | (long-tail informational) | "best time to visit…", guides |

Blog is the top-of-funnel engine: informational long-tail posts → internal links → conversion pages.

---

## 9. Measurement

- Google Search Console (verify via DNS/meta), submit sitemap.
- GA4 + server-side events for inquiry/booking conversions.
- Rich Results Test + Schema validation in CI (lint JSON-LD).
- Lighthouse CI budget gate in build pipeline (fail if CWV regress).
- Track: organic impressions/clicks per cluster, rich-result coverage, CWV field data.

---

## 10. Definition of Done (SEO checklist per page)

- [ ] Unique title (≤60) + description (140–160) via Metadata API
- [ ] Self-referencing canonical
- [ ] Single keyword-bearing `<h1>`, clean heading order
- [ ] OG + Twitter tags + 1200×630 image
- [ ] Page-appropriate JSON-LD validates with no errors
- [ ] BreadcrumbList on subpages + visible breadcrumb UI
- [ ] All images have alt + dimensions; LCP image has `priority`
- [ ] FAQ rendered as text + FAQPage schema
- [ ] Internal links with descriptive anchors (up/down/sideways)
- [ ] Added to `sitemap.ts`
- [ ] Lighthouse: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms on mobile
- [ ] Content renders fully with JS disabled
