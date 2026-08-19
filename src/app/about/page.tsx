import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us | Local Odisha Travel Experts",
  description:
    "We're local Odisha travel experts crafting all-inclusive group tours, retreats, celebrations and pilgrimages with transparent pricing and total hospitality.",
  path: "/about",
});

const promises = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "No Hidden Charges",
    desc: "100% all-inclusive pricing  -  transport, stay, food, sightseeing and essentials. The price you see is the price you pay.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 21H9m6 0a3 3 0 0 0 3-3v-3.673A48.356 48.356 0 0 0 12 15a48.357 48.357 0 0 0-6 .327V18a3 3 0 0 0 3 3m6 0h1.5a3 3 0 0 0 3-3v-3.673A48.355 48.355 0 0 0 18 10.608M6 21H4.5a3 3 0 0 1-3-3v-3.673A48.356 48.356 0 0 1 6 10.608" />
      </svg>
    ),
    title: "Quality Food Everywhere",
    desc: "Hygienic, high-quality meals even in the most offbeat locations. Your comfort is non-negotiable.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    title: "Experienced Trip Leaders",
    desc: "Guided tours that save time and skip confusion  -  more discovering, less logistics stress.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: "We Build Relationships",
    desc: "We treat every traveller like family. Long-term trust over one-time transactions.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
    title: "Stress-Free Travel",
    desc: "From planning to the last day, we handle every detail so you simply relax and enjoy.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Safety First",
    desc: "24/7 on-ground support, certified guides, safety equipment, and emergency protocols on every trip.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO  -  full viewport, dark overlay, giant italic headline ─── */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-ink">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80"
          alt="Serene Odisha landscape at golden hour"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* layered dark gradients  -  bottom-to-top heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-ink/30" />

        <div className="relative z-10 w-full pb-20 pt-24 md:pb-28">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            {/* saffron eyebrow */}
            <p
              className="mb-5 inline-block text-[0.68rem] font-bold uppercase tracking-[0.45em]"
              style={{ color: "var(--color-saffron)" }}
            >
              Our Story  -  Trip Planner
            </p>

            {/* giant headline */}
            <h1
              className="max-w-5xl font-display text-[clamp(2.8rem,7.5vw,6.5rem)] font-black leading-[1.0] text-white"
            >
              We Build{" "}
              <em
                className="not-italic"
                style={{ color: "var(--color-saffron)" }}
              >
                Relationships,
              </em>
              <br />
              Not Just Bookings
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Born in Odisha, rooted in its culture, and driven by a single promise
               -  every traveller is family.
            </p>
          </div>

          {/* scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div
              className="flex h-10 w-[1.5px] flex-col items-center overflow-hidden"
              aria-hidden="true"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <div
                className="h-1/2 w-full animate-scroll-line"
                style={{ background: "var(--color-saffron)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAND  -  dark forest, giant saffron numbers ─── */}
      <section style={{ background: "var(--color-forest)" }}>
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <div className="grid grid-cols-2 divide-x lg:grid-cols-4" style={{ borderColor: "rgba(212,164,55,0.25)" }}>
            {[
              { num: "500+", label: "Happy Travellers" },
              { num: "50+",  label: "Local Partners"   },
              { num: "4+",   label: "Years of Trust"   },
              { num: "100%", label: "Customised"       },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center py-12 text-center"
                style={{
                  borderColor: "rgba(212,164,55,0.25)",
                  borderLeftWidth: i > 0 ? "1px" : "0",
                }}
              >
                <span
                  className="font-display text-7xl font-black leading-none tracking-tight"
                  style={{ color: "var(--color-saffron)" }}
                >
                  {stat.num}
                </span>
                <span
                  className="mt-3 text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORY / MISSION  -  two-column ─── */}
      <section className="py-28" style={{ background: "var(--color-ivory)" }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2">

          {/* Left: staggered photo grid */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="relative overflow-hidden"
              style={{ height: "260px", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-warm)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=75"
                alt="Golden mountain landscape"
                fill
                sizes="(max-width: 1024px) 40vw, 280px"
                className="object-cover"
              />
            </div>
            <div
              className="relative mt-10 overflow-hidden"
              style={{ height: "260px", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-warm)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=75"
                alt="Lake at sunset"
                fill
                sizes="(max-width: 1024px) 40vw, 280px"
                className="object-cover"
              />
            </div>
            <div
              className="relative -mt-6 overflow-hidden"
              style={{ height: "260px", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-warm)" }}
            >
              <Image
                src="/patachitra-1.jpg"
                alt="Odisha Patachitra art"
                fill
                sizes="(max-width: 1024px) 40vw, 280px"
                className="object-cover"
              />
            </div>
            <div
              className="relative mt-4 overflow-hidden"
              style={{ height: "260px", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-warm)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=75"
                alt="Forest trail"
                fill
                sizes="(max-width: 1024px) 40vw, 280px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: mission copy */}
          <div>
            <p
              className="text-[0.68rem] font-bold uppercase tracking-[0.45em]"
              style={{ color: "var(--color-saffron)" }}
            >
              Our Mission
            </p>
            <h2
              className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.08]"
              style={{ color: "var(--color-ink)" }}
            >
              Comfortable, Safe &{" "}
              <br />
              Hassle-Free Travel
            </h2>

            {/* color bar */}
            <div className="mt-6 flex gap-1.5">
              <div className="h-1 w-10 rounded-full" style={{ background: "var(--color-saffron)" }} />
              <div className="h-1 w-4 rounded-full" style={{ background: "var(--color-gold)" }} />
              <div className="h-1 w-2 rounded-full" style={{ background: "var(--color-forest)", opacity: 0.35 }} />
            </div>

            <p
              className="mt-7 text-[1.05rem] leading-[1.75]"
              style={{ color: "rgba(26,20,16,0.72)" }}
            >
              At Trip Planner, we don&apos;t just sell trips  -  we create experiences
              that stay with you forever. We are your dedicated travel partners,
              not local operators looking for a quick transaction.
            </p>
            <p
              className="mt-5 text-[1.05rem] leading-[1.75]"
              style={{ color: "rgba(26,20,16,0.72)" }}
            >
              Every journey carries our promise: 100% all-inclusive pricing,
              high-quality meals even in remote locations, experienced trip
              leaders, and stress-free planning from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* ─── VALUES / PROMISES  -  deep dark, glowing cards ─── */}
      <section className="relative overflow-hidden py-28" style={{ background: "var(--color-ink)" }}>
        {/* subtle background texture */}
        <Image
          src="/patachitra-2.jpg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-[0.04]"
        />

        {/* faint radial glow behind header */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, var(--color-saffron) 0%, transparent 70%)" }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
          {/* header */}
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p
              className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.45em]"
              style={{ color: "var(--color-saffron)" }}
            >
              What We Guarantee
            </p>
            <h2
              className="font-display text-[clamp(2rem,4vw,3rem)] font-black text-white"
            >
              Our Promises
            </h2>
            <div
              className="mx-auto mt-5 h-px w-24"
              style={{ background: "linear-gradient(to right, transparent, var(--color-gold), transparent)" }}
            />
          </div>

          {/* cards grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((v) => (
              <div
                key={v.title}
                className="group relative rounded-[var(--radius-card)] border p-7 transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {/* hover border glow via pseudo-element replacement: we animate box-shadow */}
                <div
                  className="absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px var(--color-saffron), 0 0 24px -4px var(--color-saffron)`,
                  }}
                  aria-hidden
                />

                {/* icon circle */}
                <div
                  className="relative mb-5 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(232,116,44,0.15)",
                    color: "var(--color-saffron)",
                  }}
                >
                  {v.icon}
                </div>

                <h3 className="relative font-display text-lg font-bold text-white">
                  {v.title}
                </h3>
                <p
                  className="relative mt-2.5 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.52)" }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING CALLOUT  -  editorial, no emoji, bold accent border ─── */}
      <section style={{ background: "var(--color-ink)" }} className="pb-4">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <div
            className="px-8 py-10 md:px-14 md:py-14"
            style={{
              background: "rgba(232,116,44,0.06)",
              borderRadius: "var(--radius-card)",
              boxShadow: "inset 3px 0 0 var(--color-saffron)",
            }}
          >
            <p
              className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.45em]"
              style={{ color: "var(--color-saffron)" }}
            >
              A Note on Pricing
            </p>
            <h2
              className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-black text-white leading-tight"
            >
              Don&apos;t Be Misled by Unrealistic Prices
            </h2>
            <p
              className="mt-5 max-w-2xl text-base leading-[1.8]"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              Many trips advertised for ₹4,000 end up costing ₹8,000+ due to
              hidden charges for food, entry tickets, transport, and more. We
              focus on{" "}
              <strong style={{ color: "var(--color-saffron)", fontWeight: 700 }}>
                transparent pricing
              </strong>
              , quality service, and unforgettable experiences.
            </p>
            <p
              className="mt-6 font-display text-xl font-bold"
              style={{ color: "var(--color-gold)" }}
            >
              Travel with confidence. Travel with Trip Planner.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA  -  dark forest, saffron pill button ─── */}
      <section
        className="py-28 text-center"
        style={{ background: "var(--color-forest)" }}
      >
        {/* subtle gold rule above */}
        <div
          className="mx-auto mb-12 h-px w-16"
          style={{ background: "rgba(212,164,55,0.4)" }}
        />

        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <p
            className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.45em]"
            style={{ color: "rgba(212,164,55,0.75)" }}
          >
            Start Here
          </p>
          <h2
            className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.0] text-white"
          >
            Ready to Travel With Us?
          </h2>
          <p
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.60)" }}
          >
            Free consultation. No obligation. A trip curator will reply within
            24 hours.
          </p>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2.5 px-9 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:scale-105 focus-visible:scale-105"
            style={{
              background: "var(--color-saffron)",
              borderRadius: "9999px",
              boxShadow: "0 8px 32px -8px rgba(232,116,44,0.6)",
            }}
          >
            Start Planning My Trip
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
