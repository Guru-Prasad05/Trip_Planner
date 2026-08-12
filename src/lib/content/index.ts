import type { SectionContent, SubPageContent } from "./types";
import { natureContent } from "./nature";
import { corporateContent } from "./corporate";
import { celebrationsContent } from "./celebrations";
import { spiritualContent } from "./spiritual";

export const sections: SectionContent[] = [
  natureContent,
  corporateContent,
  celebrationsContent,
  spiritualContent,
];

export { natureContent, corporateContent, celebrationsContent, spiritualContent };

/** Find a subpage by its base path + slug. */
export function findSubpage(
  section: SectionContent,
  slug: string,
): SubPageContent | undefined {
  return section.subpages.find((s) => s.slug === slug);
}

/** Sibling links (other subpages in the same section) for internal linking. */
export function siblingsOf(section: SectionContent, slug: string) {
  return section.subpages
    .filter((s) => s.slug !== slug)
    .slice(0, 5)
    .map((s) => ({ label: s.eyebrow === s.headline ? s.slug : s.headline, href: `${s.basePath}/${s.slug}` }));
}
