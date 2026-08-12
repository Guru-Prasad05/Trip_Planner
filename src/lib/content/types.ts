import type { SectionTheme } from "@/lib/site";
import type { PortalData } from "@/components/portal/types";
import type { FAQ } from "@/components/ui/FAQAccordion";
import type { TripPackage } from "@/components/ui/PackageCard";

export interface SubPageContent {
  slug: string;
  /** Path prefix that the subpage lives under (e.g. /nature-tours or /spiritual). */
  basePath: string;
  theme: SectionTheme;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  posterSrc: string;
  posterAlt: string;
  /** Overview paragraphs — the SEO body copy. */
  overview: string[];
  experiences: string[];
  atAGlance: { label: string; value: string }[];
  packages?: TripPackage[];
  faqs?: FAQ[];
}

export interface SectionContent {
  theme: SectionTheme;
  basePath: string;
  hubTitle: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  intro: string[];
  portals: PortalData[];
  packages: TripPackage[];
  comparison?: { headers: string[]; rows: string[][] };
  inclusions?: string[];
  faqs: FAQ[];
  subpages: SubPageContent[];
}

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const img = u;
