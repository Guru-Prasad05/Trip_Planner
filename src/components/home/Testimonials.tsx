"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "New Delhi, India",
    rating: 5,
    text: "The Similipal trip was beyond anything we imagined. Our trip captain knew every hidden trail, the eco-camp was magical, and the melanistic leopard sighting was once-in-a-lifetime. 10/10.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    occasion: "Nature Tour",
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai, India",
    rating: 5,
    text: "We booked a corporate offsite for 30 people and everything was flawless — from the raft-building challenge to the bonfire debrief. GST invoice received same day. Will book again.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    occasion: "Corporate Retreat",
  },
  {
    name: "Ananya Das",
    location: "Bhubaneswar, India",
    rating: 5,
    text: "My husband's birthday weekend at the Chilika houseboat — the personalised décor, the folk music at sunset, the cake reveal with tribal drumming — he cried. Best gift I've ever given.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    occasion: "Birthday Celebration",
  },
  {
    name: "Vikram Patel",
    location: "Bengaluru, India",
    rating: 5,
    text: "The Char Dham Yatra was planned with such care — helicopter timings, senior-friendly stays, managed darshan queues. My parents (70+) completed the circuit comfortably. Truly grateful.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    occasion: "Spiritual Journey",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const visible = [current, (current + 1) % testimonials.length];

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

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
        <div className="relative">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center
                     bg-white text-ink text-xl font-bold
                     shadow-[4px_4px_0px_0px_rgba(47,74,60,0.12)]
                     hover:shadow-[6px_6px_0px_0px_rgba(47,74,60,0.2)]
                     hover:-translate-x-0.5 hover:-translate-y-[calc(50%+2px)]
                     transition-all duration-300 sm:-left-5"
            style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center
                     bg-white text-ink text-xl font-bold
                     shadow-[4px_4px_0px_0px_rgba(47,74,60,0.12)]
                     hover:shadow-[6px_6px_0px_0px_rgba(47,74,60,0.2)]
                     hover:-translate-x-0.5 hover:-translate-y-[calc(50%+2px)]
                     transition-all duration-300 sm:-right-5"
            style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
          >
            ›
          </button>

          <div className="grid gap-5 md:grid-cols-2 px-2">
            <AnimatePresence mode="wait">
              {visible.map((idx) => {
                const t = testimonials[idx];
                return (
                  <motion.div
                    key={`${idx}-${current}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative bg-white p-8 border-2 border-sand
                             shadow-[6px_6px_0px_0px_rgba(47,74,60,0.07)]"
                    style={{ clipPath: idx % 2 === 0
                      ? 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                      : 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                    }}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>

                    {/* Opening quote mark */}
                    <div className="font-display text-5xl leading-none text-forest/15 -mt-2 mb-1 select-none">&ldquo;</div>

                    <p className="text-sm leading-relaxed text-ink/70 -mt-3">
                      {t.text}
                    </p>

                    {/* Organic separator */}
                    <div className="my-5 flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-gradient-to-r from-gold/60 to-transparent"/>
                      <div className="h-[1px] flex-1 bg-sand"/>
                    </div>

                    {/* Reviewer */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-ink">
                          {t.name}
                        </p>
                        <p className="mt-0.5 text-xs text-ink/50">{t.location}</p>
                        <span
                          className="mt-2 inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-forest bg-forest/10 border border-forest/20"
                          style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}
                        >
                          {t.occasion}
                        </span>
                      </div>
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={56}
                        height={56}
                        sizes="56px"
                        className="h-14 w-14 shrink-0 object-cover border-2 border-sand"
                        style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 transition-all duration-300 ${
                i === current
                  ? "w-8 bg-forest"
                  : "w-1.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
