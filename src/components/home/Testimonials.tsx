"use client";

import { GoogleReviewsWidget } from "@/components/GoogleReviewsWidget";

export function Testimonials() {

  return (
    <section className="relative py-20 lg:py-28 bg-[#f7f5f2] overflow-hidden">
      {/* Organic background SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="topo-testimonials" x="0" y="0" width="400" height="250" patternUnits="userSpaceOnUse">
            <path d="M0,125 Q100,90 200,125 T400,125" fill="none" stroke="#2f4a3c" strokeWidth="1.2"/>
            <path d="M0,155 Q100,120 200,155 T400,155" fill="none" stroke="#2f4a3c" strokeWidth="0.7"/>
            <path d="M0,95 Q100,60 200,95 T400,95" fill="none" stroke="#2f4a3c" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-testimonials)"/>
      </svg>

      {/* Biomorphic orb */}
      <div
        className="absolute top-0 right-0 w-80 h-80 bg-gold/5 blur-3xl pointer-events-none"
        style={{ borderRadius: '40% 60% 70% 30% / 60% 30% 70% 40%' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <div className="mb-14 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-gradient-to-r from-gold to-transparent"/>
            <div className="h-[2px] w-24 bg-gradient-to-r from-gold/30 to-transparent"/>
          </div>
          <h2 className="font-display text-section-title font-extrabold leading-[0.92] tracking-tight text-ink">
            <span className="block uppercase">Trusted By Travelers</span>
            <span className="block italic font-light text-forest tracking-nature mt-1">From Across India</span>
          </h2>
        </div>

        {/* Cards + nav */}
        <div className="relative px-2">
          <GoogleReviewsWidget />
        </div>
      </div>
    </section>
  );
}
