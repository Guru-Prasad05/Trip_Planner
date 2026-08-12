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
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600">
            What travelers say
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Testimonials
          </h2>
        </div>

        {/* Cards */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-transform hover:scale-110 sm:-left-6"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-transform hover:scale-110 sm:-right-6"
          >
            ›
          </button>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="wait">
              {visible.map((idx) => {
                const t = testimonials[idx];
                return (
                  <motion.div
                    key={`${idx}-${current}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-xl border border-gray-100 bg-white p-8 shadow-sm"
                  >
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i} className="text-amber-500">★</span>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="mt-4 text-sm leading-relaxed text-gray-600">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Reviewer info + avatar */}
                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-gray-900">
                          {t.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">{t.location}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                          {t.occasion}
                        </p>
                      </div>
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={56}
                        height={56}
                        sizes="56px"
                        className="h-14 w-14 rounded-full border-2 border-gray-100 object-cover shadow-sm"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === current ? "bg-amber-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
