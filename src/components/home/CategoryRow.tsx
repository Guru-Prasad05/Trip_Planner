"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePortal } from "@/components/portal/PortalProvider";
import type { SectionTheme } from "@/lib/site";

export interface CategoryCard {
  title: string;
  description?: string;
  count?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

interface CategoryRowProps {
  scriptTitle: string;
  boldTitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cards: CategoryCard[];
  reversed?: boolean;
  theme?: SectionTheme;
}

const CLIP_VARIANTS = [
  'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
  'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
  'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
];

export function CategoryRow({
  scriptTitle,
  boldTitle,
  description,
  ctaLabel,
  ctaHref,
  cards,
  reversed = false,
  theme,
}: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { enterPortal } = usePortal();
  const router = useRouter();

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const handleCardClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    enterPortal(href, theme);
  };

  const handleCardHover = (href: string) => {
    router.prefetch(href);
  };

  return (
    <section
      className={cn("relative py-20 lg:py-32 overflow-hidden", reversed ? "bg-[#f7f5f2]" : "bg-white")}
      id="categories"
    >
      {/* Topographic background texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id={`topo-row-${reversed ? "b" : "a"}`} x="0" y="0" width="300" height="200" patternUnits="userSpaceOnUse">
            <path d="M0,100 Q75,70 150,100 T300,100" fill="none" stroke="#2f4a3c" strokeWidth="1.2"/>
            <path d="M0,120 Q75,90 150,120 T300,120" fill="none" stroke="#2f4a3c" strokeWidth="0.8"/>
            <path d="M0,80 Q75,50 150,80 T300,80" fill="none" stroke="#2f4a3c" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#topo-row-${reversed ? "b" : "a"})`}/>
      </svg>

      {/* Biomorphic accent orb */}
      <div
        className={cn(
          "absolute w-72 h-72 blur-3xl pointer-events-none",
          reversed ? "top-12 left-8 bg-gold/6" : "bottom-12 right-8 bg-forest/5"
        )}
        style={{ borderRadius: '60% 40% 70% 30% / 40% 60% 30% 70%' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className={cn("flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16", reversed && "lg:flex-row-reverse")}>

          {/* Title block */}
          <div className="shrink-0 lg:w-[300px] lg:sticky lg:top-32">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gradient-to-r from-gold to-transparent" />
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            </div>

            <h2>
              <span className="block font-display text-[clamp(2rem,4vw,3rem)] italic font-light text-forest leading-[0.95] tracking-nature">
                {scriptTitle}
              </span>
              <span className="block text-[clamp(1.1rem,2.2vw,1.5rem)] font-extrabold uppercase tracking-trust text-ink mt-1.5">
                {boldTitle}
              </span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-ink/65 max-w-[260px]">
              {description}
            </p>

            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center gap-3 px-6 py-3 text-xs font-bold uppercase tracking-wider
                       text-white bg-forest
                       shadow-[4px_4px_0px_0px_rgba(47,74,60,0.3)]
                       hover:shadow-[7px_7px_0px_0px_rgba(47,74,60,0.4)]
                       hover:-translate-x-0.5 hover:-translate-y-0.5
                       transition-all duration-300"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
              {ctaLabel}
            </Link>
          </div>

          {/* Scrolling cards */}
          <div className="relative flex-1 overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cards.map((card, i) => (
                <motion.div
                  key={card.href}
                  className="snap-start shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={card.href}
                    onClick={(e) => handleCardClick(e, card.href)}
                    onMouseEnter={() => handleCardHover(card.href)}
                    className="group relative block h-[320px] w-[240px] overflow-hidden sm:h-[380px] sm:w-[280px]
                             shadow-[6px_6px_0px_0px_rgba(47,74,60,0.1)]
                             hover:shadow-[10px_10px_0px_0px_rgba(47,74,60,0.18)]
                             hover:-translate-x-0.5 hover:-translate-y-0.5
                             transition-all duration-500 ease-out"
                    style={{ clipPath: CLIP_VARIANTS[i % CLIP_VARIANTS.length] }}
                  >
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* First card: full overlay */}
                    {i === 0 && card.description ? (
                      <div className="absolute inset-0 flex flex-col justify-end bg-forest/78 p-6 text-white
                                    transition-colors duration-300 group-hover:bg-forest/88">
                        {/* Organic wavy top accent */}
                        <svg className="absolute top-0 inset-x-0 w-full opacity-20" viewBox="0 0 280 32" preserveAspectRatio="none">
                          <path d="M0,16 Q70,0 140,16 T280,16 L280,0 L0,0 Z" fill="white"/>
                        </svg>
                        <h3 className="text-xl font-bold leading-tight font-[family-name:var(--font-display)]">{card.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/85">{card.description}</p>
                        {card.count && (
                          <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/65">
                            {card.count}
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/82 via-ink/35 to-transparent p-5">
                        {/* Small organic accent line */}
                        <div className="mb-2 w-6 h-[1.5px] bg-gold/80" />
                        <h3 className="text-lg font-bold text-white leading-tight font-[family-name:var(--font-display)] drop-shadow-md">
                          {card.title}
                        </h3>
                        {card.count && (
                          <p className="mt-1 text-xs text-white/60 uppercase tracking-wider">{card.count}</p>
                        )}
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Scroll arrow */}
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll right"
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center
                       bg-white text-ink
                       shadow-[4px_4px_0px_0px_rgba(47,74,60,0.15)]
                       hover:shadow-[6px_6px_0px_0px_rgba(47,74,60,0.25)]
                       hover:-translate-x-0.5 hover:-translate-y-[calc(50%+2px)]
                       transition-all duration-300 text-xl font-bold"
              style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
            >
              ›
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
