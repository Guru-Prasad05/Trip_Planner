# Shared Components, Global UI & Booking Flow — Design Spec

> References: `00-design-system.md`, `01-seo-strategy.md`, Supabase schema in memory.
> Covers cross-page components, the booking/inquiry flow, auth, and global chrome.

---

## 1. Global Chrome (every page)

### Header / Nav
- Transparent over dark heroes → solid `--color-ivory` on scroll (glass blur).
- Left: logo (Patachitra sun mark + "Odisha Unveiled").
- Center: nav links — Nature · Corporate · Celebrations · Spiritual · Blog.
  - Each opens a **mega-menu** listing subpages (also boosts internal linking / crawl depth).
- Right: **Plan My Trip** (saffron CTA) + account icon (if auth enabled).
- Mobile: hamburger → full-screen overlay nav with section accordions.
- Sticky, keyboard-navigable, `aria-current` on active route, focus-visible gold rings.

### Footer (global)
Logo + tagline · 4 hub link columns w/ subpages · contact (phone, WhatsApp, email, Bhubaneswar address — **NAP matches LocalBusiness schema**) · social (IG/FB/YT) · newsletter signup · copyright/privacy/terms.

### WhatsAppFloat
Fixed bottom-right, persists all pages. Pulse animation (reduced-motion → static). Prefilled message. `aria-label`.

### PatachitraDivider
Decorative SVG divider (gold hairline + motif) between major sections. `aria-hidden`.

---

## 2. PortalArch (the signature component)

Single component, two tiers via props. Full behavior in design-system §5.

```ts
interface PortalArchProps {
  tier: 1 | 2;
  label: string;
  tagline: string;
  href: string;            // real navigation target (SEO)
  theme: 'nature' | 'corporate' | 'celebration' | 'spiritual';
  innerScene: SceneId;     // which WebGPU scene to render inside
  posterSrc: string;       // static fallback image (LCP-safe, no-JS)
  posterAlt: string;
}
```

**Structure (back→front):** `<a href>` wrapper → static poster `<img>` (always in DOM, crawlable) → arch frame (CSS/SVG) → WebGPU canvas (mounts post-hydration, absolute, over poster) → label/tagline text (always in DOM).

**Fallback ladder:** WebGPU → WebGL → Framer-Motion 2.5D tilt card → static poster (reduced-motion / no-JS). Scene lazy-inits via `IntersectionObserver`, pauses offscreen, disposes on unmount, DPR ≤2.

---

## 3. InquiryForm / Booking Flow

The primary conversion mechanism. One smart component, variant per section.

### Variants
| Variant | Extra fields |
|---|---|
| `nature` | destination, package, group size, dates |
| `corporate` | company, designation, GST no., group size, budget, experience type |
| `celebration` | occasion, occasion date, guest count, add-ons |
| `spiritual` | route, group/elders count, mobility needs, preferred month |

### Shared fields
name · email · phone · group size · preferred dates · message · consent checkbox.

### Flow
```
User opens InquiryForm (modal or page section)
   ↓ client validation (zod)
Submit → Next.js Server Action ('use server')
   ↓ zod re-validate server-side
Insert into Supabase `inquiries`/`bookings` (RLS)
   ↓
Trigger notification (email to ops + optional WhatsApp)
   ↓
Optimistic success state → "Proposal within 24 hours" confirmation
```

- **Server Action** does validation + insert (parameterized via Supabase client, no string SQL).
- Errors surfaced inline; focus management on error.
- Honeypot + rate-limit (basic spam protection).
- Success: confirmation screen + reference id; optional account creation prompt.

### Booking vs Inquiry
- **Inquiry** (default, no-auth): lead capture → ops follows up with proposal + 30% advance link. Matches the docs' "proposal in 24h → 30% advance" model.
- **Booking** (optional, auth): logged-in user confirms a known package; row in `bookings` with `status` lifecycle (pending → confirmed → cancelled).

---

## 4. Auth (optional / phase 2)

Supabase Auth. Only needed for booking history / saved trips — **inquiry flow works without login** (keeps conversion friction low + crawlable).
- `/account` (private, `noindex`) — bookings list, profile.
- Middleware protects `/account/*` only; everything else public/crawlable.
- Magic-link or email+password. Profile row in `user_profiles` on signup (trigger).

---

## 5. Supabase Data Model (design view)

```
inquiries        (public insert via Server Action; ops read)
  id, name, email, phone, section, payload(jsonb),
  preferred_dates, group_size, status, created_at

bookings         (RLS: owner-only read/write)
  id, user_id→auth.users, package_type, package_id,
  group_size, travel_dates(daterange), special_requests,
  status(pending|confirmed|cancelled), created_at

trip_packages    (public read)
  id, title, slug, section, description, duration,
  price_per_person, currency('INR'), min_group_size,
  max_group_size, destination, image_url, amenities(jsonb),
  seo_title, seo_description, created_at

user_profiles    (RLS: owner-only)
  id→auth.users, username, phone, address, preferences(jsonb)

leads            (brochure/newsletter email capture)
  id, email, source, created_at

blog_posts       (public read; powers /blog + Article schema)
  id, slug, title, excerpt, body(mdx), cover_url,
  author, tags, published_at, seo_title, seo_description
```

**RLS:** `trip_packages`, `blog_posts` → public select. `inquiries`, `leads` → anon insert only (no read). `bookings`, `user_profiles` → `auth.uid() = user_id` for all ops.

**Packages drive SEO:** `trip_packages` rows feed `Product`/`Offer` JSON-LD + sitemap.

---

## 6. Reusable Content Components

| Component | Notes |
|---|---|
| `SectionHero` | themed hero (poster + optional canvas layer), breadcrumb, dual CTA |
| `PackageCard` | title, duration, from-price (INR), highlights, Book CTA, emits Offer |
| `ComparisonTable` | real `<table>`, responsive→stacked cards on mobile |
| `StepFlow` | numbered horizontal/vertical timeline |
| `DestinationCarousel` | scroll-snap horizontal, keyboard + drag |
| `TestimonialCarousel` | rotating cards, auto-advance pause-on-hover |
| `FAQAccordion` | one-open, keyboard, emits FAQPage schema |
| `TrustBar` | stat row, count-up on view |
| `Breadcrumb` | visible UI + BreadcrumbList JSON-LD |
| `JsonLd` | server component injecting `application/ld+json` |

---

## 7. Responsive Breakpoints
`sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Mobile-first. Portals collapse to 1-col; canvases swap to posters on small/low-power; tables → stacked cards.

---

## 8. Definition of Done (every page)
SEO checklist (`01-seo-strategy.md` §10) **+**:
- [ ] Renders fully with JS disabled (content, links, images)
- [ ] Keyboard navigable; focus-visible rings; reduced-motion honored
- [ ] Color contrast AA
- [ ] Portal poster present in DOM (crawlable) before canvas mounts
- [ ] Inquiry form validates client + server; spam-protected
- [ ] LCP = poster image, not canvas
