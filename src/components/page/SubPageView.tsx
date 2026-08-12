"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHero } from "@/components/ui/SectionHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Section, PatachitraDivider } from "@/components/ui/Section";
import { InquiryForm } from "@/components/ui/InquiryForm";
import type { SubPageContent } from "@/lib/content/types";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

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
          { name: content.headline.slice(0, 30), href: `${content.basePath}/${content.slug}` },
        ]}
      />

      {/* Overview — split layout with image */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
          >
            <Image
              src={content.posterSrc}
              alt={content.posterAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Decorative corner accent */}
            <div className="absolute top-4 left-4 h-12 w-12 rounded-full bg-[--color-saffron]/20 backdrop-blur-sm border border-[--color-saffron]/30 flex items-center justify-center">
              <span className="text-[--color-saffron] text-lg">✦</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-[family-name:--font-display] text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-[--color-ink]">
              Overview
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[--color-saffron] to-[--color-gold]" />
            {content.overview.map((p) => (
              <p key={p.slice(0, 30)} className="mt-4 text-base leading-relaxed text-[--color-ink]/75">
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </Section>

      <PatachitraDivider />

      {/* Experiences — immersive section with numbered cards and colored icons */}
      <section className="relative overflow-hidden py-24">
        {/* Rich gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2318] via-[#1a3a2c] to-[#0d1f1a]" />
        {/* Patachitra painting as background */}
        <Image
          src="/patachitra-1.jpg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-[0.08]"
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[--color-gold]">What awaits you</span>
            <h2 className="mt-3 font-[family-name:--font-display] text-[clamp(2rem,5vw,3.5rem)] font-bold text-white">
              Experiences
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-[--color-gold] to-transparent" />
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            {/* Experience cards grid */}
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {content.experiences.map((exp, i) => (
                <motion.li
                  key={exp}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-[--color-gold]/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_rgba(212,164,55,0.2)]"
                >
                  {/* Number badge */}
                  <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[--color-gold]/20 text-[10px] font-bold text-[--color-gold]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[--color-saffron] to-[--color-gold] text-sm text-white shadow-lg shadow-[--color-saffron]/20">
                      ✦
                    </span>
                    <span className="text-sm leading-relaxed text-white/85 group-hover:text-white transition-colors">
                      {exp}
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* At a Glance — dark glassmorphism panel */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="self-start rounded-2xl border border-[--color-gold]/20 bg-white/5 p-6 backdrop-blur-xl"
            >
              <h3 className="font-[family-name:--font-display] text-lg font-bold text-white">
                At a Glance
              </h3>
              <div className="mt-2 h-0.5 w-10 rounded-full bg-[--color-gold]" />
              <dl className="mt-5 space-y-4">
                {content.atAGlance.map((item) => (
                  <div key={item.label} className="flex justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-[10px] uppercase tracking-wider text-white/40">{item.label}</dt>
                    <dd className="text-right text-sm font-semibold text-[--color-gold]">{item.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Quick CTA inside panel */}
              <a
                href="#enquire"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[--color-saffron] py-3 text-sm font-bold text-white transition-all hover:bg-[--color-saffron-deep] hover:scale-[1.02]"
              >
                Book This Experience
                <span>→</span>
              </a>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Inquiry form — gradient themed section */}
      <section id="enquire" className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-forest] via-[#1a4a3a] to-[--color-river]" />
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white/5" />
        
        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <div className="rounded-2xl bg-white p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] sm:p-8">
            <InquiryForm section={content.theme} heading={`Book ${content.eyebrow}`} />
          </div>
        </div>
      </section>

      {/* Sibling internal links */}
      {siblings.length > 0 && (
        <Section className="bg-[#f7f5f2]">
          <h2 className="mb-8 text-center font-[family-name:--font-display] text-2xl font-bold">
            Explore More
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {siblings.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-[--color-ink]/10 bg-white px-5 py-2.5 text-sm font-medium shadow-sm transition-all hover:bg-[--color-saffron] hover:text-white hover:border-[--color-saffron] hover:shadow-lg hover:-translate-y-0.5"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </Section>
      )}

      {content.faqs && content.faqs.length > 0 && (
        <Section>
          <h2 className="text-center font-[family-name:--font-display] text-[--text-section] font-bold">
            Frequently Asked Questions
          </h2>
          <dl className="mx-auto mt-10 max-w-3xl divide-y divide-[--color-gold]/20">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-[--color-ink]">
                  <span>{faq.question}</span>
                  <span className="text-[--color-saffron] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[--color-ink]/70">{faq.answer}</p>
              </details>
            ))}
          </dl>
        </Section>
      )}
    </>
  );
}
