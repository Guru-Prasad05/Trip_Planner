import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Plan Your Trip | Free Consultation",
  description:
    "Speak to a trip curator about your Odisha or all-India journey  -  group tours, retreats, celebrations & pilgrimages. Free consultation, proposal in 24 hours.",
  path: "/contact",
});

/* ─── inline SVG icons (no extra deps) ──────────────────────────────────── */

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.84a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.103 1.512 5.829L.057 23.571a.5.5 0 0 0 .616.637l5.91-1.548A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 0 1-5.13-1.427l-.367-.217-3.508.919.935-3.415-.239-.381A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function BadgeCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/* ─── contact card data ──────────────────────────────────────────────────── */

const contactItems = [
  {
    id: "phone",
    label: "Call Us",
    value: siteConfig.contact.phone,
    sub: "Mon - Sat, 9 am - 7 pm IST",
    href: `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`,
    Icon: PhoneIcon,
  },
  {
    id: "email",
    label: "Email Us",
    value: siteConfig.contact.email,
    sub: "We reply within a few hours",
    href: `mailto:${siteConfig.contact.email}`,
    Icon: EmailIcon,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Chat instantly",
    sub: "Tap the button  -  we're quick",
    href: `https://wa.me/${siteConfig.contact.whatsapp}`,
    Icon: WhatsAppIcon,
  },
  {
    id: "address",
    label: "Our Office",
    value: siteConfig.contact.address,
    sub: "Odisha's gateway to incredible India",
    href: "https://maps.google.com/?q=Bhubaneswar,Odisha,India",
    Icon: MapPinIcon,
  },
];

const trustItems = [
  {
    Icon: ClockIcon,
    headline: "Reply in 24 Hours",
    body: "A dedicated trip curator responds to every enquiry  -  no bots, no auto-replies.",
  },
  {
    Icon: ShieldIcon,
    headline: "Zero Obligation",
    body: "Your consultation is completely free. No pressure, no hidden charges, ever.",
  },
  {
    Icon: BadgeCheckIcon,
    headline: "Certified Local Guides",
    body: "Every itinerary is backed by government-certified guides with 10+ years on ground.",
  },
];

/* ─── page ───────────────────────────────────────────────────────────────── */

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--color-ink)" }}
      >
        {/* Decorative gradient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, var(--color-saffron) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }}
        />

        {/* Subtle diagonal texture line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--color-ivory) 0px, var(--color-ivory) 1px, transparent 1px, transparent 60px)",
          }}
        />

        <div className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-32 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              background: "color-mix(in srgb, var(--color-saffron) 15%, transparent)",
              color: "var(--color-saffron)",
              border: "1px solid color-mix(in srgb, var(--color-saffron) 30%, transparent)",
            }}
          >
            <span aria-hidden="true">✦</span>
            Free Consultation
            <span aria-hidden="true">✦</span>
          </div>

          {/* Main headline */}
          <h1
            className="mx-auto mt-6 max-w-3xl text-balance leading-[1.08] tracking-tight text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              fontStyle: "italic",
              fontWeight: 600,
            }}
          >
            Let&apos;s Plan Your{" "}
            <span style={{ color: "var(--color-saffron)" }}>Journey</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Tell us your dream  -  we&apos;ll shape it into an itinerary that fits
            perfectly. A trip curator will reach out within&nbsp;24 hours.
          </p>

          {/* Divider ornament */}
          <div className="mt-10 flex items-center justify-center gap-3" aria-hidden="true">
            <div className="h-px w-16 opacity-20" style={{ background: "var(--color-saffron)" }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--color-saffron)", opacity: 0.5 }}>
              <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="currentColor" />
            </svg>
            <div className="h-px w-16 opacity-20" style={{ background: "var(--color-saffron)" }} />
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      {/* ── Main split layout ─────────────────────────────────────────────── */}
      <Section className="py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-16">

          {/* Left col  -  contact info */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--color-saffron)" }}
            >
              Reach Us Directly
            </p>
            <h2
              className="mt-3 text-3xl font-semibold leading-snug tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              }}
            >
              We&apos;re real people who{" "}
              <span style={{ color: "var(--color-forest)" }}>love Odisha</span>
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "color-mix(in srgb, var(--color-ink) 60%, transparent)" }}
            >
              Every query lands with a curator who has walked these trails,
              attended these festivals, and prayed at these temples. We&apos;ll
              match you with the right experience.
            </p>

            {/* Contact cards */}
            <ul className="mt-8 space-y-4" role="list">
              {contactItems.map(({ id, label, value, sub, href, Icon }) => (
                <li key={id}>
                  <a
                    href={href}
                    target={id === "address" || id === "whatsapp" ? "_blank" : undefined}
                    rel={id === "address" || id === "whatsapp" ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 rounded-2xl p-5 transition-all duration-200"
                    style={{
                      background: "color-mix(in srgb, var(--color-ink) 96%, var(--color-saffron) 4%)",
                      border: "1px solid color-mix(in srgb, var(--color-saffron) 12%, transparent)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.35), 0 0 0 1px color-mix(in srgb, var(--color-saffron) 25%, transparent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.25)";
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: "color-mix(in srgb, var(--color-saffron) 15%, transparent)",
                        color: "var(--color-saffron)",
                      }}
                    >
                      <Icon />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "color-mix(in srgb, var(--color-ivory) 50%, transparent)" }}
                      >
                        {label}
                      </p>
                      <p
                        className="mt-0.5 truncate text-base font-medium"
                        style={{ color: "var(--color-ivory)" }}
                      >
                        {value}
                      </p>
                      <p
                        className="mt-0.5 text-sm"
                        style={{ color: "color-mix(in srgb, var(--color-ivory) 45%, transparent)" }}
                      >
                        {sub}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div
                      className="ml-auto mt-1 shrink-0 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                      style={{ color: "var(--color-saffron)" }}
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right col  -  inquiry form */}
          <div
            className="rounded-3xl p-8 lg:p-10"
            style={{
              background: "var(--color-ivory, #faf7f2)",
              border: "1px solid color-mix(in srgb, var(--color-sand) 60%, transparent)",
              boxShadow: "var(--shadow-warm, 0 8px 40px rgba(180,120,40,0.10))",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--color-saffron)" }}
            >
              Get a Custom Itinerary
            </p>
            <h2
              className="mt-2 text-2xl font-semibold leading-snug"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
              }}
            >
              Request a Proposal
            </h2>
            <p
              className="mt-2 mb-6 text-sm leading-relaxed"
              style={{ color: "color-mix(in srgb, var(--color-ink) 55%, transparent)" }}
            >
              Share your rough idea  -  dates, group size, interests. We handle the rest.
            </p>
            <InquiryForm section="general" heading="" />
          </div>

        </div>
      </Section>

      {/* ── Promise strip ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "var(--color-forest)",
          borderTop: "1px solid color-mix(in srgb, var(--color-gold) 20%, transparent)",
          borderBottom: "1px solid color-mix(in srgb, var(--color-gold) 20%, transparent)",
        }}
      >
        <div className="mx-auto max-w-[1280px] px-6 py-14">
          {/* Strip eyebrow */}
          <div className="mb-10 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "color-mix(in srgb, var(--color-gold) 80%, transparent)" }}
            >
              Our Promise to You
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {trustItems.map(({ Icon, headline, body }) => (
              <div key={headline} className="flex flex-col items-center gap-4 text-center">
                {/* Icon ring */}
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: "color-mix(in srgb, var(--color-gold) 12%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--color-gold) 25%, transparent)",
                    color: "var(--color-gold)",
                  }}
                >
                  <Icon />
                </div>
                <div>
                  <p
                    className="text-base font-semibold"
                    style={{ color: "var(--color-ivory)" }}
                  >
                    {headline}
                  </p>
                  <p
                    className="mt-1.5 text-sm leading-relaxed"
                    style={{ color: "color-mix(in srgb, var(--color-ivory) 60%, transparent)" }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
