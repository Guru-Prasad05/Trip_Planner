// === FILE: E:\Trip-planner\src\components\page\SubPageView.tsx ===

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHero } from "@/components/ui/SectionHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Section, PatachitraDivider } from "@/components/ui/Section";
import { InquiryForm } from "@/components/ui/InquiryForm";
import type { SubPageContent } from "@/lib/content/types";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function SubPageView({
  content,
  hubTitle,
  hubHref,
  siblings,
}: {
  content: SubPageContent;
  hubTitle: string;
  hubHref: string;
  siblings: { label: string; href: string }[];
}) {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO — full-bleed, handled by SectionHero                          */}
      {/* ------------------------------------------------------------------ */}
      <SectionHero
        eyebrow={content.eyebrow}
        headline={content.headline}
        subhead={content.tagline}
        theme={content.theme}
        primaryCta={{ label: "Enquire Now", href: "#enquire" }}
        backgroundImage={content.posterSrc}
      />

      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: hubTitle, href: hubHref },
          {
            name: content.headline.slice(0, 30),
            href: `${content.basePath}/${content.slug}`,
          },
        ]}
      />

      {/* ------------------------------------------------------------------ */}
      {/* OVERVIEW — white bg, two-column, decorative saffron frame on image */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Image column with decorative overlapping saffron border frame */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative saffron frame — offset behind the image */}
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-[--color-saffron]/40"
            />
            {/* Gold corner accent — top-left */}
            <div
              aria-hidden
              className="absolute -top-3 -left-3 h-20 w-20 rounded-tl-2xl border-t-2 border-l-2 border-[--color-gold]"
            />

            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_24px_64px_-16px_rgba(0,0,0,0.28)]">
              <Image
                src={content.posterSrc}
                alt={content.posterAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Warm vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[--color-saffron]">
              About This Journey
            </span>

            {/* Heading with saffron bar */}
            <h2 className="mt-3 font-[family-name:--font-display] text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight text-[--color-ink]">
              Overview
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-[--color-saffron]" />

            <div className="mt-6 space-y-4">
              {content.overview.map((p) => (
                <p
                  key={p.slice(0, 30)}
                  className="text-base leading-[1.8] text-[--color-ink]/70"
                >
                  {p}
                </p>
              ))}
            </div>

            <a
              href="#enquire"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[--color-saffron] transition-all duration-200 hover:gap-3"
            >
              Plan this journey
              <span className="text-base leading-none" aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </Section>

      <PatachitraDivider />

      {/* ------------------------------------------------------------------ */}
      {/* EXPERIENCES — dark forest, full-bleed, grid + glance panel         */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden py-28">
        {/* Layered background */}
        <div className="absolute inset-0 bg-[--color-forest]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f14] via-[--color-forest] to-[#0d2420] opacity-90" />

        {/* Patachitra art texture */}
        <Image
          src="/patachitra-1.jpg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-[0.07] mix-blend-luminosity"
        />

        {/* Radial glow orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[--color-saffron]/8 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-[--color-river]/10 blur-[100px]"
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[--color-gold]">
              What Awaits You
            </span>
            <h2 className="mt-3 font-[family-name:--font-display] text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white">
              Experiences
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[--color-gold] to-transparent" />
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Experience cards */}
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2"
              role="list"
            >
              {content.experiences.map((exp, i) => (
                <motion.li
                  key={exp}
                  variants={fadeUp}
                  className={[
                    "group relative overflow-hidden rounded-xl p-5",
                    "border border-white/8 bg-white/5 backdrop-blur-sm",
                    "transition-all duration-300 ease-out",
                    "hover:-translate-y-1.5 hover:border-[--color-gold]/35",
                    "hover:bg-white/10",
                    "hover:shadow-[0_16px_48px_-12px_rgba(212,164,55,0.25)]",
                  ].join(" ")}
                >
                  {/* Number badge */}
                  <div
                    aria-hidden
                    className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[--color-gold]/15 text-[9px] font-black tracking-wider text-[--color-gold]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="flex gap-3.5">
                    {/* Saffron diamond icon */}
                    <div
                      aria-hidden
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[--color-saffron] to-[--color-gold] text-white shadow-lg shadow-[--color-saffron]/25 transition-transform duration-300 group-hover:scale-110"
                    >
                      <span className="inline-block h-3 w-3 rotate-45 rounded-sm border-2 border-white/80" />
                    </div>

                    <span className="text-sm leading-relaxed text-white/80 transition-colors duration-200 group-hover:text-white">
                      {exp}
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* At a Glance — dark glassmorphism panel */}
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className={[
                "self-start rounded-2xl p-7",
                "border border-[--color-gold]/20 bg-white/5 backdrop-blur-xl",
                "shadow-[0_8px_48px_-12px_rgba(0,0,0,0.4)]",
              ].join(" ")}
            >
              <h3 className="font-[family-name:--font-display] text-lg font-bold text-white">
                At a Glance
              </h3>
              <div className="mt-2 h-0.5 w-8 rounded-full bg-[--color-gold]" />

              <dl className="mt-6 divide-y divide-white/8">
                {content.atAGlance.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                      {item.label}
                    </dt>
                    <dd className="text-right text-sm font-semibold text-[--color-gold]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="#enquire"
                className={[
                  "mt-7 flex w-full items-center justify-center gap-2.5 rounded-full",
                  "bg-[--color-saffron] px-5 py-3.5",
                  "text-xs font-black uppercase tracking-[0.15em] text-white",
                  "transition-all duration-200",
                  "hover:bg-[--color-saffron-deep] hover:scale-[1.03]",
                  "hover:shadow-[0_8px_24px_-8px_var(--color-saffron)]",
                ].join(" ")}
              >
                Book This Experience
                <span className="text-sm leading-none" aria-hidden>→</span>
              </a>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* INQUIRY — deep forest-to-ink gradient, centered white card         */}
      {/* ------------------------------------------------------------------ */}
      <section id="enquire" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-forest] via-[#142e22] to-[--color-ink]" />

        {/* Decorative concentric circles */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full border border-white/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-12 -right-12 h-64 w-64 rounded-full border border-white/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full border border-white/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-8 h-40 w-40 rounded-full border border-white/5"
        />
        {/* Central saffron glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--color-saffron]/5 blur-[80px]"
        />

        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <div className="rounded-3xl bg-white p-8 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.4)] sm:p-12">
            <InquiryForm
              section={content.theme}
              heading={`Book ${content.eyebrow}`}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SIBLINGS — light sand bg, pill links with saffron hover            */}
      {/* ------------------------------------------------------------------ */}
      {siblings.length > 0 && (
        <section className="bg-[--color-sand] py-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <h2 className="mb-2 text-center font-[family-name:--font-display] text-[clamp(1.5rem,3vw,2rem)] font-bold text-[--color-ink]">
              Explore More
            </h2>
            <p className="mb-8 text-center text-sm text-[--color-ink]/50">
              Discover other journeys through Odisha
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {siblings.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={[
                    "rounded-full border border-[--color-ink]/12 bg-white",
                    "px-5 py-2.5 text-sm font-medium text-[--color-ink]",
                    "shadow-sm transition-all duration-200",
                    "hover:border-[--color-saffron] hover:bg-[--color-saffron]",
                    "hover:text-white hover:-translate-y-0.5",
                    "hover:shadow-[0_8px_24px_-8px_var(--color-saffron)]",
                  ].join(" ")}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* FAQs — white bg, centered max-w-3xl, CSS plus/minus accordion      */}
      {/* ------------------------------------------------------------------ */}
      {content.faqs && content.faqs.length > 0 && (
        <Section>
          <div className="mx-auto mb-12 max-w-xl text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[--color-saffron]">
              Got Questions?
            </span>
            <h2 className="mt-3 font-[family-name:--font-display] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-[--color-ink]">
              Frequently Asked Questions
            </h2>
          </div>

          <dl className="mx-auto max-w-3xl">
            {/* Top gold divider */}
            <div className="mb-0 h-px bg-gradient-to-r from-transparent via-[--color-gold]/40 to-transparent" />

            {content.faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary
                  className={[
                    "flex cursor-pointer list-none items-center justify-between",
                    "gap-5 py-5 text-left",
                    "font-medium text-[--color-ink] transition-colors duration-150",
                    "hover:text-[--color-saffron]",
                    "[&::-webkit-details-marker]:hidden",
                  ].join(" ")}
                >
                  <span className="text-base leading-snug">{faq.question}</span>

                  {/* Plus icon — rotates 45deg on open to form × */}
                  <span
                    aria-hidden
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      "border border-[--color-gold]/40 bg-[--color-gold]/8",
                      "text-[--color-saffron] transition-transform duration-300",
                      "group-open:rotate-45",
                    ].join(" ")}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      aria-hidden
                    >
                      <line x1="7" y1="1" x2="7" y2="13" />
                      <line x1="1" y1="7" x2="13" y2="7" />
                    </svg>
                  </span>
                </summary>

                <p className="pb-6 text-sm leading-[1.8] text-[--color-ink]/65">
                  {faq.answer}
                </p>

                {/* Gold divider below each item */}
                <div className="h-px bg-gradient-to-r from-transparent via-[--color-gold]/30 to-transparent" />
              </details>
            ))}
          </dl>
        </Section>
      )}
    </>
  );
}
