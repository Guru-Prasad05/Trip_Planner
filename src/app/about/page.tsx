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

export default function AboutPage() {
  return (
    <>
      {/* Hero — full-bleed with parallax feel */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful landscape of mountains and lake at sunset"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-8 py-32 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-amber-400">Our Story</p>
          <h1 className="mt-4 font-display text-5xl font-bold sm:text-6xl lg:text-7xl">
            We Build Relationships,<br />
            <span className="italic text-amber-400">Not Just Bookings</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Born in Odisha, rooted in its culture, and driven by a single promise — 
            every traveller is family.
          </p>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-emerald-800 py-10">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-center gap-12 px-6 text-center text-white">
          {[
            { num: "500+", label: "Happy Travellers" },
            { num: "50+", label: "Local Partners" },
            { num: "4+", label: "Years of Trust" },
            { num: "100%", label: "Customised" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-bold text-amber-400">{s.num}</p>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission — split layout */}
      <section className="py-24">
        <div className="mx-auto grid max-w-[1280px] gap-16 px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600">Our Mission</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-gray-900">
              Comfortable, Safe &<br />Hassle-Free Travel
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              At Trip Planner, we don&apos;t just sell trips — we create experiences 
              that stay with you forever. We are your dedicated travel partners, not local 
              operators looking for a quick transaction.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Every journey carries our promise: 100% all-inclusive pricing, high-quality 
              meals even in remote locations, experienced trip leaders, and stress-free 
              planning from start to finish.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=75"
                alt="Mountain landscape"
                fill
                sizes="(max-width: 1024px) 50vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 h-48 w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=75"
                alt="Lake sunset"
                fill
                sizes="(max-width: 1024px) 50vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-2xl">
              <Image
                src="/patachitra-1.jpg"
                alt="Patachitra art"
                fill
                sizes="(max-width: 1024px) 50vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 h-48 w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=75"
                alt="Forest"
                fill
                sizes="(max-width: 1024px) 50vw, 300px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values — dark section with Patachitra */}
      <section className="relative overflow-hidden bg-gray-900 py-24 text-white">
        <Image
          src="/patachitra-2.jpg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-[0.05]"
        />
        <div className="relative z-10 mx-auto max-w-[1280px] px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">What We Guarantee</p>
            <h2 className="mt-3 font-display text-4xl font-bold">Our Promises</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "✨", title: "No Hidden Charges", desc: "100% all-inclusive pricing — transport, stay, food, sightseeing and essentials. The price you see is the price you pay." },
              { icon: "🍽️", title: "Quality Food Everywhere", desc: "Hygienic, high-quality meals even in the most offbeat locations. Your comfort is non-negotiable." },
              { icon: "🧭", title: "Experienced Trip Leaders", desc: "Guided tours that save time and skip confusion — more discovering, less logistics stress." },
              { icon: "🤝", title: "We Build Relationships", desc: "We treat every traveller like family. Long-term trust over one-time transactions." },
              { icon: "😌", title: "Stress-Free Travel", desc: "From planning to the last day, we handle every detail so you simply relax and enjoy." },
              { icon: "🛡️", title: "Safety First", desc: "24/7 on-ground support, certified guides, safety equipment, and emergency protocols on every trip." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-amber-500/30">
                <div className="text-3xl">{v.icon}</div>
                <h3 className="mt-3 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing warning */}
      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="text-4xl">⚠️</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-gray-900">
            Don&apos;t Be Misled by Unrealistic Prices
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Many trips advertised for ₹4,000 end up costing ₹8,000+ due to hidden charges for food, 
            entry tickets, transport, and more. We focus on <strong className="text-amber-700">transparent 
            pricing</strong>, quality service, and unforgettable experiences.
          </p>
          <p className="mt-6 font-display text-xl font-bold text-emerald-800">
            Travel with confidence. Travel with Trip Planner. ❤️
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-800 py-20 text-center text-white">
        <h2 className="font-display text-4xl font-bold">Ready to Travel With Us?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Free consultation. No obligation. A trip curator will reply within 24 hours.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:bg-amber-600 hover:scale-105"
        >
          Start Planning My Trip
        </Link>
      </section>
    </>
  );
}
