import { SectionHero } from "@/components/ui/SectionHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Section, PatachitraDivider } from "@/components/ui/Section";
import { PortalGrid } from "@/components/portal/PortalArch";
import { PackageCard } from "@/components/ui/PackageCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import type { SectionContent } from "@/lib/content/types";

export function SectionHubPage({ content }: { content: SectionContent }) {
  // Use the first portal's image as the hero background
  const heroImage = content.portals[0]?.posterSrc;

  return (
    <>
      <SectionHero
        eyebrow={content.eyebrow}
        headline={content.headline}
        subhead={content.subhead}
        theme={content.theme}
        primaryCta={{ label: "Start Planning", href: "/contact" }}
        secondaryCta={{ label: "View Packages", href: "#packages" }}
        backgroundImage={heroImage}
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: content.hubTitle, href: content.basePath }]} />

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          {content.intro.map((p) => (
            <p key={p} className="mt-4 text-lg text-[--color-ink]/80">{p}</p>
          ))}
        </div>
      </Section>

      <PatachitraDivider />

      <Section id="destinations">
        <header className="mb-12 text-center">
          <h2 className="text-[--text-section] font-semibold">Explore Each World</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[--color-ink]/70">
            Step through a portal into every experience.
          </p>
        </header>
        <PortalGrid portals={content.portals} />
      </Section>

      {content.comparison && (
        <Section className="bg-[--color-ivory]">
          <h2 className="mb-8 text-center text-[--text-section] font-semibold">Compare Packages</h2>
          <ComparisonTable headers={content.comparison.headers} rows={content.comparison.rows} />
        </Section>
      )}

      <Section id="packages">
        <h2 className="mb-12 text-center text-[--text-section] font-semibold">Featured Packages</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {content.packages.map((pkg) => (
            <PackageCard key={pkg.title} pkg={pkg} />
          ))}
        </div>
      </Section>

      {content.inclusions && (
        <Section className="bg-[--color-ivory]">
          <h2 className="mb-8 text-center text-[--text-section] font-semibold">What&apos;s Included</h2>
          <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {content.inclusions.map((inc) => (
              <li key={inc} className="flex items-center gap-3 rounded-[--radius-button] bg-white p-4 text-sm">
                <span aria-hidden className="text-[--color-saffron]">✓</span>
                {inc}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <FAQAccordion faqs={content.faqs} />
    </>
  );
}
