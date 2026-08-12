"use client";

import Link from "next/link";

/**
 * Full-bleed hero with the actual waterfall video (hero.mp4).
 * The video plays on loop silently — showing the flowing waterfall
 * with the person standing still. No shader needed.
 * Left-aligned large mixed typography like the reference.
 */
export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Video background — flowing waterfall */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero.png"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Left gradient for text readability */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Bottom fade to sand */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[2] h-48"
        style={{
          background: "linear-gradient(to top, var(--color-sand) 0%, transparent 100%)",
        }}
      />

      {/* Content — left-aligned like reference */}
      <div className="relative z-[3] flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-[1280px] px-8 py-32 sm:px-12 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[--color-gold] sm:text-sm">
              Odisha &amp; Sacred India
            </p>

            <h1 className="mt-6">
              <span className="block font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-[0.85] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                Providing
              </span>
              <span className="block font-[family-name:var(--font-display)] text-[clamp(3.5rem,10vw,7.5rem)] font-light italic leading-[0.8] text-[--color-gold] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                Inspiration
              </span>
              <span className="block font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-[0.85] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                Through Nature
              </span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-relaxed text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] sm:text-lg">
              Giving you the opportunity to explore, celebrate, and reconnect
              as you experience some of the most sacred and wild places in India.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-sm bg-[--color-forest] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:bg-[--color-forest]/90 hover:scale-105"
              >
                Plan My Trip
              </Link>
              <a
                href="#categories"
                className="rounded-sm border-2 border-white/60 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white/15 hover:border-white"
              >
                Explore Journeys
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden className="absolute bottom-12 left-1/2 z-[3] -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
          <div className="h-8 w-[1px] overflow-hidden">
            <div className="h-full w-full animate-[scroll-line_1.5s_ease-in-out_infinite] bg-gradient-to-b from-white/70 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
