# Odisha Unveiled — Design System

> The visual and interaction language for the entire site. Every page references this file.

---

## 1. Brand Foundation

**Brand name:** Odisha Unveiled
**Tagline:** *Where Nature Meets The Divine*
**Personality:** Sacred, untamed, premium, warm, trustworthy. Not flashy — immersive.

The design pulls from three Odia visual traditions:
- **Patachitra** — fine line work, natural pigments, ornate borders
- **Konark** — stone carving depth, the great wheel, sun motif
- **Sacred water** — rivers, falls, lagoons (the connective thread across every section)

---

## 2. Color System

Defined as CSS custom properties / Tailwind v4 `@theme` tokens.

### Core Palette
| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#1A1410` | Primary text, deep backgrounds |
| `--color-saffron` | `#E8742C` | Primary CTA, sacred accent |
| `--color-saffron-deep` | `#C2410C` | CTA hover, emphasis |
| `--color-temple-stone` | `#A1887F` | Spiritual neutral, borders |
| `--color-river` | `#2A6F84` | Water accents, links |
| `--color-river-light` | `#74CCF4` | Water highlights, glow |
| `--color-forest` | `#2F4A3C` | Nature section base |
| `--color-sand` | `#F4EBDD` | Page background (light) |
| `--color-gold` | `#D4A437` | Patachitra accent, dividers |
| `--color-ivory` | `#FBF7F0` | Card surfaces |

### Per-Section Accent Themes
Each section reskins accents while keeping the base neutral system.

| Section | Primary | Secondary | Mood |
|---|---|---|---|
| Home | Saffron + River | Gold | Balanced, inviting |
| Nature Tours | Forest green | River-light | Wild, fresh |
| Corporate | Deep slate `#324158` | Ember `#E8742C` | Confident, warm |
| Celebrations | Magenta-rose `#C13A6B` | Gold + pool-blue | Festive, glowing |
| Spiritual | Temple stone + Saffron | River-blue | Calm, reverent |

### Dark/Light
- Home hero and all section heroes are **dark-immersive** (media-forward).
- Content sections below the fold are **light** (`--color-sand` background) for readability.

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display / Headlines | **Fraunces** (serif, optical) | Warm, editorial, slightly literary |
| Body / UI | **Inter** | Clean, legible at all sizes |
| Accent / Labels | **Fraunces 9pt italic** | For taglines, quotes, captions |
| Optional Odia script touch | **Baloo Bhaina 2** | Decorative section markers only |

### Scale (fluid, clamp-based)
- Hero headline: `clamp(2.75rem, 6vw, 6rem)`
- Section title: `clamp(2rem, 4vw, 3.5rem)`
- Card title: `1.5rem`
- Body: `1.0625rem` / line-height `1.7`
- Caption: `0.875rem`

---

## 4. Spacing & Layout

- **Grid:** 12-column, max content width `1280px`, gutters `24px`.
- **Section rhythm:** vertical padding `clamp(5rem, 10vw, 9rem)`.
- **Radius:** cards `1.25rem`, buttons `0.75rem`, portals `circular/arch`.
- **Border treatment:** Patachitra hairline borders (`1px` gold) on featured cards.
- **Elevation:** soft, warm shadows — `0 20px 60px -20px rgba(26,20,16,0.35)`.

---

## 5. Portal Design Language (the signature element)

Two tiers of portals, both 3D, both clickable to navigate.

### Tier 1 — Section Portals (on Home)
4 large portals. Each is a **carved archway** (Konark-inspired stone frame) with a *living scene* visible inside.
- Frame: extruded stone arch geometry with patachitra carving texture
- Inner scene: section-themed animated WebGPU scene (forest canopy, bonfire, poolside, temple doorway)
- Idle: gentle camera drift inside the portal + particle motion
- Hover: arch glows along its edge, inner camera dollies forward (depth pull), label rises
- Click: portal "opens" — camera flies *through* the arch, the inner scene fills the viewport, then route changes (View Transition handoff)

### Tier 2 — Subsection Portals (on each section page)
Smaller portals in a grid (6 for nature, 5 for celebrations, etc.).
- Same arch language, themed per section
- Inner scene = destination-specific (Chilika water, Similipal forest, Varanasi ghat)
- Lighter animation budget than Tier 1

### Portal States
| State | Behavior |
|---|---|
| Idle | Slow inner drift, ambient particles, subtle edge shimmer |
| Hover/Focus | Edge glow, depth dolly, label lift, sound cue (optional, muted by default) |
| Active (click) | Fly-through transition → route change |
| Reduced-motion | Static framed image with crossfade only |

### Technical fallback ladder
1. **WebGPU available** → full Three.js two-scene portal with shaders
2. **WebGL only** → Three.js portal with simplified materials
3. **Low-power / mobile / no-WebGL** → Framer Motion 2.5D card (parallax layers + tilt)
4. **prefers-reduced-motion** → static image with arch frame

---

## 6. Hero Design (Home)

Layered, cinematic, full-viewport.

**Z-layers (back → front):**
1. Sky gradient + distant Konark/sal-forest silhouette (parallax slow)
2. Mid waterfall — **animated flowing water** (WebGPU shader, looped vertical flow + mist particles)
3. Still meditating person silhouette (centered, sharp, unmoving — the calm anchor)
4. Foreground river water with refraction + caustics (slow ripple)
5. UI layer: headline, subhead, dual CTA, scroll cue

**Motion:**
- Water flows continuously (the only constant motion)
- Person stays perfectly still (contrast = the brand thesis: nature in motion, soul at rest)
- Mouse parallax shifts layers subtly (±8px)
- On scroll: hero compresses, the 4 section portals rise into view (parallax portal reveal)

---

## 7. Motion & Interaction Principles

- **Water is always moving; everything sacred is still.** This tension defines all motion.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) for entrances; springs for hover.
- Page transitions: Next.js 16 View Transitions + Framer Motion `AnimatePresence`.
- Scroll: GSAP ScrollTrigger for layered reveals; Lenis for smooth scroll.
- Performance budget: hero + portals lazy-init, pause when offscreen, cap DPR at 2.
- **Accessibility:** every animation respects `prefers-reduced-motion`; portals are real `<a>`/`<button>` with labels and keyboard focus.

---

## 8. Component Inventory

| Component | Description |
|---|---|
| `PortalArch` | The 3D portal (Tier 1 & 2 via props) |
| `HeroScene` | Layered animated hero canvas |
| `SectionHero` | Reusable themed hero for each section |
| `PackageCard` | Price, duration, highlights, Book CTA |
| `ComparisonTable` | Responsive package comparison |
| `DestinationCarousel` | Horizontal scroll featured cards |
| `StepFlow` | "How it works" numbered steps |
| `TestimonialCarousel` | Rotating quote cards |
| `InquiryForm` | Booking/inquiry (Server Action + Supabase) |
| `FAQAccordion` | Schema-marked FAQ |
| `TrustBar` | Stat row |
| `WhatsAppFloat` | Persistent contact button |
| `PatachitraDivider` | Decorative section divider |
| `Footer` | Global footer |

---

## 8b. SEO Is Mandatory (see `01-seo-strategy.md`)

SEO is a hard requirement that constrains design and animation choices:
- **All primary content is server-rendered** — never trapped inside a client-only canvas.
- **Every portal is a real `<a>` with descriptive anchor text**; the 3D scene layers on top as progressive enhancement.
- **The 3D experience must never be the LCP element** — a static optimized poster image carries LCP; the WebGPU canvas fades in after hydration.
- Animations stay within Core Web Vitals budgets (LCP ≤2.5s, CLS ≤0.1, INP ≤200ms); heavy Three.js is dynamically imported, DPR-capped, and paused offscreen.
- Every page ships unique metadata, canonical, JSON-LD structured data, and a crawlable HTML fallback that works with JS disabled.

See the SEO strategy doc for URL architecture, metadata patterns, schema-per-page-type, and the per-page Definition of Done.

## 9. Accessibility Commitments

- Color contrast ≥ WCAG AA (4.5:1 body, 3:1 large text)
- All portals keyboard-navigable, focus-visible rings (gold)
- Motion reduced/disabled via media query
- Semantic landmarks, alt text on all imagery
- Forms: labels, error messaging, focus management
- Note: full WCAG validation requires manual AT testing + expert review

---

## 10. Image Direction (Unsplash search terms)

- Hero: "waterfall long exposure", "person meditating silhouette", "Konark sun temple"
- Nature: "Chilika lake dolphin", "Similipal forest", "Duduma falls", "mangrove boat"
- Corporate: "team bonfire night", "forest retreat group"
- Celebrations: "poolside party dusk", "beach bonfire group", "birthday decor outdoor"
- Spiritual: "Varanasi ganga aarti", "Kedarnath temple mist", "diya lamp river"
- Texture/props: "patachitra painting", "Odisha handloom", "temple stone carving"

All images optimized via `next/image`, served from Supabase Storage or Unsplash CDN with attribution where required.
