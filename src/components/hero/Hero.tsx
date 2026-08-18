"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <video
        autoPlay muted loop playsInline preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero.png"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Left gradient for text readability */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.15) 80%)" }}
      />

      {/* Bottom gradient fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[2] h-56"
        style={{ background: "linear-gradient(to top, var(--color-sand) 0%, rgba(244,235,221,0.5) 55%, transparent 100%)" }}
      />

      {/* Organic wavy bottom edge */}
      <svg
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[3] w-full text-[--color-sand]"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,28 Q180,56 360,28 T720,28 T1080,28 T1440,28 L1440,56 L0,56 Z" fill="currentColor"/>
      </svg>

      {/* Botanical accent — top right */}
      <div className="absolute top-16 right-16 w-48 h-48 opacity-[0.07] pointer-events-none z-[2]" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="text-white">
          <ellipse cx="50" cy="50" rx="18" ry="32" fill="currentColor" opacity="0.3"/>
          <path d="M50,18 Q36,36 50,50 Q64,36 50,18" fill="currentColor" opacity="0.5"/>
          <path d="M50,50 Q64,64 50,82 Q36,64 50,50" fill="currentColor" opacity="0.5"/>
          <path d="M50,18 L50,82 M36,32 Q50,37 64,32 M36,50 Q50,55 64,50 M36,68 Q50,73 64,68"
                stroke="currentColor" fill="none" strokeWidth="1" opacity="0.4"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-[4] flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-[1280px] px-8 py-32 sm:px-12 lg:px-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[2px] w-12 bg-gold/80"/>
              <p className="text-[11px] font-bold uppercase tracking-trust text-gold">
                Odisha &amp; Sacred India
              </p>
            </div>

            <h1 className="space-y-2">
              <span className="block font-display text-hero-primary font-black uppercase leading-[0.88] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 8px 16px rgba(0,0,0,0.6)' }}>
                Journey Into
              </span>
              <span className="block font-display text-hero-accent font-semibold italic leading-[0.82] tracking-nature text-gold drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9), 0 8px 16px rgba(0,0,0,0.5)' }}>
                The Wild
              </span>
            </h1>

            <p className="mt-9 max-w-lg text-[16px] leading-[1.65] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-[18px] font-normal" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
              Expert-led trekking journeys through sacred forests and untouched highlands.
              Small groups, vetted stays, safety-first protocols — where adventure meets trust.
            </p>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-white text-xs font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
                <span className="font-medium">Small Groups · 12 max</span>
              </div>
              <div className="h-3 w-[1px] bg-white/30"/>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">Licensed · Insured</span>
              </div>
              <div className="h-3 w-[1px] bg-white/30"/>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">Fixed Departures</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-white
                         bg-[--color-forest]
                         shadow-[6px_6px_0px_0px_rgba(0,0,0,0.35)]
                         hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.42)]
                         hover:-translate-x-1 hover:-translate-y-1
                         transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
              >
                Plan My Trip
              </Link>
              <a
                href="#categories"
                className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-white
                         border-2 border-white/70
                         shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]
                         hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.25)]
                         hover:-translate-x-0.5 hover:-translate-y-0.5
                         transition-all duration-300"
                style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
              >
                Explore Journeys
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden className="absolute bottom-20 left-1/2 z-[4] -translate-x-1/2">
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
