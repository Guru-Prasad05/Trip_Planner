/**
 * Central site configuration — single source of truth for SEO,
 * navigation, and structured data (see docs/design/01-seo-strategy.md).
 */

export const siteConfig = {
  name: "Trip Planner",
  tagline: "Where Nature Meets The Divine",
  // Update to the real production origin before deploy.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripplanner.in",
  description:
    "Discover Odisha's wilderness, sacred temples & curated celebrations. Custom group tours, corporate retreats & all-India pilgrimages by local experts.",
  locale: "en_IN",
  ogImage: "/og/default.jpg",
  contact: {
    phone: "+91-70082-58411",
    whatsapp: "917008258411",
    email: "hello@odishaunveiled.com",
    address: "Bhubaneswar, Odisha, India",
  },
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export type SectionTheme = "nature" | "corporate" | "celebration" | "spiritual";

export interface NavChild {
  label: string;
  href: string;
}

export interface NavSection {
  label: string;
  href: string;
  theme: SectionTheme;
  tagline: string;
  children: NavChild[];
}

/** Primary navigation + portal targets — also powers the mega-menu and sitemap. */
export const navSections: NavSection[] = [
  {
    label: "Nature Tours",
    href: "/nature-tours",
    theme: "nature",
    tagline: "Forests, waterfalls, wildlife & coastlines",
    children: [
      { label: "Koraput Highlands", href: "/nature-tours/koraput" },
      { label: "Similipal National Park", href: "/nature-tours/similipal" },
      { label: "Satkosia Gorge", href: "/nature-tours/satkosia" },
      { label: "Chilika Lake", href: "/nature-tours/chilika" },
      { label: "Coastal Odisha", href: "/nature-tours/coastal-odisha" },
      { label: "Bhitarkanika Mangroves", href: "/nature-tours/bhitarkanika" },
    ],
  },
  {
    label: "Corporate & Groups",
    href: "/corporate-groups",
    theme: "corporate",
    tagline: "Where teams breathe, bonds are built",
    children: [
      { label: "Team Building in the Wild", href: "/corporate-groups/team-building" },
      { label: "Leadership Offsite", href: "/corporate-groups/leadership-offsite" },
      { label: "Annual Day & Events", href: "/corporate-groups/annual-day" },
      { label: "Sales Incentive Trips", href: "/corporate-groups/incentive-trips" },
      { label: "Day Out Packages", href: "/corporate-groups/day-out" },
      { label: "Custom Enterprise", href: "/corporate-groups/custom" },
    ],
  },
  {
    label: "Celebrations",
    href: "/celebrations",
    theme: "celebration",
    tagline: "Birthdays, bachelor parties, pool nights & campfires",
    children: [
      { label: "Birthday Packages", href: "/celebrations/birthday" },
      { label: "Bachelor & Bachelorette", href: "/celebrations/bachelor-bachelorette" },
      { label: "Pool Parties", href: "/celebrations/pool-party" },
      { label: "Campfire Nights", href: "/celebrations/campfire" },
      { label: "Friends' Outing", href: "/celebrations/friends-outing" },
    ],
  },
  {
    label: "Spiritual Journeys",
    href: "/spiritual-journeys",
    theme: "spiritual",
    tagline: "Odisha Kalinga circuit to all-India pilgrimages",
    children: [
      { label: "Kashi & Varanasi", href: "/spiritual/kashi-varanasi" },
      { label: "Char Dham Yatra", href: "/spiritual/char-dham" },
      { label: "Jyotirlinga Circuit", href: "/spiritual/jyotirlinga" },
      { label: "Shakti Peetha Trail", href: "/spiritual/shakti-peetha" },
      { label: "Sacred River Journeys", href: "/spiritual/sacred-rivers" },
      { label: "South India Tirtha", href: "/spiritual/south-india-tirtha" },
      { label: "Custom Pilgrimage", href: "/spiritual/custom-pilgrimage" },
    ],
  },
];

/** Flat list of every routable path — used by sitemap.ts. */
export function allRoutes(): string[] {
  const staticRoutes = [
    "/",
    "/blog",
    "/about",
    "/contact",
    "/gallery",
    "/upcoming-trips",
    "/admin/login",
  ];
  const sectionRoutes = navSections.flatMap((s) => [
    s.href,
    ...s.children.map((c) => c.href),
  ]);
  return [...staticRoutes, ...sectionRoutes];
}
