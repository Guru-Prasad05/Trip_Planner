import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Plan Your Trip | Free Consultation",
  description:
    "Speak to a trip curator about your Odisha or all-India journey — group tours, retreats, celebrations & pilgrimages. Free consultation, proposal in 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <div className="bg-[--color-ink] pt-28 pb-10 text-center text-white">
        <h1 className="font-[family-name:--font-display] text-[--text-section] font-semibold">
          Let&apos;s Plan Your Journey
        </h1>
        <p className="mx-auto mt-3 max-w-xl px-6 text-white/80">
          Free consultation, no obligation. A trip curator will reply within 24 hours.
        </p>
      </div>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold">Reach Us Directly</h2>
            <ul className="mt-6 space-y-4 text-[--color-ink]/80">
              <li><strong>Phone:</strong> {siteConfig.contact.phone}</li>
              <li><strong>Email:</strong> {siteConfig.contact.email}</li>
              <li><strong>WhatsApp:</strong> Tap the floating button anytime</li>
              <li><strong>Address:</strong> {siteConfig.contact.address}</li>
            </ul>
          </div>
          <InquiryForm section="general" heading="Request a Proposal" />
        </div>
      </Section>
    </>
  );
}
